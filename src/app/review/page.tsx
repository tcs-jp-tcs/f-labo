import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ReviewBrowser from "@/components/ReviewBrowser";
import { getActiveReviews } from "@/lib/reviews";

// レビューはSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

export default async function ReviewPage() {
  const items = await getActiveReviews();

  return (
    <Section>
      <SectionHeader title="レースレビュー" />
      <p className="text-flabo-grey text-sm mb-6">
        Fラボ独自の視点でまとめるレース後の振り返り記事。
      </p>
      <ReviewBrowser items={items} />
    </Section>
  );
}
