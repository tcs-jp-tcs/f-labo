import type { Insight } from "@/lib/report";

/** 所見カード。このページの本体なので数字の表より大きく見せる */
const dotted = (date: string): string => date.replaceAll("-", ".");

export default function InsightCards({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return <div className="empty">データなし</div>;

  return (
    <div className="ins">
      {insights.map((insight, index) => (
        <article className="ins-card" key={insight.id}>
          <div className="ins-top">
            <span className="ins-no">{String(index + 1).padStart(2, "0")}</span>
            <span className="ins-section">{insight.section}</span>
            <span className="ins-date">{dotted(insight.writtenOn)}</span>
          </div>
          <h3 className="ins-headline">{insight.headline}</h3>
          <p className="ins-body">{insight.body}</p>
          {insight.evidence && (
            <div className="ins-evidence">
              <span className="ins-evidence-lbl">Evidence</span>
              <code>{insight.evidence}</code>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
