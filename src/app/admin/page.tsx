import Link from "next/link";
import DeltaTrace from "@/components/admin/DeltaTrace";
import FullLog from "@/components/admin/FullLog";
import Ga4Section from "@/components/admin/Ga4Section";
import GenreSplit from "@/components/admin/GenreSplit";
import LogoutButton from "@/components/admin/LogoutButton";
import { RANGE_OPTIONS, getTelemetry, parseRange } from "@/lib/telemetry";

/** 管理画面は常に最新の数値を出す（キャッシュさせない） */
export const dynamic = "force-dynamic";

const num = (value: number): string => value.toLocaleString("en-US");

/** KPIカード左端のアクセント色（CSS変数）を型安全に渡す */
const accent = (color: string): React.CSSProperties =>
  ({ "--accent": color }) as React.CSSProperties;

function nowJst(): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const range = parseRange(params.range);
  const data = await getTelemetry(range);
  const { kpi } = data;

  return (
    <div className="wrap">
      <div className="hdr">
        <div className="hdr-l">
          <div className="eyebrow">F-Labo / フォーミュラ研究所</div>
          <h1>
            <span className="live" />
            SNS TELEMETRY
          </h1>
        </div>
        <div className="hdr-r">
          計測期間 <b>{data.periodLabel}</b>
          <br />
          投稿 <b>{kpi.postCount}</b> 本 ／ Instagram × YouTube
          <br />
          最終表示 {nowJst()}
        </div>
      </div>

      <div className="toolbar">
        <div className="ranges">
          {RANGE_OPTIONS.map((option) => (
            <Link
              key={option.key}
              href={`/admin?range=${option.key}`}
              className={option.key === range ? "on" : ""}
            >
              {option.label}
            </Link>
          ))}
        </div>
        <LogoutButton />
      </div>

      {data.error && <div className="notice">{data.error}</div>}

      <div className="kpis">
        <div className="kpi" style={accent("var(--ig)")}>
          <div className="kpi-lbl">IG Reach</div>
          <div className="kpi-val">{num(kpi.igReachTotal)}</div>
          <div className="kpi-sub">
            {kpi.igReachCount}本合計・最高 {num(kpi.igReachMax)}
          </div>
        </div>
        <div className="kpi" style={accent("var(--yt)")}>
          <div className="kpi-lbl">YT Views</div>
          <div className="kpi-val">{num(kpi.ytViewsTotal)}</div>
          <div className="kpi-sub">
            {kpi.ytViewsCount}本合計・最高 {num(kpi.ytViewsMax)}
          </div>
        </div>
        <div className="kpi" style={accent("var(--flag)")}>
          <div className="kpi-lbl">IG Likes</div>
          <div className="kpi-val">{num(kpi.igLikesTotal)}</div>
          <div className="kpi-sub">
            保存 {num(kpi.igSavesTotal)} ／ シェア {num(kpi.igSharesTotal)}
          </div>
        </div>
        <div className="kpi" style={accent("var(--tie)")}>
          <div className="kpi-lbl">Split</div>
          <div className="kpi-val">
            {kpi.igWins} / {kpi.ytWins}
          </div>
          <div className="kpi-sub">
            IG優勢 {kpi.igWins}本・YT優勢 {kpi.ytWins}本・拮抗 {kpi.ties}本・計測中{" "}
            {kpi.pending}本
          </div>
        </div>
      </div>

      <section>
        <div className="sec-hd">
          <span className="sec-no">01</span>
          <h2>Delta Trace</h2>
        </div>
        <p className="sec-note">
          1本の投稿を中心線から左右に振り分けたもの。左に伸びるほど Instagram、右に伸びるほど
          YouTube で見られている。棒の長さは期間内の最大値を基準に正規化している。
        </p>
        <div className="legend">
          <span>
            <i className="sw" style={{ background: "var(--ig)" }} />
            Instagram リーチ
          </span>
          <span>
            <i className="sw" style={{ background: "var(--yt)" }} />
            YouTube 再生
          </span>
          <span>
            <i className="sw" style={{ background: "var(--line)" }} />
            未計測（反映待ち）
          </span>
        </div>
        <DeltaTrace posts={data.posts} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">02</span>
          <h2>Genre Split</h2>
        </div>
        <p className="sec-note">ジャンル別の合計。どのジャンルがどちらのプラットフォームに振れるかを見る。</p>
        <GenreSplit genres={data.genres} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">03</span>
          <h2>Google Analytics</h2>
        </div>
        <p className="sec-note">サイト側の反応。GA4 の日次サマリーと流入チャネル。</p>
        <Ga4Section daily={data.ga4Daily} channels={data.ga4Channels} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">04</span>
          <h2>Full Log</h2>
        </div>
        <p className="sec-note">
          見出しをクリックすると並べ替わる。投稿名から Instagram / YouTube の投稿へ飛べる。
        </p>
        <FullLog posts={data.posts} />
      </section>

      <div className="ad-ft">
        <span>F-LABO — SNS TELEMETRY</span>
        <span>
          優勢判定は IG リーチと YT 再生の比が 1.5 倍以上で確定・未満は拮抗
        </span>
      </div>
    </div>
  );
}
