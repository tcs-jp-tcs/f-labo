import Link from "next/link";
import HeroFeature from "@/components/HeroFeature";
import PodiumCard from "@/components/PodiumCard";
import SnsCard from "@/components/SnsCard";
import ScheduleList from "@/components/ScheduleList";
import NewsCard from "@/components/NewsCard";
import StandingsCard from "@/components/StandingsCard";
import BroadcastTable from "@/components/BroadcastTable";
import SectionHeader from "@/components/SectionHeader";
import Section from "@/components/Section";
import MainLogo from "@/components/MainLogo";
import { seriesLabel } from "@/lib/data";
import type { Series } from "@/lib/data";
import { getActiveNews } from "@/lib/news";
import { getRecentResults } from "@/lib/results";
import { getSchedules } from "@/lib/schedules";
import { getStandings } from "@/lib/standings";
import { getThisWeekendBroadcasts } from "@/lib/broadcasts";

// ホームのニュース（ヒーロー＋最新3件）をSupabaseの最新状態で反映（静的化させない）
export const revalidate = 0;

export default async function HomePage() {
  const homeNews = await getActiveNews();
  const [recentResults, schedules, standings, thisWeekendBroadcasts] =
    await Promise.all([
      getRecentResults(),
      getSchedules(),
      getStandings(),
      getThisWeekendBroadcasts(),
    ]);
  const featuredNews = homeNews[0];
  const restHomeNews = homeNews.slice(1, 4);
  // 直近の本戦（決勝／フィーチャー）を最優先で表示。recentResults は新しい順に並べる運用。
  const latestRace = recentResults.find(
    (r) => (r.raceType === "決勝" || r.raceType === "フィーチャー") && r.podium.length > 0,
  );
  const sidebarResult = latestRace ?? recentResults.find((r) => r.podium.length > 0) ?? recentResults[0];

  // 直近3レース：最後のpast + next + その次のupcoming（NEXTを中心に前後を取る）
  const allF1 = schedules.F1;
  const nextIndex = allF1.findIndex((r) => r.status === "next" || r.status === "live");
  const pivot = nextIndex >= 0 ? nextIndex : Math.max(allF1.map((r, i) => (r.status === "past" ? i : -1)).reduce((a, b) => Math.max(a, b), -1) + 1, 0);
  const startIdx = Math.max(0, pivot - 1);
  const f1Schedule = allF1.slice(startIdx, startIdx + 3);
  const f1Standings = standings.F1;

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-6 pt-8 pb-4 relative z-[1]">
        <div className="text-center mb-8 flex flex-col items-center">
          <MainLogo width={260} />
          <h2
            className="mt-2 text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-mplus-1p), sans-serif",
              fontWeight: 900,
              letterSpacing: "0.08em",
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #E10600 50%, #ff4444 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(225,6,0,0.4))",
            }}
          >
            フォーミュラ研究所
          </h2>
          <p className="text-xs md:text-sm text-flabo-grey mt-2">
            F1・F2・F3・スーパーフォーミュラ・インディカー
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {featuredNews && <HeroFeature item={featuredNews} />}
          <div className="flex flex-col gap-3.5">
            <PodiumCard
              title={`🏆 ${sidebarResult.gpName}${
                sidebarResult.raceType ? ` ${sidebarResult.raceType}` : ""
              } 結果`}
              podium={sidebarResult.podium}
              note={sidebarResult.note}
            />
            <SnsCard />
          </div>
        </div>
      </section>

      {/* News */}
      <Section>
        <SectionHeader title="最新ニュース" seeAllHref="/news" seeAllLabel="すべてのニュース →" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {restHomeNews.map((n, i) => (
            <NewsCard key={`${n.category}-${i}`} item={n} />
          ))}
        </div>
      </Section>

      {/* Schedule */}
      <Section>
        <SectionHeader title="F1 レーススケジュール（直近3戦）" seeAllHref="/schedule" seeAllLabel="全22戦を見る →" />
        <ScheduleList items={f1Schedule} />
      </Section>

      {/* Broadcast */}
      <Section>
        <SectionHeader
          title="📺 今週のレース予定"
          seeAllHref="/schedule"
          seeAllLabel="スケジュール →"
        />
        {thisWeekendBroadcasts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {thisWeekendBroadcasts.map((w) => (
              <BroadcastTable key={`${w.series}-${w.round}`} weekend={w} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5 space-y-3">
            <p className="font-display tracking-[0.18em] text-xs text-flabo-grey uppercase">
              📅 今週末のレースはありません
            </p>
            <p className="text-xs text-flabo-grey leading-relaxed">
              次回レースのあるカテゴリ：
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[0.8rem]">
              {(Object.keys(schedules) as Series[]).map((s) => {
                const upcoming = schedules[s].find(
                  (r) => r.status === "next" || r.status === "upcoming" || r.status === "live",
                );
                if (!upcoming) return null;
                return (
                  <li
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/[0.03]"
                  >
                    <span className="text-base" aria-hidden>{upcoming.flag}</span>
                    <span className="font-display tracking-[0.18em] text-[0.55rem] text-flabo-grey">
                      {seriesLabel[s]}
                    </span>
                    <span className="font-bold flex-1 truncate">{upcoming.name}</span>
                    <span className="text-flabo-grey text-[0.7rem]">{upcoming.date}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Section>

      {/* Standings */}
      <Section>
        <SectionHeader title="F1 チャンピオンシップ" seeAllHref="/standings" seeAllLabel="全順位を見る →" />
        {f1Standings.note && (
          <p className="text-[0.7rem] text-flabo-grey mb-4">{f1Standings.note}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <StandingsCard title="🏎️ ドライバーズ" rows={f1Standings.drivers.slice(0, 7)} />
          <StandingsCard
            title="コンストラクターズ"
            rows={f1Standings.teams.slice(0, 7)}
            showTeamBar
          />
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/standings"
            className="inline-block font-display tracking-[0.18em] text-xs text-flabo-red hover:text-white transition-colors"
          >
            F2・F3・SF・INDY の順位も見る →
          </Link>
        </div>
      </Section>
    </>
  );
}
