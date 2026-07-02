/**
 * サーキットのインタラクティブ・コースマップ＋標高プロファイル埋め込み。
 * CD（Claude）が生成した自己完結HTMLを public/circuit-maps/{embedKey}.html に置き、
 * iframe で同ページに統合する。バンドル済み（base64アセット+JSレンダラ）なので
 * 外部ネットワーク不要でそのまま描画される。
 */
export default function CircuitMap({
  embedKey,
  title,
}: {
  embedKey: string;
  title: string;
}) {
  return (
    <div className="mt-5 border border-white/10 rounded-xl overflow-hidden bg-[#0a1430]">
      <iframe
        src={`/circuit-maps/${embedKey}.html`}
        title={title}
        loading="lazy"
        className="w-full h-[520px] max-[560px]:h-[360px] block border-0"
      />
    </div>
  );
}
