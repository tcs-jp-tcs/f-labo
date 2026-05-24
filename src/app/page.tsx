import Link from "next/link";
import HeroFeature from "@/components/HeroFeature";
import PodiumCard from "@/components/PodiumCard";
import SnsCard from "@/components/SnsCard";
import ScheduleCard from "@/components/ScheduleCard";
import NewsCard from "@/components/NewsCard";
import StandingsCard from "@/components/StandingsCard";
import BroadcastTable from "@/components/BroadcastTable";
import SectionHeader from "@/components/SectionHeader";
import Section from "@/components/Section";
import MainLogo from "@/components/MainLogo";
import {
  reviews,
  recentResults,
  schedules,
  news,
  standings,
  thisWeekendBroadcasts,
} from "@/lib/data";

export default function HomePage() {
  const featured = reviews[0];
  const latestF1 = recentResults.find((r) => r.series === "F1") ?? recentResults[0];
  const f1Schedule = schedules.F1.slice(0, 4);
  const homeNews = news.slice(0, 3);
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
          <HeroFeature review={featured} />
          <div className="flex flex-col gap-3.5">
            <PodiumCard
              title={`🏆 ${latestF1.gpName} 決勝結果`}
              podium={latestF1.podium}
            />
            <SnsCard />
          </div>
        </div>
      </section>

      {/* Schedule */}
      <Section>
        <SectionHeader title="F1 レーススケジュール" seeAllHref="/schedule" seeAllLabel="全日程を見る →" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {f1Schedule.map((item) => (
            <ScheduleCard key={`${item.series}-${item.round}`} item={item} />
          ))}
        </div>
      </Section>

      {/* Broadcast */}
      <Section>
        <SectionHeader
          title="📺 今週末の放送予定"
          seeAllHref="/schedule"
          seeAllLabel="全放送予定 →"
        />
        <div className="grid grid-cols-1 gap-4">
          {thisWeekendBroadcasts.map((w) => (
            <BroadcastTable key={`${w.series}-${w.round}`} weekend={w} />
          ))}
        </div>
      </Section>

      {/* News */}
      <Section>
        <SectionHeader title="最新ニュース" seeAllHref="/news" seeAllLabel="すべてのニュース →" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {homeNews.map((n, i) => (
            <NewsCard key={`${n.category}-${i}`} item={n} />
          ))}
        </div>
      </Section>

      {/* Standings */}
      <Section>
        <SectionHeader title="F1 チャンピオンシップ" seeAllHref="/standings" seeAllLabel="全順位を見る →" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <StandingsCard title="🏎️ ドライバーズ" rows={f1Standings.drivers.slice(0, 5)} />
          <StandingsCard
            title="コンストラクターズ"
            rows={f1Standings.teams.slice(0, 5)}
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
