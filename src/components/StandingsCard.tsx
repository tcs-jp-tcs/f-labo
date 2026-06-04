import type { StandingRow } from "@/lib/data";

export default function StandingsCard({
  title,
  rows,
  showTeamBar = false,
}: {
  title: string;
  rows: StandingRow[];
  showTeamBar?: boolean;
}) {
  const teamColor = (name: string): string => {
    const map: Record<string, string> = {
      McLaren: "bg-[#FF8000]",
      Ferrari: "bg-[#DC0000]",
      "Red Bull": "bg-[#1E41FF]",
      Mercedes: "bg-[#00D2BE]",
      "Aston Martin": "bg-[#229971]",
      Williams: "bg-[#1868DB]",
      RB: "bg-[#6692FF]",
      Alpine: "bg-[#FF87BC]",
      Sauber: "bg-[#52E252]",
      Haas: "bg-[#B6BABD]",
    };
    return map[name] ?? "bg-white/30";
  };

  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5">
      <h3 className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-3.5">
        {title}
      </h3>
      {rows.map((row) => (
        <div
          key={`${row.pos}-${row.name}`}
          className="flex items-center py-2 border-b border-white/5 last:border-b-0"
        >
          <span className="font-display font-black text-[0.85rem] w-8 text-flabo-grey">
            {row.pos}
          </span>
          {showTeamBar && (
            <span
              className={`block w-1 h-5 rounded-sm mr-2.5 ${teamColor(row.name)}`}
              aria-hidden
            />
          )}
          <span className="flex-1 font-bold text-[0.8rem]">{row.name}</span>
          <span className="font-display text-[0.75rem] text-flabo-yellow">
            {row.points}
            <span className="text-[0.55rem] text-flabo-grey ml-1">pts</span>
          </span>
        </div>
      ))}
    </div>
  );
}
