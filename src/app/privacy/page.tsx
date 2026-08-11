import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "プライバシーポリシー | フォーミュラ研究所（Fラボ）",
  description:
    "フォーミュラ研究所（Fラボ）のプライバシーポリシー。アクセス解析・アフィリエイト・Cookie の取り扱いについて記載しています。",
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeader title="プライバシーポリシー" />
      <article className="prose prose-invert max-w-3xl text-sm leading-relaxed space-y-6 text-white/80">
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">1. 個人情報の取得について</h3>
          <p>
            当サイト（フォーミュラ研究所、以下「当サイト」）には、お問い合わせフォームはありません。お問い合わせページではメールアドレスを表示しており、ご連絡はお使いのメールソフトから直接送信していただく形です。そのため、当サイトのサーバーがお名前・メールアドレス等を受け取ることはありません。
          </p>
          <p className="mt-3">
            いただいたメールは、お問い合わせへの返信および当サイトの運営目的以外には使用しません。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">2. アクセス解析ツールについて</h3>
          <p>
            当サイトでは、サイト改善のため Google LLC が提供する Google アナリティクス（Google Analytics 4）を利用しています。Google アナリティクスは Cookie を使用して閲覧状況を収集しますが、氏名・住所等の個人を特定する情報は含みません。収集された情報は Google のプライバシーポリシーに基づいて管理されます。Cookie の使用はブラウザの設定で無効にすることができます。
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-3">
            <li>
              <a
                className="text-flabo-red hover:underline"
                href="https://policies.google.com/privacy?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google のプライバシーポリシー
              </a>
            </li>
            <li>
              <a
                className="text-flabo-red hover:underline"
                href="https://tools.google.com/dlpage/gaoptout?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google アナリティクス オプトアウト アドオン
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">3. アフィリエイトプログラムについて</h3>
          <p>
            当サイトは、Amazon.co.jp を宣伝しリンクすることで紹介料を得る手段を提供するAmazonアソシエイト・プログラムの参加者です。広告であることが分かるよう、該当箇所には「PR」の表示をしています。リンク先での購入・行動に関して、当サイトは責任を負いません。
          </p>
          <p className="mt-3">
            なお、当サイトでは第三者配信の広告サービス（Google AdSense 等）は利用していません。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">4. 翻訳機能について</h3>
          <p>
            当サイトは Google 翻訳のウィジェットを利用した多言語表示に対応しています。日本語以外の言語を選択された場合、選択された言語を記録するための Cookie（googtrans）を発行します。日本語に戻すと、この Cookie は削除されます。翻訳処理は Google 側で行われます。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">5. 外部サービスの埋め込みについて</h3>
          <p>
            当サイトでは、記事等に YouTube・TikTok・Instagram の投稿を埋め込んで表示する場合があります。これらを表示する際、各サービスのスクリプトが読み込まれ、各社が Cookie を発行することがあります。これらの Cookie の内容・保存期間は各社の定めによります。
          </p>
          <p className="mt-3">
            また、ニュース記事のサムネイル画像等について、出典元サイトの画像を直接参照している場合があります。この場合、画像の配信元サーバーに閲覧者の IP アドレス等の通信情報が送信されます。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">6. 当サイトが保存する情報について</h3>
          <p>
            当サイトにはユーザー登録・ログイン機能はありません。
          </p>
          <p className="mt-3">
            アンケート（投票）機能をご利用いただいた場合、どの設問にどの選択肢が選ばれたかのみをデータベースに保存します。IP アドレス・端末情報・その他の個人を特定しうる情報は保存していません。
          </p>
          <p className="mt-3">
            また、閲覧の利便性のため、以下の情報をお使いのブラウザ内（ローカルストレージ）に保存します。これらは当サイトのサーバーには送信されません。
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-3">
            <li>選択された表示言語</li>
            <li>設定された表示タイムゾーン</li>
            <li>投票済みのアンケートと選んだ選択肢</li>
          </ul>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">7. 著作権について</h3>
          <p>
            当サイト掲載のレース結果、ドライバー名、チーム名、画像、ロゴ等の著作権・商標権は各権利者に帰属します。引用にあたっては出典元のリンクを明記しています。万が一、権利侵害となる箇所があった場合はお問い合わせよりご連絡ください。速やかに対応いたします。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">8. 免責事項</h3>
          <p>
            当サイトの情報は最新の公式情報に基づき可能な限り正確を期していますが、その正確性・完全性を保証するものではありません。情報の利用によって生じたいかなる損害についても当サイトは責任を負いません。
          </p>
        </section>
        <section>
          <h3 className="font-display tracking-[0.18em] text-flabo-red text-xs uppercase mb-2">9. ポリシーの変更</h3>
          <p>
            本ポリシーの内容は、必要に応じて予告なく変更されることがあります。変更後の内容は当ページに掲載された時点で効力を持ちます。
          </p>
        </section>
        <p className="text-xs text-flabo-grey">最終更新日：2026年8月11日</p>
      </article>
    </Section>
  );
}
