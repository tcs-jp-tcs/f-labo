/**
 * テスト運用バナー。表示は環境変数で制御（将来メンテ時に再表示できるよう削除はしない）。
 * NEXT_PUBLIC_SHOW_TEST_BANNER === "true" のときだけ表示。未設定/その他は非表示（既定）。
 * ※ NEXT_PUBLIC_* はビルド時に埋め込まれるため、Vercelで値を変えたら再デプロイで反映される。
 */
export default function TestBanner() {
  if (process.env.NEXT_PUBLIC_SHOW_TEST_BANNER !== "true") return null;
  return (
    <div
      role="status"
      className="bg-flabo-yellow text-flabo-darker text-center text-[0.7rem] md:text-xs font-bold tracking-wider py-1.5 px-3 relative z-[102]"
    >
      🚧 現在テスト運用中です — 表示内容は予告なく変更される場合があります
    </div>
  );
}
