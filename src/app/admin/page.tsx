import Link from "next/link";
import AnalysisSection from "@/components/admin/AnalysisSection";
import AudienceSection from "@/components/admin/AudienceSection";
import DeltaTrace from "@/components/admin/DeltaTrace";
import FullLog from "@/components/admin/FullLog";
import Ga4Section from "@/components/admin/Ga4Section";
import GenreSplit from "@/components/admin/GenreSplit";
import LongForm from "@/components/admin/LongForm";
import LogoutButton from "@/components/admin/LogoutButton";
import { getAudience } from "@/lib/audience";
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
  const snapshot = Array.isArray(params.snapshot) ? params.snapshot[0] : params.snapshot;
  const [data, audience] = await Promise.all([
    getTelemetry(range),
    // オーディエンスは期間ではなくスナップショット日の断面なので range とは独立
    getAudience(snapshot),
  ]);
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
          ショート <b>{data.formatCompare.shortCount}</b> 本 ／ 長尺{" "}
          <b>{data.formatCompare.longCount}</b> 本
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
          <div className="kpi-lbl">IG Reach / short</div>
          <div className="kpi-val">{num(kpi.igReachTotal)}</div>
          <div className="kpi-sub">
            {kpi.igReachCount}本合計・最高 {num(kpi.igReachMax)}
          </div>
        </div>
        <div className="kpi" style={accent("var(--yt)")}>
          <div className="kpi-lbl">YT Views / short</div>
          <div className="kpi-val">{num(kpi.ytViewsTotal)}</div>
          <div className="kpi-sub">
            {kpi.ytViewsCount}本合計・最高 {num(kpi.ytViewsMax)}
          </div>
        </div>
        <div className="kpi" style={accent("var(--flag)")}>
          <div className="kpi-lbl">IG Likes / short</div>
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
          縦型ショート（Instagram リールと同一素材）だけを対象に、1本の投稿を中心線から左右へ
          振り分けたもの。左に伸びるほど Instagram、右に伸びるほど YouTube で見られている。
          棒の長さは期間内の最大値を基準に正規化している。長尺は Instagram に出していないため
          この比較には含めない。
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
        <DeltaTrace posts={data.shortPosts} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">02</span>
          <h2>Long Form</h2>
        </div>
        <p className="sec-note">
          YouTube 長尺だけの実績。Instagram には出していないので YouTube の再生数のみを並べる。
          1本あたりの平均をショートと比べると、同じチャンネルでも尺で伸び方が変わることが分かる。
        </p>
        <LongForm posts={data.longPosts} compare={data.formatCompare} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">03</span>
          <h2>Genre Split</h2>
        </div>
        <p className="sec-note">
          ショートのジャンル別の合計。どのジャンルがどちらのプラットフォームに振れるかを見る。
        </p>
        <GenreSplit genres={data.genres} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">04</span>
          <h2>Analysis</h2>
        </div>
        <p className="sec-note">
          ショートの投稿を切り口を変えて見比べる。タブで表示するグラフを切り替える。
        </p>
        <AnalysisSection posts={data.shortPosts} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">05</span>
          <h2>Audience</h2>
        </div>
        <p className="sec-note">
          フォロワーの内訳。期間の集計ではなくスナップショット日時点の断面なので、上の期間
          フィルターとは連動しない。国別は Instagram のフォロワーの国・地域分布。
        </p>
        <AudienceSection audience={audience} range={range} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">06</span>
          <h2>Google Analytics</h2>
        </div>
        <p className="sec-note">サイト側の反応。GA4 の日次サマリーと流入チャネル。</p>
        <Ga4Section daily={data.ga4Daily} channels={data.ga4Channels} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">07</span>
          <h2>Full Log</h2>
        </div>
        <p className="sec-note">
          ショート・長尺をあわせた全投稿。見出しをクリックすると並べ替わる。投稿名から
          Instagram / YouTube の投稿へ飛べる。
        </p>
        <FullLog posts={data.posts} />
      </section>

      <div className="ad-ft">
        <span>F-LABO — SNS TELEMETRY</span>
        <span>
          KPI・Delta Trace・Genre Split はショートのみ集計／優勢判定は IG リーチと YT 再生の比が
          1.5 倍以上で確定・未満は拮抗
        </span>
      </div>
    </div>
  );
}
