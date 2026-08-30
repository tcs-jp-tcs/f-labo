import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import GenrePerformance from "@/components/admin/GenrePerformance";
import InsightCards from "@/components/admin/InsightCards";
import LogoutButton from "@/components/admin/LogoutButton";
import VolumeVsResult from "@/components/admin/VolumeVsResult";
import { getReport } from "@/lib/report";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ANALYSIS REPORT — F-Labo",
  robots: { index: false, follow: false },
};

const num = (value: number): string => value.toLocaleString("en-US");
const dotted = (date: string | null): string => (date ? date.replaceAll("-", ".") : "—");

export default async function AdminReportPage() {
  const report = await getReport();
  const { summary } = report;

  return (
    <div className="wrap">
      <div className="hdr">
        <div className="hdr-l">
          <div className="eyebrow">F-Labo / 管理レポート</div>
          <h1>
            <span className="live" />
            ANALYSIS REPORT
          </h1>
        </div>
        <div className="hdr-r">
          対象期間 <b>{dotted(summary.firstDate)} — {dotted(summary.lastDate)}</b>
          <br />
          投稿 <b>{summary.totalPosts}</b> 本 ／ 所見 <b>{report.insights.length}</b> 件
        </div>
      </div>

      <div className="toolbar">
        <AdminNav current="/admin/report" />
        <LogoutButton />
      </div>

      {report.error && <div className="notice">{report.error}</div>}

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-lbl">Posts</div>
          <div className="kpi-val">{num(summary.totalPosts)}</div>
          <div className="kpi-sub">
            ショート {summary.shortCount} 本 ／ 長尺 {summary.longCount} 本
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-lbl">IG Reach 合計</div>
          <div className="kpi-val">{num(summary.igReachTotal)}</div>
          <div className="kpi-sub">計測済み {summary.igMeasured} 本</div>
        </div>
        <div className="kpi">
          <div className="kpi-lbl">YT Views 合計</div>
          <div className="kpi-val">{num(summary.ytViewsTotal)}</div>
          <div className="kpi-sub">計測済み {summary.ytMeasured} 本</div>
        </div>
        <div className="kpi">
          <div className="kpi-lbl">Period</div>
          <div className="kpi-val sm">
            {dotted(summary.firstDate)}
            <br />
            {dotted(summary.lastDate)}
          </div>
          <div className="kpi-sub">最古〜最新の投稿日</div>
        </div>
      </div>

      <section>
        <div className="sec-hd">
          <span className="sec-no">01</span>
          <h2>Findings</h2>
        </div>
        <p className="sec-note">
          数字から読み取れたこと。表の数値はこの所見の裏付けとして下に置いてある。
        </p>
        <InsightCards insights={report.insights} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">02</span>
          <h2>Genre Performance</h2>
        </div>
        <p className="sec-note">
          ショート投稿をジャンル別に集計したもの。平均は突出した1本に引っぱられるため、
          比較の軸は中央値に置いている。
        </p>
        <GenrePerformance yt={report.genreYt} ig={report.genreIg} />
      </section>

      <section>
        <div className="sec-hd">
          <span className="sec-no">03</span>
          <h2>Volume vs Result</h2>
        </div>
        <p className="sec-note">
          制作本数と YT再生の中央値を並べたもの。上のバーが長いのに下のバーが短いジャンルは、
          手数をかけているわりに結果が出ていない。
        </p>
        <VolumeVsResult rows={report.genreYt} />
      </section>

      <div className="ad-ft">
        <span>F-LABO — ANALYSIS REPORT</span>
        <span>集計対象はショート（format=short）／中央値は計測済みの投稿のみ</span>
      </div>
    </div>
  );
}
