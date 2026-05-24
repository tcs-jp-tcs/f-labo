import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import HeroFeature from "@/components/HeroFeature";
import { reviews, seriesLabel } from "@/lib/data";

export default function ReviewPage() {
  const [featured, ...rest] = reviews;

  return (
    <>
      <Section>
        <SectionHeader title="レースレビュー" />
        <HeroFeature review={featured} />
      </Section>

      <Section>
        <SectionHeader title="過去のレビュー" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {rest.map((r) => (
            <article
              key={`${r.series}-${r.round}`}
              className="rounded-xl border border-white/5 bg-flabo-carbon p-6 hover:border-flabo-red transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display tracking-[0.18em] text-[0.6rem] text-flabo-grey">
                  {seriesLabel[r.series]} · ROUND {r.round}
                </span>
                <span className="text-[0.7rem] text-flabo-grey">{r.date}</span>
              </div>
              <h3 className="font-display font-black text-lg leading-tight mb-2">
                <span className="text-flabo-red">{r.gpName}</span>
                <br />
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{r.excerpt}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
