"use client";

import { useMemo, useState } from "react";
import type { SnsPost, Winner } from "@/lib/telemetry";

/** 全投稿ログ。列見出しクリックでソートする */

type SortKey =
  | "title"
  | "postedAt"
  | "genre"
  | "igReach"
  | "igLikes"
  | "igSaves"
  | "igShares"
  | "ytViews"
  | "ytLikes"
  | "winner";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "title", label: "投稿" },
  { key: "postedAt", label: "日付" },
  { key: "genre", label: "ジャンル" },
  { key: "igReach", label: "IGリーチ" },
  { key: "igLikes", label: "IGいいね" },
  { key: "igSaves", label: "保存" },
  { key: "igShares", label: "シェア" },
  { key: "ytViews", label: "YT再生" },
  { key: "ytLikes", label: "YTいいね" },
  { key: "winner", label: "優位" },
];

const WINNER_LABEL: Record<Winner, string> = {
  ig: "IG",
  yt: "YT",
  tie: "拮抗",
  na: "計測中",
};

const WINNER_ORDER: Record<Winner, number> = { ig: 0, yt: 1, tie: 2, na: 3 };

const fmt = (value: number | null): string =>
  value == null ? "—" : value.toLocaleString("en-US");

export default function FullLog({ posts }: { posts: SnsPost[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("igReach");
  const [direction, setDirection] = useState<-1 | 1>(-1);

  const rows = useMemo(() => {
    const compare = (a: SnsPost, b: SnsPost): number => {
      if (sortKey === "title" || sortKey === "genre" || sortKey === "postedAt") {
        const x = a[sortKey];
        const y = b[sortKey];
        return x.localeCompare(y, "ja") * direction;
      }
      if (sortKey === "winner") {
        return (WINNER_ORDER[a.winner] - WINNER_ORDER[b.winner]) * direction;
      }
      const x = a[sortKey];
      const y = b[sortKey];
      // 未計測（null）は方向に関わらず常に末尾へ
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      return (x - y) * direction;
    };
    return [...posts].sort(compare);
  }, [posts, sortKey, direction]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setDirection((prev) => (prev === -1 ? 1 : -1));
    } else {
      setSortKey(key);
      setDirection(-1);
    }
  }

  if (posts.length === 0) {
    return <div className="empty">データなし</div>;
  }

  return (
    <div className="tbl-wrap">
      <table>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                className={column.key === sortKey ? "on" : ""}
                onClick={() => handleSort(column.key)}
                aria-sort={
                  column.key === sortKey
                    ? direction === -1
                      ? "descending"
                      : "ascending"
                    : "none"
                }
              >
                {column.label}
                {column.key === sortKey && (
                  <span className="ar">{direction === -1 ? "▼" : "▲"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((post) => {
            const primaryUrl = post.igUrl ?? post.ytUrl;
            return (
              <tr key={post.id}>
                <td>
                  {primaryUrl ? (
                    <a href={primaryUrl} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  ) : (
                    post.title
                  )}
                  {post.igUrl && post.ytUrl && (
                    <a className="lk" href={post.ytUrl} target="_blank" rel="noopener noreferrer">
                      YT↗
                    </a>
                  )}
                </td>
                <td>{post.dateLabel}</td>
                <td>{post.genre}</td>
                <td>{fmt(post.igReach)}</td>
                <td>{fmt(post.igLikes)}</td>
                <td>{fmt(post.igSaves)}</td>
                <td>{fmt(post.igShares)}</td>
                <td>{fmt(post.ytViews)}</td>
                <td>{fmt(post.ytLikes)}</td>
                <td>
                  <span className={`tag ${post.winner}`}>{WINNER_LABEL[post.winner]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
