import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import NewsList from "@/components/NewsList";
import { getActiveNews } from "@/lib/news";

// ニュースはSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

export default async function NewsPage() {
  const items = await getActiveNews();

  return (
    <Section>
      <SectionHeader
        title="ニュース"
        seeAllHref="/news/archive"
        seeAllLabel="アーカイブを見る →"
      />
      <NewsList items={items} />
    </Section>
  );
}
