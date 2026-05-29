import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import NewsArchive from "@/components/NewsArchive";
import { getArchivedNews } from "@/lib/news";

// ニュースはSupabaseの最新状態を常に反映（静的化させない）
export const revalidate = 0;

export default async function NewsArchivePage() {
  const items = await getArchivedNews();

  return (
    <Section>
      <SectionHeader
        title="ニュースアーカイブ"
        seeAllHref="/news"
        seeAllLabel="最新ニュースへ →"
      />
      <NewsArchive items={items} />
    </Section>
  );
}
