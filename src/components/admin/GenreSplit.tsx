import type { GenreStat } from "@/lib/telemetry";

/** ジャンル別に IG リーチ・YT 再生の合計を並べた横棒グラフ */
export default function GenreSplit({ genres }: { genres: GenreStat[] }) {
  if (genres.length === 0) {
    return <div className="empty">データなし</div>;
  }

  const max = Math.max(1, ...genres.flatMap((g) => [g.ig, g.yt]));

  return (
    <div className="genres">
      {genres.map((genre) => (
        <div className="g" key={genre.genre}>
          <div className="g-name">
            {genre.genre}
            <small>{genre.count} POSTS</small>
          </div>
          <div className="g-bars">
            <div className="g-bar ig">
              <span className="t">IG</span>
              <span className="fill" style={{ width: `${(genre.ig / max) * 100}%` }} />
              <span className="v">{genre.ig.toLocaleString("en-US")}</span>
            </div>
            <div className="g-bar yt">
              <span className="t">YT</span>
              <span className="fill" style={{ width: `${(genre.yt / max) * 100}%` }} />
              <span className="v">{genre.yt.toLocaleString("en-US")}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
