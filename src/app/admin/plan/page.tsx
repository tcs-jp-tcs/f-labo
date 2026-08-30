import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";
import PlanBoard from "@/components/admin/PlanBoard";
import { getPlan } from "@/lib/plan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CONTENT PLAN — F-Labo",
  robots: { index: false, follow: false },
};

const dotted = (date: string): string => date.replaceAll("-", ".");

export default async function AdminPlanPage() {
  const plan = await getPlan();
  const first = plan.items[0]?.plannedDate ?? null;
  const last = plan.items[plan.items.length - 1]?.plannedDate ?? null;

  return (
    <div className="wrap">
      <div className="hdr">
        <div className="hdr-l">
          <div className="eyebrow">F-Labo / 投稿計画</div>
          <h1>
            <span className="live" />
            CONTENT PLAN
          </h1>
        </div>
        <div className="hdr-r">
          対象期間{" "}
          <b>
            {first ? dotted(first) : "—"} — {last ? dotted(last) : "—"}
          </b>
          <br />
          計画 <b>{plan.items.length}</b> 本 ／ 根拠あり <b>{plan.withRationale}</b> 本
        </div>
      </div>

      <div className="toolbar">
        <AdminNav current="/admin/plan" />
        <LogoutButton />
      </div>

      {plan.error && <div className="notice">{plan.error}</div>}

      <div className="pl-lead">
        <div className="pl-lead-flow">
          <span>実績を計測（Dashboard）</span>
          <i>→</i>
          <span>数字から所見を出す（Report）</span>
          <i>→</i>
          <span className="on">次に作るものを決める（このページ）</span>
        </div>
        <p>
          各計画の「なぜ作るのか」には、過去の投稿実績の数字をそのまま根拠として書いている。
          思いつきで本数を積むのではなく、伸びたジャンルに寄せ、伸びなかったジャンルは
          定型枠として本数を抑える、という判断の記録になっている。
        </p>
      </div>

      <section>
        <div className="sec-hd">
          <span className="sec-no">01</span>
          <h2>Schedule</h2>
        </div>
        <p className="sec-note">
          投稿予定日の昇順。ステータスとプラットフォームで絞り込める。
        </p>
        <PlanBoard items={plan.items} statuses={plan.statuses} platforms={plan.platforms} />
      </section>

      <div className="ad-ft">
        <span>F-LABO — CONTENT PLAN</span>
        <span>根拠の数字は /admin と /admin/report の集計に対応</span>
      </div>
    </div>
  );
}
