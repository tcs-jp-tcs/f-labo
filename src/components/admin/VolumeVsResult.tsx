import type { GenrePerformance } from "@/lib/report";

/**
 * 制作本数と中央値を同じ行に並べる。単位が違うのでそれぞれ自分の最大値で正規化し、
 * 「本数のバーは長いのに中央値のバーは短い」ジャンルが一目で分かるようにする。
 */
const num = (value: number): string => Math.round(value).toLocaleString("en-US");

export default function VolumeVsResult({ rows }: { rows: GenrePerformance[] }) {
  if (rows.length === 0) return <div className="empty">データなし</div>;

  const sorted = [...rows].sort((a, b) => b.produced - a.produced);
  const maxProduced = Math.max(1, ...sorted.map((r) => r.produced));
  const maxMedian = Math.max(1, ...sorted.map((r) => r.median));

  return (
    <>
      <div className="legend an-legend vs-legend">
        <span>
          <i className="sw" style={{ background: "var(--tie)" }} />
          制作本数
        </span>
        <span>
          <i className="sw" style={{ background: "var(--flag)" }} />
          YT再生の中央値
        </span>
      </div>
      <div className="vs">
        {sorted.map((row) => (
          <div className="vs-row" key={row.genre}>
            <div className="vs-name">{row.genre}</div>
            <div className="vs-bars">
              <div className="vs-bar count">
                <span className="fill" style={{ width: `${(row.produced / maxProduced) * 100}%` }} />
                <span className="v">{row.produced} 本</span>
              </div>
              <div className="vs-bar median">
                <span className="fill" style={{ width: `${(row.median / maxMedian) * 100}%` }} />
                <span className="v">{num(row.median)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
