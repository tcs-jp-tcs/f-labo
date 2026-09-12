import type { Insight } from "@/lib/report";

/** 所見カード。このページの本体なので数字の表より大きく見せる */
const dotted = (date: string): string => date.replaceAll("-", ".");

type MonthGroup = {
  /** YYYY-MM */
  key: string;
  label: string;
  insights: Insight[];
};

/** written_on の年月でまとめる。insights は並び替え済みなので出現順をそのまま保つ */
function groupByMonth(insights: Insight[]): MonthGroup[] {
  const groups: MonthGroup[] = [];

  for (const insight of insights) {
    const key = insight.writtenOn.slice(0, 7);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      const [year, month] = key.split("-");
      group = { key, label: `${year}年${Number(month)}月`, insights: [] };
      groups.push(group);
    }
    group.insights.push(insight);
  }

  return groups;
}

export default function InsightCards({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return <div className="empty">データなし</div>;

  const groups = groupByMonth(insights);
  // 通し番号はグループをまたいで連番（01 が最新）
  let no = 0;

  return (
    <div className="ins-groups">
      {groups.map((group, groupIndex) => (
        // 最新の月だけ開いた状態。それ以外は見出しクリックで開く
        <details className="ins-group" key={group.key} open={groupIndex === 0}>
          <summary className="ins-group-hd">
            <span className="ins-group-mark" aria-hidden="true" />
            <span className="ins-group-title">{group.label}</span>
            <span className="ins-group-count">（{group.insights.length}件）</span>
          </summary>
          <div className="ins">
            {group.insights.map((insight) => {
              no += 1;
              return (
                <article className="ins-card" key={insight.id}>
                  <div className="ins-top">
                    <span className="ins-no">{String(no).padStart(2, "0")}</span>
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
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}
