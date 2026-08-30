"use client";

import { useMemo, useRef, useState } from "react";
import type { SnsPost } from "@/lib/telemetry";
import {
  HOUR_BUCKETS,
  METRIC_LABEL,
  WEEKDAY_LABELS,
  bucketIndex,
  buildGenreColors,
  engagementOf,
  formatHour,
  genresOf,
  logDomain,
  logScale,
  median,
  metricValue,
  niceCeil,
  quantile,
  type Metric,
} from "@/components/admin/analysisUtils";

/**
 * ANALYSIS — 4つのグラフをタブで見比べるセクション。
 * 依存を増やさない方針なので描画はすべて素の SVG / CSS グリッド。
 * タブ切替時のフェードと伸びのアニメーションは CSS 側。prefers-reduced-motion では
 * admin.css の一括指定で無効になる。
 */

type TabKey = "time" | "map" | "box" | "heat";

const TABS: { key: TabKey; label: string }[] = [
  { key: "time", label: "時間帯 × リーチ" },
  { key: "map", label: "ポジショニング" },
  { key: "box", label: "ジャンル別の分布" },
  { key: "heat", label: "曜日 × 時間帯" },
];

const W = 760;
const H = 380;
const PAD = { top: 18, right: 22, bottom: 42, left: 58 };
const IW = W - PAD.left - PAD.right;
const IH = H - PAD.top - PAD.bottom;

const num = (value: number): string => value.toLocaleString("en-US");

/** posted_at が 0:00 ちょうど＝時刻が記録されていない可能性が高い投稿の件数 */
const midnightCount = (posts: SnsPost[]): number =>
  posts.filter((post) => post.jstHour === 0).length;

function MidnightNote({ posts, where }: { posts: SnsPost[]; where: string }) {
  const count = midnightCount(posts);
  if (count === 0) return null;
  return (
    <p className="an-warn">
      投稿時刻が 0:00 ちょうどの投稿が {count} / {posts.length} 件あります（時刻が未記録の可能性）。
      これらは{where}に集まるため、時間帯の傾向として読まないでください。
    </p>
  );
}

/* ------------------------------------------------------------ ツールチップ */

type Tip = { x: number; y: number; flip: boolean; lines: string[] } | null;

/** マウス位置(clientX/Y)をセクション左上基準に直してツールチップを出す関数 */
type ShowTip = (event: { clientX: number; clientY: number }, lines: string[]) => void;

