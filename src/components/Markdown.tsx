import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 依存ゼロの軽量 Markdown レンダラ。
 * レビュー記事（/review）本文のタイポグラフィに合わせたスタイルで描画する。
 * 対応: 見出し(#/##/###)、段落、箇条書き(- / *)、番号付き(1.)、引用(>)、
 *       水平線(---)、強調(**bold**)、リンク([text](url))。
 */

/** インライン: **bold** と [text](url) を解釈 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-white">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      const label = match[4];
      const href = match[5];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        external ? (
          <a
            key={`${keyPrefix}-a-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flabo-red hover:underline"
          >
            {label}
          </a>
        ) : (
          <Link
            key={`${keyPrefix}-a-${i}`}
            href={href}
            className="text-flabo-red hover:underline"
          >
            {label}
          </Link>
        ),
      );
    }
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) {
      blocks.push(
        <p key={`p-${key}`}>{renderInline(text, `p-${key}`)}</p>,
      );
      key++;
    }
    para = [];
  };

  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();

    if (t === "") {
      flushPara();
      i++;
      continue;
    }

    if (/^###\s+/.test(t)) {
      flushPara();
      blocks.push(
        <h3 key={`h3-${key++}`} className="font-bold text-base mt-2 mb-2">
          {renderInline(t.replace(/^###\s+/, ""), `h3-${key}`)}
        </h3>,
      );
      i++;
      continue;
    }

    if (/^##\s+/.test(t)) {
      flushPara();
      blocks.push(
        <h2
          key={`h2-${key++}`}
          className="font-display font-bold uppercase tracking-[0.18em] text-sm text-flabo-red mb-3 pt-4"
        >
          {renderInline(t.replace(/^##\s+/, ""), `h2-${key}`)}
        </h2>,
      );
      i++;
      continue;
    }

    if (/^#\s+/.test(t)) {
      flushPara();
      blocks.push(
        <h2
          key={`h1-${key++}`}
          className="font-display font-black text-xl md:text-2xl leading-snug pt-4 mb-3"
        >
          {renderInline(t.replace(/^#\s+/, ""), `h1-${key}`)}
        </h2>,
      );
      i++;
      continue;
    }

    if (/^---+$/.test(t)) {
      flushPara();
      blocks.push(
        <hr key={`hr-${key++}`} className="border-white/10 my-2" />,
      );
      i++;
      continue;
    }

    if (/^>\s?/.test(t)) {
      flushPara();
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={`bq-${key++}`}
          className="border-l-2 border-flabo-red/60 pl-4 italic text-white/70"
        >
          {renderInline(quote.join(" "), `bq-${key}`)}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(t)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-5 space-y-1.5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul-${key}-${idx}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(t)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${key++}`} className="list-decimal pl-5 space-y-1.5">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol-${key}-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    para.push(t);
    i++;
  }
  flushPara();

  return (
    <div className="space-y-5 text-[0.9rem] md:text-[0.95rem] leading-[1.85] text-white/85">
      {blocks}
    </div>
  );
}
