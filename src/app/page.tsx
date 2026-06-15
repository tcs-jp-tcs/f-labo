import Link from "next/link";
import HeroFeature from "@/components/HeroFeature";
import PodiumCard from "@/components/PodiumCard";
import SnsCard from "@/components/SnsCard";
import VideoCard from "@/components/VideoCard";
import EmbedList from "@/components/EmbedList";
import AmazonPromo from "@/components/AmazonPromo";
import ScheduleList from "@/components/ScheduleList";
import NewsCard from "@/components/NewsCard";
import StandingsCard from "@/components/StandingsCard";
import SectionHeader from "@/components/SectionHeader";
import Section from "@/components/Section";
import MainLogo from "@/components/MainLogo";
import { seriesLabel } from "@/lib/data";
import type { ScheduleItem, Series } from "@/lib/data";
import { getActiveNews } from "@/lib/news";
import { getActiveEmbeds } from "@/lib/embeds";
import { getRecentResults } from "@/lib/results";
import { getSchedules, selectWeekendItems } from "@/lib/schedules";
import { getStandings } from "@/lib/standings";
import { isSeriesVisible } from "@/lib/displayConfig";

// 【応急処置】YouTubeチャンネル削除（ポリシー誤検知・再審査請求中）に伴い、
// ホームの「人気動画」セクション（YouTube Short埋め込み）を一旦非表示にする。
// チャンネル復活時は true に戻すだけで元通り表示される。
const SHOW_YOUTUBE_SECTION = false;

// ホームのニュース（ヒーロー＋最新3件）をSupabaseの最新状態で反映（静的化させない）
export const revalidate = 0;

export default async function HomePage() {
  const homeNews = await getActiveNews();
  const [recentResults, schedules, standings, embeds] = await Promise.all([
    getRecentResults(),
    getSchedules(),
    getStandings(),
    getActiveEmbeds(),
  ]);
  const featuredNews = homeNews[0];
  const restHomeNews = homeNews.slice(1, 4);
  // 結果ページと同じ基準：display_order 昇順の先頭を表示する（FP/予選/スプリント/決勝いずれも対象）。
  // カテゴリ表示制御（displayConfig）に従い、表示対象シリーズ（現状F1のみ）の最新結果に固定する。
  const sidebarResult =
    recentResults.find((r) => isSeriesVisible(r.series)) ?? recentResults[0];

  // 今週のレース予定：schedules の is_weekend=true を単一ソースとして優先度順
  // （F1→F2→F3→SF→INDY）で取得する。今週末セットの切替は schedules の is_weekend を
  // 立て替えるだけでよい（旧 weekend_broadcasts テーブルは廃止）。
  // 先頭カード（最優先シリーズ）のみ NEXT として初期展開し、他は閉じた状態にする。
  const weekendItems: ScheduleItem[] = selectWeekendItems(schedules).map(
    (item, i) => ({ ...item, status: i === 0 ? ("next" as const) : undefined }),
  );
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
              category={sidebarResult.series}
            />
            <SnsCard />
          </div>
        </div>
      </section>

      {/* Latest video (YouTube Short) — FOLLOW US の直下・最新ニュースの上 */}
      {/* 【応急処置】YouTubeチャンネル復活までセクションごと非表示（SHOW_YOUTUBE_SECTION） */}
      {SHOW_YOUTUBE_SECTION && (
        <Section className="py-6">
          <VideoCard />
        </Section>
      )}

      {/* 動画埋め込み（DB: embeds テーブル駆動）— 動画 と 最新ニュース の間（Amazonバナーの上）。
          active=true の行を display_order 順に TikTok/Instagram 出し分けで表示。差し替えはDBのみ。 */}
      {embeds.length > 0 && (
        <Section className="py-6">
          <EmbedList embeds={embeds} />
        </Section>
      )}

      {/* Amazon アソシエイト プロモ（動画 と 最新ニュース の間） */}
      <Section className="py-6">
        <AmazonPromo />
      </Section>

      {/* News */}
      <Section>
        <SectionHeader title="最新ニュース" seeAllHref="/news" seeAllLabel="すべてのニュース →" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {restHomeNews.map((n, i) => (
            <NewsCard key={`${n.category}-${i}`} item={n} />
          ))}
        </div>
      </Section>

      {/* This Weekend — 今週のレース予定（展開カードに一本化） */}
      <Section>
        <SectionHeader
          title="📺 今週のレース予定"
          seeAllHref="/schedule"
          seeAllLabel="全スケジュールを見る →"
        />
        {weekendItems.length > 0 ? (
          <ScheduleList items={weekendItems} variant="weekend" />
        ) : (
          <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5 space-y-3">
            <p className="font-display tracking-[0.18em] text-xs text-flabo-grey uppercase">
              📅 今週末のレースはありません
            </p>
            <p className="text-xs text-flabo-grey leading-relaxed">
              次回レースのあるカテゴリ：
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[0.8rem]">
              {(Object.keys(schedules) as Series[]).filter(isSeriesVisible).map((s) => {
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
            順位表を詳しく見る →
          </Link>
        </div>
      </Section>
    </>
  );
}