function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      className={`an-tip ${tip.flip ? "flip" : ""}`}
      style={{ left: tip.x, top: tip.y }}
      role="presentation"
    >
      {tip.lines.map((line, i) => (
        <div key={i} className={i === 0 ? "an-tip-hd" : ""}>
          {line}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ 凡例 */

function GenreLegend({ colors }: { colors: Map<string, string> }) {
  return (
    <div className="legend an-legend">
      {[...colors.entries()].map(([genre, color]) => (
        <span key={genre}>
          <i className="sw" style={{ background: color }} />
          {genre}
        </span>
      ))}
    </div>
  );
}

function MetricToggle({
  metric,
  onChange,
}: {
  metric: Metric;
  onChange: (metric: Metric) => void;
}) {
  return (
    <div className="an-toggle">
      {(["ig", "yt"] as Metric[]).map((key) => (
        <button
          key={key}
          type="button"
          className={key === metric ? "on" : ""}
          onClick={() => onChange(key)}
        >
          {METRIC_LABEL[key]}
        </button>
      ))}
    </div>
  );
}

/* --------------------------------------------------- 01 時間帯 × リーチ */

function TimeScatter({
  posts,
  colors,
  metric,
  showTip,
  hideTip,
}: {
  posts: SnsPost[];
  colors: Map<string, string>;
  metric: Metric;
  showTip: ShowTip;
  hideTip: () => void;
}) {
  const rows = posts.filter((p) => metricValue(p, metric) != null);
  if (rows.length === 0) return <div className="empty">データなし</div>;

  const domain = logDomain(rows.map((p) => metricValue(p, metric) ?? 0));
  const maxEngagement = Math.max(1, ...rows.map(engagementOf));

  // 0時・24時の点が軸ラベルに重ならないよう内側に少し寄せる
  const x = (hour: number) => PAD.left + 8 + (hour / 24) * (IW - 16);
  const y = (value: number) =>
    PAD.top + IH - ((logScale(value) - domain.lo) / (domain.hi - domain.lo)) * IH;
  const radius = (post: SnsPost) =>
    4 + Math.sqrt(engagementOf(post) / maxEngagement) * 8;

  return (
    <svg className="chart an-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="時間帯とリーチの散布図">
      {domain.ticks.map((tick) => (
        <g key={tick}>
          <line className="grid-line" x1={PAD.left} y1={y(tick)} x2={W - PAD.right} y2={y(tick)} />
          <text x={PAD.left - 8} y={y(tick) + 3} textAnchor="end">
            {num(tick)}
          </text>
        </g>
      ))}
      {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((hour) => (
        <g key={hour}>
          <line className="grid-line" x1={x(hour)} y1={PAD.top} x2={x(hour)} y2={PAD.top + IH} />
          <text x={x(hour)} y={H - 22} textAnchor="middle">
            {hour}
          </text>
        </g>
      ))}
      <line className="axis-line" x1={PAD.left} y1={PAD.top + IH} x2={W - PAD.right} y2={PAD.top + IH} />
      <text x={PAD.left + IW / 2} y={H - 6} textAnchor="middle" className="an-axis-title">
        投稿時刻（JST）
      </text>
      <g className="an-pop">
        {rows.map((post) => {
          const value = metricValue(post, metric) ?? 0;
          return (
            <circle
              key={post.id}
              cx={x(post.jstHour)}
              cy={y(value)}
              r={radius(post)}
              fill={colors.get(post.genre) ?? "#8FA3B8"}
              fillOpacity={0.62}
              stroke={colors.get(post.genre) ?? "#8FA3B8"}
              strokeWidth={1.2}
              onMouseEnter={(e) => showTip(e, [
                    post.title,
                    `${post.dateLabel} ${formatHour(post.jstHour)} ／ ${post.genre}`,
                    `${METRIC_LABEL[metric]} ${num(value)} ／ エンゲージ ${num(engagementOf(post))}`,
                  ])}
              onMouseLeave={hideTip}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ------------------------------------------------- 02 ポジショニングマップ */

function PositioningMap({
  posts,
  colors,
  showTip,
  hideTip,
}: {
  posts: SnsPost[];
  colors: Map<string, string>;
  showTip: ShowTip;
  hideTip: () => void;
}) {
  const rows = posts.filter((p) => p.igReach != null && p.ytViews != null);
  if (rows.length === 0) return <div className="empty">データなし</div>;

  const igDomain = logDomain(rows.map((p) => p.igReach ?? 0));
  const ytDomain = logDomain(rows.map((p) => p.ytViews ?? 0));

  const x = (value: number) =>
    PAD.left + ((logScale(value) - igDomain.lo) / (igDomain.hi - igDomain.lo)) * IW;
  const y = (value: number) =>
    PAD.top + IH - ((logScale(value) - ytDomain.lo) / (ytDomain.hi - ytDomain.lo)) * IH;

  const medIg = median(rows.map((p) => p.igReach ?? 0));
  const medYt = median(rows.map((p) => p.ytViews ?? 0));
  const cx = x(medIg);
  const cy = y(medYt);

  const quadrants = [
    { label: "両PF強", tx: W - PAD.right - 8, ty: PAD.top + 16, anchor: "end" as const },
    { label: "IG特化", tx: W - PAD.right - 8, ty: PAD.top + IH - 10, anchor: "end" as const },
    { label: "YT特化", tx: PAD.left + 8, ty: PAD.top + 16, anchor: "start" as const },
    { label: "不発", tx: PAD.left + 8, ty: PAD.top + IH - 10, anchor: "start" as const },
  ];

  return (
    <svg className="chart an-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="IGリーチとYT再生のポジショニングマップ">
      {igDomain.ticks.map((tick) => (
        <g key={`x${tick}`}>
          <line className="grid-line" x1={x(tick)} y1={PAD.top} x2={x(tick)} y2={PAD.top + IH} />
          <text x={x(tick)} y={H - 22} textAnchor="middle">
            {num(tick)}
          </text>
        </g>
      ))}
      {ytDomain.ticks.map((tick) => (
        <g key={`y${tick}`}>
          <line className="grid-line" x1={PAD.left} y1={y(tick)} x2={W - PAD.right} y2={y(tick)} />
          <text x={PAD.left - 8} y={y(tick) + 3} textAnchor="end">
            {num(tick)}
          </text>
        </g>
      ))}
      <line className="an-median" x1={cx} y1={PAD.top} x2={cx} y2={PAD.top + IH} />
      <line className="an-median" x1={PAD.left} y1={cy} x2={W - PAD.right} y2={cy} />
      {quadrants.map((q) => (
        <text key={q.label} x={q.tx} y={q.ty} textAnchor={q.anchor} className="an-quad">
          {q.label}
        </text>
      ))}
      <text x={PAD.left + IW / 2} y={H - 6} textAnchor="middle" className="an-axis-title">
        IGリーチ（対数）／ 縦軸 YT再生（対数）・十字は中央値 IG {num(Math.round(medIg))} × YT{" "}
        {num(Math.round(medYt))}
      </text>
      <g className="an-pop">
        {rows.map((post) => (
          <circle
            key={post.id}
            cx={x(post.igReach ?? 0)}
            cy={y(post.ytViews ?? 0)}
            r={6}
            fill={colors.get(post.genre) ?? "#8FA3B8"}
            fillOpacity={0.66}
            stroke={colors.get(post.genre) ?? "#8FA3B8"}
            strokeWidth={1.2}
            onMouseEnter={(e) => showTip(e, [
                  post.title,
                  `${post.dateLabel} ／ ${post.genre}`,
                  `IG ${num(post.igReach ?? 0)} ／ YT ${num(post.ytViews ?? 0)}`,
                ])}
            onMouseLeave={hideTip}
          />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------ 03 ジャンル別分布 */

const ROW_H = 40;
/** 箱ひげ図はジャンル名（最大5文字程度）を軸の左に置くため、左余白を広めに取る */
const BOX_LEFT = 96;
const BOX_IW = W - BOX_LEFT - PAD.right;

function GenreBox({
  posts,
  colors,
  metric,
  showTip,
  hideTip,
}: {
  posts: SnsPost[];
  colors: Map<string, string>;
  metric: Metric;
  showTip: ShowTip;
  hideTip: () => void;
}) {
  const grouped = new Map<string, number[]>();
  for (const post of posts) {
    const value = metricValue(post, metric);
    if (value == null) continue;
    grouped.set(post.genre, [...(grouped.get(post.genre) ?? []), value]);
  }
  const rows = [...grouped.entries()]
    .map(([genre, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      return {
        genre,
        n: sorted.length,
        min: sorted[0],
        q1: quantile(sorted, 0.25),
        med: quantile(sorted, 0.5),
        q3: quantile(sorted, 0.75),
        max: sorted[sorted.length - 1],
      };
    })
    .sort((a, b) => b.med - a.med);

  if (rows.length === 0) return <div className="empty">データなし</div>;

  const axisMax = niceCeil(Math.max(...rows.map((r) => r.max)));
  const height = PAD.top + rows.length * ROW_H + 44;
  const x = (value: number) => BOX_LEFT + (value / axisMax) * BOX_IW;

  return (
    <svg
      className="chart an-chart"
      viewBox={`0 0 ${W} ${height}`}
      role="img"
      aria-label="ジャンル別の分布（箱ひげ図）"
    >
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
        <g key={ratio}>
          <line
            className="grid-line"
            x1={x(axisMax * ratio)}
            y1={PAD.top - 6}
            x2={x(axisMax * ratio)}
            y2={PAD.top + rows.length * ROW_H}
          />
          <text x={x(axisMax * ratio)} y={height - 22} textAnchor="middle">
            {num(Math.round(axisMax * ratio))}
          </text>
        </g>
      ))}
      <text x={BOX_LEFT + BOX_IW / 2} y={height - 6} textAnchor="middle" className="an-axis-title">
        {METRIC_LABEL[metric]}（箱=四分位・縦線=中央値・ひげ=最小〜最大）
      </text>
      <g className="an-grow" style={{ ["--grow-x" as string]: `${BOX_LEFT}px` }}>
        {rows.map((row, index) => {
          const cy = PAD.top + index * ROW_H + ROW_H / 2;
          const color = colors.get(row.genre) ?? "#8FA3B8";
          const boxX = x(row.q1);
          const boxW = Math.max(2, x(row.q3) - x(row.q1));
          return (
            <g
              key={row.genre}
              onMouseEnter={(e) => showTip(e, [
                    `${row.genre}（${row.n}本）`,
                    `中央値 ${num(Math.round(row.med))}`,
                    `四分位 ${num(Math.round(row.q1))} 〜 ${num(Math.round(row.q3))}`,
                    `最小 ${num(row.min)} ／ 最大 ${num(row.max)}`,
                  ])}
              onMouseLeave={hideTip}
            >
              <rect x={BOX_LEFT} y={cy - ROW_H / 2} width={BOX_IW} height={ROW_H} fill="transparent" />
              <text className="an-row-label" x={BOX_LEFT - 10} y={cy + 4} textAnchor="end">
                {row.genre}
              </text>
              <line className="an-whisker" x1={x(row.min)} y1={cy} x2={x(row.max)} y2={cy} stroke={color} />
              <line className="an-cap" x1={x(row.min)} y1={cy - 7} x2={x(row.min)} y2={cy + 7} stroke={color} />
              <line className="an-cap" x1={x(row.max)} y1={cy - 7} x2={x(row.max)} y2={cy + 7} stroke={color} />
              <rect
                x={boxX}
                y={cy - 11}
                width={boxW}
                height={22}
                fill={color}
                fillOpacity={0.22}
                stroke={color}
                strokeWidth={1.2}
              />
              <line className="an-med-line" x1={x(row.med)} y1={cy - 11} x2={x(row.med)} y2={cy + 11} stroke={color} />
              <text className="an-row-n" x={W - PAD.right} y={cy - 12} textAnchor="end">
                n={row.n}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ----------------------------------------------- 04 曜日 × 時間帯ヒートマップ */

type HeatMetric = "ig" | "yt" | "count";

const HEAT_LABEL: Record<HeatMetric, string> = {
  ig: "平均IGリーチ",
  yt: "平均YT再生",
  count: "投稿数",
};

function Heatmap({ posts, showTip, hideTip }: { posts: SnsPost[]; showTip: ShowTip; hideTip: () => void }) {
  const [heatMetric, setHeatMetric] = useState<HeatMetric>("ig");

  const cells = useMemo(() => {
    const grid: { posts: SnsPost[] }[][] = WEEKDAY_LABELS.map(() =>
      HOUR_BUCKETS.map(() => ({ posts: [] })),
    );
    for (const post of posts) {
      grid[post.jstWeekday][bucketIndex(post.jstHour)].posts.push(post);
    }
    return grid;
  }, [posts]);

  const valueOf = (bucket: SnsPost[]): number | null => {
    if (bucket.length === 0) return null;
    if (heatMetric === "count") return bucket.length;
    const metric: Metric = heatMetric === "ig" ? "ig" : "yt";
    const measured = bucket
      .map((p) => metricValue(p, metric))
      .filter((v): v is number => v != null);
    if (measured.length === 0) return null;
    return Math.round(measured.reduce((a, b) => a + b, 0) / measured.length);
  };

  const values = cells.flat().map((cell) => valueOf(cell.posts));
  const max = Math.max(1, ...values.filter((v): v is number => v != null));

  if (posts.length === 0) return <div className="empty">データなし</div>;

  return (
    <>
      <div className="an-subbar">
        <div className="an-toggle">
          {(Object.keys(HEAT_LABEL) as HeatMetric[]).map((key) => (
            <button
              key={key}
              type="button"
              className={key === heatMetric ? "on" : ""}
              onClick={() => setHeatMetric(key)}
            >
              {HEAT_LABEL[key]}
            </button>
          ))}
        </div>
      </div>
      <div className="an-scroll">
      <div className="heat">
        <div className="heat-corner" />
        {HOUR_BUCKETS.map((hour) => (
          <div className="heat-col" key={hour}>
            {hour}-{hour + 3}
          </div>
        ))}
        {WEEKDAY_LABELS.map((weekday, wi) => (
          <div className="heat-line" key={weekday}>
            <div className="heat-row">{weekday}</div>
            {HOUR_BUCKETS.map((hour, hi) => {
              const bucket = cells[wi][hi].posts;
              const value = valueOf(bucket);
              const intensity = value == null ? 0 : Math.max(0.12, value / max);
              return (
                <div
                  key={hour}
                  className={`heat-cell ${value == null ? "nil" : ""} ${intensity > 0.5 ? "hot" : ""}`}
                  style={{ ["--i" as string]: intensity }}
                  onMouseEnter={(e) => showTip(e,
                        bucket.length === 0
                          ? [`${weekday} ${hour}-${hour + 3}時`, "投稿なし"]
                          : [
                              `${weekday} ${hour}-${hour + 3}時 ／ ${bucket.length}本`,
                              `${HEAT_LABEL[heatMetric]} ${value == null ? "—" : num(value)}`,
                              ...bucket.slice(0, 3).map((p) => `・${p.title}`),
                            ])}
                  onMouseLeave={hideTip}
                >
                  {value == null ? "" : num(value)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      </div>
      <p className="aud-note">
        セルの色は {HEAT_LABEL[heatMetric]} の相対値。1マスあたりの本数が少ないため、平均値は
        1〜2本の結果に強く引っぱられる点に注意。
      </p>
      <MidnightNote posts={posts} where="月〜日の 0-3 時のマス" />
    </>
  );
}

/* ------------------------------------------------------------------ 本体 */

export default function AnalysisSection({ posts }: { posts: SnsPost[] }) {
  const [tab, setTab] = useState<TabKey>("time");
  const [scatterMetric, setScatterMetric] = useState<Metric>("ig");
  const [boxMetric, setBoxMetric] = useState<Metric>("ig");
  const [tip, setTip] = useState<Tip>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const showTip: ShowTip = (event, lines) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    // 右端で見切れないよう、右半分では左側に出す
    setTip({ x, y: event.clientY - rect.top, flip: x > rect.width - 260, lines });
  };
  const hideTip = () => setTip(null);

  const colors = useMemo(() => buildGenreColors(genresOf(posts)), [posts]);

  if (posts.length === 0) return <div className="empty">データなし</div>;

  return (
    <div className="an" ref={wrapRef}>
      <div className="an-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === tab}
            className={item.key === tab ? "on" : ""}
            onClick={() => {
              setTab(item.key);
              hideTip();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* key でタブごとに再マウントし、フェードと伸びのアニメーションを再生させる */}
      <div className="an-panel" key={tab}>
        {tab === "time" && (
          <>
            <div className="an-subbar">
              <MetricToggle metric={scatterMetric} onChange={setScatterMetric} />
              <GenreLegend colors={colors} />
            </div>
            <div className="an-scroll">
              <TimeScatter posts={posts} colors={colors} metric={scatterMetric} showTip={showTip} hideTip={hideTip} />
            </div>
            <p className="aud-note">
              縦軸は対数（データの最小〜最大の範囲）。点の大きさは IG のエンゲージメント
              （いいね＋保存＋シェア）。
            </p>
            <MidnightNote posts={posts} where="左端（0時）" />
          </>
        )}

        {tab === "map" && (
          <>
            <div className="an-subbar">
              <GenreLegend colors={colors} />
            </div>
            <div className="an-scroll">
              <PositioningMap posts={posts} colors={colors} showTip={showTip} hideTip={hideTip} />
            </div>
            <p className="aud-note">
              IGリーチと YT再生の両方が計測済みの投稿のみ。十字は両軸の中央値。
            </p>
          </>
        )}

        {tab === "box" && (
          <>
            <div className="an-subbar">
              <MetricToggle metric={boxMetric} onChange={setBoxMetric} />
            </div>
            <div className="an-scroll">
              <GenreBox posts={posts} colors={colors} metric={boxMetric} showTip={showTip} hideTip={hideTip} />
            </div>
            <p className="aud-note">
              箱が短いジャンルは安定して取れるもの、ひげが長いジャンルは当たれば大きいが
              振れ幅が大きいもの。n=1 のジャンルは箱がつぶれる。
            </p>
          </>
        )}

        {tab === "heat" && <Heatmap posts={posts} showTip={showTip} hideTip={hideTip} />}
      </div>

      <Tooltip tip={tip} />
    </div>
  );
}
