import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "レースレビュー（準備中）| フォーミュラ研究所（Fラボ）",
  description:
    "Fラボの独自レビュー記事は現在準備中です。F1とスーパーフォーミュラを中心に順次公開予定です。",
};

export default function ReviewPage() {
  return (
    <Section>
      <SectionHeader title="レースレビュー" />
      <div className="rounded-2xl border border-white/5 bg-flabo-carbon p-10 md:p-16 text-center">
        <div className="font-display tracking-[0.32em] text-flabo-red text-xs uppercase mb-3">
          Coming Soon
        </div>
        <h2 className="font-display font-black text-2xl md:text-3xl mb-4">
          レビュー記事は準備中です
        </h2>
        <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
          Fラボ独自のレビュー記事（F1・スーパーフォーミュラ）は現在準備中です。
          直近の結果や速報については
          <a href="/news" className="text-flabo-red hover:underline mx-1">ニュース</a>
          ／
          <a href="/results" className="text-flabo-red hover:underline mx-1">レース結果</a>
          をご覧ください。
        </p>
      </div>
    </Section>
  );
}
