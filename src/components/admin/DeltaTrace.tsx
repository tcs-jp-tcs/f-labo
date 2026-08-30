import type { SnsPost } from "@/lib/telemetry";

/**
 * Delta Trace — 1投稿を1行として、中心線から左に IG リーチ、右に YT 再生を伸ばす。
 * 全投稿の最大値を基準に幅を正規化するので、どちらで伸びたかが横方向で読める。
 */
const fmt = (value: number | null): string =>
  value == null ? "—" : value.toLocaleString("en-US");

export default function DeltaTrace({ posts }: { posts: SnsPost[] }) {
  if (posts.length === 0) {
    return <div className="empty">データなし</div>;
  }

  const max = Math.max(
    1,
    ...posts.flatMap((p) => [p.igReach ?? 0, p.ytViews ?? 0]),
  );

  return (
    <div className="trace">
      <div className="axis-hd">
        <div className="l">← Instagram</div>
        <div className="c">投稿</div>
        <div>YouTube →</div>
      </div>
      {posts.map((post) => {
        const leftWidth = ((post.igReach ?? 0) / max) * 100;
        const rightWidth = ((post.ytViews ?? 0) / max) * 100;
        return (
          <div className="row" key={post.id}>
            <div className="bar-l">
              <span className={`num ${post.winner === "ig" ? "hi" : ""} ${post.igReach == null ? "nil" : ""}`}>
                {fmt(post.igReach)}
              </span>
              <span className="bar" style={{ width: `${leftWidth}%` }} />
            </div>
            <div className="label">
              <span className="d">{post.dateLabel}</span>
              {post.title}
            </div>
            <div className="bar-r">
              <span className="bar" style={{ width: `${rightWidth}%` }} />
              <span className={`num ${post.winner === "yt" ? "hi" : ""} ${post.ytViews == null ? "nil" : ""}`}>
                {fmt(post.ytViews)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
