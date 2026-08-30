import type { Metadata } from "next";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";
import PlanCalendar from "@/components/admin/PlanCalendar";
import { getPlan } from "@/lib/plan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CONTENT PLAN — F-Labo",
  robots: { index: false, follow: false },
};

export default async function AdminPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const plan = await getPlan(params.week);
  const { week } = plan;

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
          表示中の週 <b>{week.label}</b>
          <br />
          この週 <b>{week.itemCount}</b> 本 ／ 全 <b>{plan.totalCount}</b> 本（根拠あり{" "}
          {plan.withRationale} 本）
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
          <span className="on">いつ作っていつ出すかを決める（このページ）</span>
        </div>
        <p>
          上段が投稿日、下段が制作日。同じ企画が両方に出ることがある（当日制作・当日投稿の定型もの）。
          カードをクリックすると「なぜその日・その形式なのか」が開く。根拠には過去の実績値をそのまま
          書いているので、勘ではなく数字で決めていることがそのまま残る。
        </p>
      </div>

      <section>
        <div className="sec-hd">
          <span className="sec-no">01</span>
          <h2>Week</h2>
        </div>

        <div className="cal-nav">
          <Link className="cal-nav-btn" href={`/admin/plan?week=${week.prevMonday}`}>
            ← 前週
          </Link>
          <span className="cal-nav-label">
            {week.label}
            {week.isCurrentWeek && <em>今週</em>}
          </span>
          <Link className="cal-nav-btn" href={`/admin/plan?week=${week.nextMonday}`}>
            翌週 →
          </Link>
          {!week.isCurrentWeek && (
            <Link className="cal-nav-today" href={`/admin/plan?week=${plan.todayMonday}`}>
              今週へ戻る
            </Link>
          )}
        </div>

        {week.itemCount === 0 && (
          <p className="cal-empty-note">
            この週に予定はありません。
            {plan.nearestWeekWithItems && (
              <>
                {" "}
                <Link href={`/admin/plan?week=${plan.nearestWeekWithItems}`}>
                  予定のある最も近い週（{plan.nearestWeekWithItems.replaceAll("-", ".")}〜）へ
                </Link>
              </>
            )}
          </p>
        )}

        <PlanCalendar days={week.days} />

        <div className="cal-legend">
          <span>
            <i className="cal-sw st-plan" />
            企画
          </span>
          <span>
            <i className="cal-sw st-wip" />
            制作中
          </span>
          <span>
            <i className="cal-sw st-done" />
            完成
          </span>
          <span>
            <i className="cal-sw st-posted" />
            投稿済
          </span>
          <span>
            <i className="cal-sw st-tbd" />
            未定（点線）
          </span>
        </div>
      </section>

      <div className="ad-ft">
        <span>F-LABO — CONTENT PLAN</span>
        <span>根拠の数字は /admin と /admin/report の集計に対応</span>
      </div>
    </div>
  );
}
