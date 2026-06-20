import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "プライバシーポリシー | フォーミュラ研究所（Fラボ）",
  description:
    "フォーミュラ研究所（Fラボ）のプライバシーポリシー。アクセス解析・広告配信・お問い合わせで取得する情報の取り扱いについて記載しています。",
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeader title="プライバシーポリシー" />
      <article className="prose prose-invert max-w-3xl text-sm leading-relaxed space-y-6 text-white/80">
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">1. 個人情報の取得について</h3>
          <p>
            フォーミュラ研究所（以下「当サイト」）は、お問い合わせフォーム等の利用時にお名前・メールアドレス等の個人情報をご入力いただく場合があります。これらの情報は、お問い合わせへの返信および当サイトの運営目的以外には使用しません。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">2. アクセス解析ツールについて</h3>
          <p>
            当サイトでは、サイト改善のため Vercel Analytics 等のアクセス解析ツールを利用する場合があります。これらは Cookie を使用しますが、個人を特定する情報は含みません。Cookie の使用はブラウザの設定で無効にすることができます。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">3. 広告配信について</h3>
          <p>
            当サイトでは将来的に第三者配信の広告サービス（Google AdSense 等）を利用する予定です。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。Cookie を無効にする方法および Google AdSense に関する詳細は、
            <a
              className="text-flabo-red hover:underline ml-1"
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 広告ポリシー
            </a>
            をご確認ください。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">4. 著作権について</h3>
          <p>
            当サイト掲載のレース結果、ドライバー名、チーム名、画像、ロゴ等の著作権・商標権は各権利者に帰属します。引用にあたっては出典元のリンクを明記しています。万が一、権利侵害となる箇所があった場合はお問い合わせよりご連絡ください。速やかに対応いたします。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">5. Amazonアソシエイトについて</h3>
          <p>
            当サイトは、Amazon.co.jpを宣伝しリンクすることで紹介料を得る手段を提供するAmazonアソシエイト・プログラムの参加者です。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">6. 免責事項</h3>
          <p>
            当サイトの情報は最新の公式情報に基づき可能な限り正確を期していますが、その正確性・完全性を保証するものではありません。情報の利用によって生じたいかなる損害についても当サイトは責任を負いません。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">7. ポリシーの変更</h3>
          <p>
            本ポリシーの内容は、必要に応じて予告なく変更されることがあります。変更後の内容は当ページに掲載された時点で効力を持ちます。
          </p>
        </section>
        <p className="text-xs text-flabo-grey">最終更新日：2026年5月24日</p>
      </article>
    </Section>
  );
}
