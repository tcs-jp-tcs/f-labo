import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import NewsList from "@/components/NewsList";
import { getActiveNews } from "@/lib/news";

export default async function NewsPage() {
  const items = await getActiveNews();

  return (
    <Section>
      <SectionHeader title="ニュース" />
      <NewsList items={items} />
    </Section>
  );
}
