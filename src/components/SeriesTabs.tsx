"use client";

export default function SeriesTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly T[];
  active: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`font-display tracking-[0.18em] text-[0.6rem] px-3.5 py-1.5 rounded-md border transition-all ${
              isActive
                ? "bg-flabo-red text-white border-flabo-red"
                : "bg-flabo-carbon text-flabo-grey border-white/5 hover:text-white hover:border-white/20"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
