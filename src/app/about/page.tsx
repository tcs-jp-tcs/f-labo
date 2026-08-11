import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "運営者情報 | フォーミュラ研究所（Fラボ）",
  description:
    "フォーミュラ研究所（Fラボ）の運営者情報、サイト方針、扱うシリーズ、情報ソースについて。",
};

export default function AboutPage() {
  return (
    <Section>
      <SectionHeader title="運営者情報" />
      <article className="max-w-3xl text-sm leading-relaxed space-y-8 text-white/80">
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-3">
            サイト概要
          </h3>
          <p>
            「フォーミュラ研究所（Fラボ）」は、F1・F2・F3・スーパーフォーミュラ・インディカーといったフォーミュラ系モータースポーツを、ひとつのサイトでまとめて追えるようにすることを目的とした個人運営メディアです。
            日本国内のファンが見やすい時刻表記（0:30／早朝4:50 形式）と、各シリーズの最新ニュース・スケジュール・放送予定・順位表・レースレビューを集約しています。
          </p>
        </section>

        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-3">
            取り扱うシリーズ
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="rounded-lg border border-white/5 bg-flabo-carbon px-4 py-3">
              <div className="font-display font-bold tracking-wider text-white">F1</div>
              <div className="text-xs text-flabo-grey mt-1">FIA Formula One World Championship</div>
            </li>
            <li className="rounded-lg border border-white/5 bg-flabo-carbon px-4 py-3">
              <div className="font-display font-bold tracking-wider text-white">F2 / F3</div>
              <div className="text-xs text-flabo-grey mt-1">FIA Formula 2・Formula 3 Championship</div>
            </li>
            <li className="rounded-lg border border-white/5 bg-flabo-carbon px-4 py-3">
              <div className="font-display font-bold tracking-wider text-white">スーパーフォーミュラ</div>
              <div className="text-xs text-flabo-grey mt-1">全日本スーパーフォーミュラ選手権</div>
            </li>
            <li className="rounded-lg border border-white/5 bg-flabo-carbon px-4 py-3">
              <div className="font-display font-bold tracking-wider text-white">インディカー</div>
              <div className="text-xs text-flabo-grey mt-1">NTT INDYCAR SERIES</div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-3">
            情報ソース
          </h3>
          <p className="mb-3">
            掲載するレース結果・順位表・スケジュール・ニュースは、原則として下記のような公式・準公式ソースを参照しています。
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>Formula1.com（F1 公式）</li>
            <li>FIA Formula 2 / Formula 3 公式</li>
            <li>スーパーフォーミュラ公式 / AUTOSPORT web</li>
            <li>INDYCAR.com / Motorsport.com</li>
            <li>各シリーズを取り扱う一次・二次報道メディア</li>
          </ul>
          <p className="mt-3 text-xs text-flabo-grey">
            原則として、各記事・結果には出典元へのリンクを掲載しています。
          </p>
        </section>

        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-3">
            運営者
          </h3>
          <div className="rounded-xl border border-white/5 bg-flabo-carbon p-6 space-y-2">
            <div>
              <div className="text-xs text-flabo-grey">運営</div>
              <div className="font-bold">フォーミュラ研究所（Fラボ）編集部</div>
            </div>
            <div>
              <div className="text-xs text-flabo-grey">制作</div>
              <a
                className="font-bold text-white hover:text-flabo-red transition-colors"
                href="https://tcs-jp.vercel.app"
                target="_blank"
                rel="noopener"
              >
                TCS
              </a>
            </div>
            <div>
              <div className="text-xs text-flabo-grey">サイト</div>
              <Link
                className="font-bold text-white hover:text-flabo-red transition-colors"
                href="/"
              >
                https://f-labo.vercel.app
              </Link>
            </div>
            <div>
              <div className="text-xs text-flabo-grey">連絡先</div>
              <a
                className="font-bold text-white hover:text-flabo-red transition-colors"
                href="mailto:info.tcsjp@gmail.com"
              >
                info.tcsjp@gmail.com
              </a>
            </div>
          </div>
        </section>

        <p className="text-xs text-flabo-grey">
          ※当サイトは F1、FIA、INDYCAR、スーパーフォーミュラ等の各公式団体とは一切関係のない、独立した個人運営メディアです。
        </p>
      </article>
    </Section>
  );
}
