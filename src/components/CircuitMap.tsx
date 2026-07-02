import { animatedMapExists } from "@/lib/circuits";

/**
 * サーキットのコース図表示（サーバーコンポーネント）。3段フォールバック：
 *  ① map_embed_key があり public/circuit-maps/{key}.html が実在 → 動くコースマップ（iframe）
 *  ② ①が無く map_svg があれば → 静止コース図SVG（flaboテーマ枠内）
 *  ③ どちらも無ければ → 「コース図 準備中 / Coming soon」プレースホルダー
 *
 * 運用: 情報＋静止SVGはチャット側がDB(circuits.map_svg)へ直接投入し、
 *       動くコースマップHTMLは完成したものから public/circuit-maps/ に順次差し込む。
 */
export default function CircuitMap({
  embedKey,
  mapSvg,
  title,
}: {
  embedKey?: string;
  mapSvg?: string;
  title: string;
}) {
  // 共通の外枠（参考HTMLの map-embed と同じ配色）
  const frame =
    "mt-5 border border-white/10 rounded-xl overflow-hidden bg-[#0a1430]";

  // ── tier① 動くコースマップ（iframe） ──
  if (animatedMapExists(embedKey)) {
    return (
      <div className={frame}>
        <iframe
          src={`/circuit-maps/${embedKey}.html`}
          title={title}
          loading="lazy"
          className="w-full h-[520px] max-[560px]:h-[360px] block border-0"
        />
      </div>
    );
  }

  // ── tier② 静止コース図（SVG） ──
  if (mapSvg && mapSvg.trim()) {
    return (
      <div className={frame}>
        <div
          className="w-full p-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[520px] text-[#566080]"
          role="img"
          aria-label={title}
          // 静止SVGは信頼できる自前データ（チャット側が投入）。完全な <svg> / 断片 / パスのいずれにも対応。
          dangerouslySetInnerHTML={{ __html: normalizeSvg(mapSvg) }}
        />
      </div>
    );
  }

  // ── tier③ プレースホルダー ──
  return (
    <div className={`${frame} h-[280px] max-[560px]:h-[220px] flex flex-col items-center justify-center gap-2`}>
      <div className="text-[2rem]" aria-hidden>
        🏁
      </div>
      <div className="font-display tracking-[0.2em] text-flabo-grey text-sm">
        コース図 準備中
      </div>
      <div className="font-display tracking-[0.2em] text-flabo-grey/60 text-xs uppercase">
        Coming soon
      </div>
    </div>
  );
}

/**
 * 格納された map_svg を描画可能な SVG マークアップへ整える。
 *  - 完全な <svg …>…</svg> → そのまま
 *  - <path>/<g> 等の SVG 子要素の断片 → 既定 viewBox の <svg> でラップ
 *  - 生のパスデータ（"M… C…"） → <path> に包んでから <svg> でラップ
 * currentColor を stroke に使い、テーマ色（親の text 色）でコースラインを描く。
 */
function normalizeSvg(raw: string): string {
  const s = raw.trim();
  if (s.toLowerCase().startsWith("<svg")) return s;
  const inner = s.startsWith("<")
    ? s
    : `<path d="${s.replace(/"/g, "&quot;")}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none" stroke="currentColor">${inner}</svg>`;
}
