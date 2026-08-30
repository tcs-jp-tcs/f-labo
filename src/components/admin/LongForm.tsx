import type { FormatCompare, SnsPost } from "@/lib/telemetry";

/**
 * LONG FORM — YouTube 長尺（format='long'）の実績。
 * 長尺は Instagram に出していないため IG の列は持たず、YouTube 再生数の横棒だけを出す。
 * 上部にショート平均との比較を置き、尺の違いによる伸びの差が読めるようにする。
 */
const num = (value: number | null): string =>
  value == null ? "—" : value.toLocaleString("en-US");

function AverageCompare({ compare }: { compare: FormatCompare }) {
  const { shortAvgYt, longAvgYt } = compare;
  if (shortAvgYt == null && longAvgYt == null) return null;

  const max = Math.max(1, shortAvgYt ?? 0, longAvgYt ?? 0);
  const rows: { label: string; sub: string; value: number | null; kind: string }[] = [
    {
      label: "ショート平均",
      sub: `${compare.shortCount} 本`,
      value: shortAvgYt,
      kind: "short",
    },
    {
      label: "長尺平均",
      sub: `${compare.longCount} 本`,
      value: longAvgYt,
      kind: "long",
    },
  ];

  const ratio =
    shortAvgYt != null && longAvgYt != null && longAvgYt > 0
      ? shortAvgYt / longAvgYt
      : null;

  return (
    <div className="lf-cmp">
      <div className="lf-cmp-hd">1本あたりの YouTube 再生数（平均）</div>
      {rows.map((row) => (
        <div className={`lf-cmp-row ${row.kind}`} key={row.kind}>
          <span className="lf-cmp-name">
            {row.label}
            <small>{row.sub}</small>
          </span>
          <span className="lf-cmp-track">
            <span
              className="lf-cmp-fill"
              style={{ width: `${((row.value ?? 0) / max) * 100}%` }}
            />
          </span>
          <span className="lf-cmp-val">{num(row.value)}</span>
        </div>
      ))}
      {ratio != null && (
        <p className="lf-cmp-note">
          {`ショートは長尺の約 ${ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)} 倍再生されている`}
        </p>
      )}
    </div>
  );
}

export default function LongForm({
  posts,
  compare,
}: {
  posts: SnsPost[];
  compare: FormatCompare;
}) {
  if (posts.length === 0) {
    return <div className="empty">データなし</div>;
  }

  const max = Math.max(1, ...posts.map((p) => p.ytViews ?? 0));

  return (
    <>
      <AverageCompare compare={compare} />
      <div className="lf">
        {posts.map((post) => (
          <div className="lf-row" key={post.id}>
            <div className="lf-name">
              <span className="d">{post.dateLabel}</span>
              {post.ytUrl ? (
                <a href={post.ytUrl} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              ) : (
                post.title
              )}
              <small>{post.genre}</small>
            </div>
            <div className="lf-bar">
              <span
                className="fill"
                style={{ width: `${((post.ytViews ?? 0) / max) * 100}%` }}
              />
              <span className={`v ${post.ytViews == null ? "nil" : ""}`}>
                {num(post.ytViews)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
