import type { ChannelStat, Ga4Daily } from "@/lib/telemetry";

/**
 * GA4 セクション。
 * - 左: 日別セッション推移（依存追加を避けて素の SVG で描画）
 * - 右: 流入チャネル別の構成比
 * どちらもデータが無い期間は「データなし」を出すだけでエラーにはしない。
 */

const W = 620;
const H = 190;
const PAD = { top: 12, right: 12, bottom: 24, left: 40 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

/** YYYY-MM-DD → MM/DD */
const monthDay = (date: string): string => date.slice(5).replace("-", "/");

function SessionsChart({ rows }: { rows: Ga4Daily[] }) {
  const max = Math.max(1, ...rows.map((r) => r.sessions));
  const step = rows.length > 1 ? INNER_W / (rows.length - 1) : 0;
  const baseline = PAD.top + INNER_H;

  const points = rows.map((row, i) => ({
    x: rows.length > 1 ? PAD.left + i * step : PAD.left + INNER_W / 2,
    y: baseline - (row.sessions / max) * INNER_H,
    row,
  }));

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)},${baseline} L${points[0].x.toFixed(1)},${baseline} Z`;

  // X軸ラベルは最大4点まで間引き、末尾ラベルと重なるものは落とす
  const labelStep = Math.max(1, Math.ceil(rows.length / 4));
  const lastIndex = rows.length - 1;
  const MIN_LABEL_GAP = 56;
  const labelIndexes = points
    .map((_, i) => i)
    .filter(
      (i) =>
        i === lastIndex ||
        (i % labelStep === 0 && points[lastIndex].x - points[i].x >= MIN_LABEL_GAP),
    );

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="日別セッション推移">
      {[0, 0.5, 1].map((ratio) => {
        const y = baseline - ratio * INNER_H;
        return (
          <g key={ratio}>
            <line className="grid-line" x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} />
            <text x={PAD.left - 6} y={y + 3} textAnchor="end">
              {Math.round(max * ratio).toLocaleString("en-US")}
            </text>
          </g>
        );
      })}
      {points.length > 1 && <path className="area" d={area} />}
      {points.length > 1 ? (
        <path className="series" d={line} />
      ) : (
        <circle className="dot" cx={points[0].x} cy={points[0].y} r={3.5} />
      )}
      {points.length > 1 &&
        points.length <= 45 &&
        points.map((p) => <circle className="dot" key={p.row.date} cx={p.x} cy={p.y} r={2} />)}
      <line className="axis-line" x1={PAD.left} y1={baseline} x2={W - PAD.right} y2={baseline} />
      {labelIndexes.map((i) => (
        <text
          key={points[i].row.date}
          x={points[i].x}
          y={H - 8}
          textAnchor={i === 0 ? "start" : i === rows.length - 1 ? "end" : "middle"}
        >
          {monthDay(points[i].row.date)}
        </text>
      ))}
    </svg>
  );
}

export default function Ga4Section({
  daily,
  channels,
}: {
  daily: Ga4Daily[];
  channels: ChannelStat[];
}) {
  const sessionsTotal = daily.reduce((acc, d) => acc + d.sessions, 0);
  const usersTotal = daily.reduce((acc, d) => acc + d.users, 0);

  return (
    <div className="ga4">
      <div className="ga4-panel">
        <h3>日別セッション推移</h3>
        {daily.length === 0 ? (
          <div className="empty">データなし</div>
        ) : (
          <>
            <SessionsChart rows={daily} />
            <p className="kpi-sub">
              期間合計 セッション {sessionsTotal.toLocaleString("en-US")} ／ ユーザー{" "}
              {usersTotal.toLocaleString("en-US")}
            </p>
          </>
        )}
      </div>
      <div className="ga4-panel">
        <h3>流入チャネル別</h3>
        {channels.length === 0 ? (
          <div className="empty">データなし</div>
        ) : (
          channels.map((channel) => (
            <div className="ch-row" key={channel.channel}>
              <span className="ch-name">{channel.channel}</span>
              <span className="ch-val">
                {channel.sessions.toLocaleString("en-US")} ／ {(channel.share * 100).toFixed(1)}%
              </span>
              <span className="ch-track">
                <span className="ch-fill" style={{ width: `${channel.share * 100}%` }} />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
