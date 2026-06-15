import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Markdown from "@/components/Markdown";
import { getNewsById } from "@/lib/news";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNewsById(Number(id));

  // 翻訳/解説本文が無い記事は全文ページを持たない → 404
  if (!item || !item.translationBody) notFound();

  const isCommentary = item.contentType === "commentary";

  return (
    <Section>
      <nav className="mb-6 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
        <Link href="/news" className="hover:text-flabo-red transition-colors">
          ← ニュース一覧
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-display tracking-[0.18em] text-[0.7rem] px-2 py-0.5 rounded bg-flabo-red/15 text-flabo-red">
              {item.category}
            </span>
            {item.source && (
              <span className="font-display tracking-[0.18em] text-[0.7rem] text-flabo-grey uppercase">
                {item.source}
              </span>
            )}
            <span className="text-[0.7rem] text-flabo-grey ml-auto">{item.date}</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl leading-snug">
            {item.title}
          </h1>
        </header>

        {/* commentary: 冒頭の注記ボックス */}
        {isCommentary && (
          <div className="mb-8 rounded-xl border border-white/10 bg-flabo-carbon p-4 text-[0.82rem] leading-relaxed text-white/75">
            📝 この記事は {item.source} の記事をもとに、Fラボが独自に要点をまとめた解説です。全文は
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-flabo-red hover:underline"
            >
              元記事でご確認ください →
            </a>
          </div>
        )}

        <Markdown content={item.translationBody} />

        {/* translation: 末尾の出典クレジット */}
        {!isCommentary && (
          <div className="mt-10 pt-6 border-t border-white/10 text-[0.8rem] text-flabo-grey">
            出典：{item.source}／
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-flabo-red hover:underline"
            >
              原文を読む →
            </a>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-white/10">
          <Link
            href="/news"
            className="font-display tracking-[0.18em] text-[0.75rem] text-flabo-grey hover:text-flabo-red transition-colors"
          >
            ← ニュース一覧へ戻る
          </Link>
        </div>
      </article>
    </Section>
  );
}
