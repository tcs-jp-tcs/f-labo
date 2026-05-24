import Link from "next/link";

export default function SectionHeader({
  title,
  seeAllHref,
  seeAllLabel = "すべて見る →",
}: {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display font-bold uppercase tracking-[0.32em] text-xs flex items-center gap-3">
        <span className="block w-6 h-[3px] bg-flabo-red" aria-hidden />
        {title}
      </h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="font-display tracking-[0.08em] text-xs text-flabo-grey hover:text-flabo-red transition-colors"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  );
}
