import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import NewsArchive from "@/components/NewsArchive";
import { getArchivedNews } from "@/lib/news";

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
