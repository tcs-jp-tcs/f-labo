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
import {
  recentResults,
  schedules,
  news,
  standings,
  thisWeekendBroadcasts,
} from "@/lib/data";

export default function HomePage() {
  const featuredNews = news[0];
  const restHomeNews = news.slice(1, 4);
  const latestF1Race = recentResults.find(
    (r) => r.series === "F1" && r.raceType === "決勝" && r.podium.length > 0,
  );
  const sidebarResult = latestF1Race ?? recentResults.find((r) => r.podium.length > 0) ?? recentResults[0];

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
          <h2 className="font-bold text-lg md:text-xl mt-2 text-white">
            フォーミュラ研究所
          </h2>
          <p className="text-xs md:text-sm text-flabo-grey mt-1">
            F1・F2・F3・スーパーフォーミュラ・インディカー
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          <HeroFeature item={featuredNews} />
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
          title="📺 今週末の放送予定（フジテレビNEXT / FOD）"
          seeAllHref="/schedule"
          seeAllLabel="全放送予定 →"
        />
        <div className="grid grid-cols-1 gap-4">
          {thisWeekendBroadcasts.map((w) => (
            <BroadcastTable key={`${w.series}-${w.round}`} weekend={w} />
          ))}
        </div>
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
