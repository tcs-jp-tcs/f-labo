import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "お問い合わせ | フォーミュラ研究所（Fラボ）",
  description:
    "フォーミュラ研究所（Fラボ）へのお問い合わせ・取材依頼・権利関係のご連絡先について。",
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeader title="お問い合わせ" />
      <article className="max-w-3xl text-sm leading-relaxed space-y-6 text-white/80">
        <p>
          フォーミュラ研究所（Fラボ）へのお問い合わせ、誤情報のご報告、取材・掲載依頼、著作権・商標に関するご連絡は以下の方法でお願いいたします。
        </p>

        <div className="rounded-xl border border-white/5 bg-flabo-carbon p-6 space-y-4">
          <div>
            <div className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-1">
              メール
            </div>
            <a
              href="mailto:info.tcsjp@gmail.com"
              className="text-base font-bold text-white hover:text-flabo-red transition-colors"
            >
              info.tcsjp@gmail.com
            </a>
            <p className="text-xs text-flabo-grey mt-1">
              ※ご返信までに数日いただく場合があります。
            </p>
          </div>
          <div>
            <div className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-1">
              X（旧 Twitter）
            </div>
            <a
              href="https://x.com/flabo_jp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-white hover:text-flabo-red transition-colors"
            >
              @flabo_jp
            </a>
            <p className="text-xs text-flabo-grey mt-1">
              DM もしくはメンションでお気軽にどうぞ。
            </p>
          </div>
        </div>

        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">
            お問い合わせ前にご確認ください
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              レース結果・順位表に誤りがある場合は、可能であれば該当ページ URL と出典元 URL を添えてご連絡ください。
            </li>
            <li>
              掲載画像・ロゴ等の権利者の方からのご連絡には最優先で対応いたします。
            </li>
          </ul>
        </section>
      </article>
    </Section>
  );
}
