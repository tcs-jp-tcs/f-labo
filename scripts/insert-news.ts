/**
 * ニュース更新スクリプト（2026-05-29 / F1オフウィーク）
 *
 * 実行: cd ~/Desktop/FLabo/f-labo && npx tsx scripts/insert-news.ts
 *
 * 動作:
 *   1) NEW_ARTICLES を news テーブルに INSERT（archived=false）
 *   2) カテゴリ毎の保持ルール（最新9件）を適用し、超過分を archived=true に UPDATE
 *
 * 接続: .env.local の NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   ※ news テーブルは RLS が「SELECT(public read)のみ」許可で、INSERT/UPDATE ポリシーが無い。
 *     anon キーでは書き込みが拒否される（その場合は同梱の .sql を管理権限で実行する）。
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("環境変数が不足しています（NEXT_PUBLIC_SUPABASE_URL / *_ANON_KEY）。");
  process.exit(1);
}

const supabase = createClient(url, key);

const KEEP_PER_CATEGORY = 9;

type NewArticle = {
  category: "F1" | "F2" | "F3" | "SF" | "INDY";
  title: string;
  summary: string;
  source_name: string;
  source_url: string;
  thumbnail_url: string;
  published_at: string; // ISO (JST +09:00)
};

const NEW_ARTICLES: NewArticle[] = [
  {
    category: "F1",
    title:
      "「カナダGPが盛り上がっても2026年規則が正しいわけじゃない」ドライバーたちが新パワーユニットに苦言",
    summary:
      "接戦に沸いたカナダGPだったが、上位陣は2026年の新パワーユニット規則への懸念を改めて口にした。ハミルトンは「ストレートの半ばでパワーが消える」とエネルギーマネジメントの不自然さを指摘。アントネッリも改善は認めつつ「燃焼エンジンのパワー面はまだ煮詰める必要がある」と語り、フェルスタッペンは「面白いレースになったからといって今のルールが正しいとはならない。F1はもっとピュアであるべき」と訴えた。レースの面白さと規則の是非は別問題だという論調が広がっている。",
    source_name: "motorsport.com",
    source_url:
      "https://www.motorsport.com/f1/news/entertaining-canadian-gp-doesnt-mean-rules-are-fine-f1-drivers-say/10824763/",
    thumbnail_url:
      "https://cdn-9.motorsport.com/images/amp/YvKQOrL6/s2/lewis-hamilton-ferrari-max-ver.jpg",
    published_at: "2026-05-28T20:00:00+09:00",
  },
  {
    category: "F1",
    title:
      "ルクレールのリアクションがバズる：ハミルトンが駆るフェラーリ新型EV「Luce」の助手席で大慌て",
    summary:
      "フェラーリが正式発表前の新型電気自動車「Luce」をサーキットで2人のF1ドライバーにテストさせた。ハミルトンがステアリングを握ると、助手席のルクレールが限界まで攻める走りに大げさなほど何度も警告を叫び、その慌てっぷりがSNSで拡散。ファンからは2人の仲の良さや、ドライバーごとに助手席での反応がまるで違う点に注目が集まった。オフウィークの和やかな話題となった。",
    source_name: "motorsport.com",
    source_url:
      "https://www.motorsport.com/f1/news/charles-leclercs-hilarious-reaction-to-lewis-hamilton-driving-ferraris-new-ev-goes-viral/10824846/",
    thumbnail_url:
      "https://cdn-1.motorsport.com/images/amp/0rGXNR72/s1000/charles-leclerc-ferrari-lewis-.webp",
    published_at: "2026-05-28T19:00:00+09:00",
  },
  {
    category: "F1",
    title:
      "メキース「まだ始まりに過ぎない」レッドブル、カナダ表彰台でさらなるリスクを取る姿勢",
    summary:
      "フェルスタッペンのカナダGP3位について、レッドブルのメキース代表は「マイアミ以降の進歩を裏付ける結果であり、我々がリスクを取る戦略も辞さないことを示せた」と前向きに評価。信頼性やバウンシングの課題は残るものの、トップとの差は確実に縮まったと強調した。さらに「ドライバーがマシンをより信頼できるよう、新しいアプローチを試し続ける」と語り、フェルスタッペンとハジャーがそろって今季ベストの結果を残したことに手応えを示した。",
    source_name: "Formula1.com",
    source_url:
      "https://www.formula1.com/en/latest/article/its-only-the-beginning-mekies-insists-red-bull-will-take-more-risks-after-their-return-to-the-podium-in-canada.19EUr2gQA8uScvk3Ee6DbV",
    thumbnail_url:
      "https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277876604.webp",
    published_at: "2026-05-26T12:00:00+09:00",
  },
];

async function main() {
  // 1) INSERT
  const { data: inserted, error: insErr } = await supabase
    .from("news")
    .insert(NEW_ARTICLES.map((a) => ({ ...a, archived: false })))
    .select("id, category, title");

  if (insErr) {
    console.error("❌ INSERT 失敗:", insErr.message);
    console.error(
      "→ RLS で anon の書き込みが拒否された可能性が高い。scripts/insert-news.sql を管理権限で実行してください。",
    );
    process.exit(1);
  }
  console.log(`✅ ${inserted?.length ?? 0} 件を INSERT しました。`);

  // 2) 保持ルール（カテゴリ毎 最新9件）。超過分を archived=true に
  const categories = [...new Set(NEW_ARTICLES.map((a) => a.category))];
  for (const cat of categories) {
    const { data: rows, error: selErr } = await supabase
      .from("news")
      .select("id, published_at")
      .eq("category", cat)
      .eq("archived", false)
      .order("published_at", { ascending: false });
    if (selErr) {
      console.error(`❌ ${cat} の取得失敗:`, selErr.message);
      continue;
    }
    const overflow = (rows ?? []).slice(KEEP_PER_CATEGORY);
    if (overflow.length === 0) {
      console.log(`・${cat}: アクティブ ${rows?.length ?? 0} 件（上限内、アーカイブ不要）`);
      continue;
    }
    const ids = overflow.map((r) => r.id);
    const { error: updErr } = await supabase
      .from("news")
      .update({ archived: true })
      .in("id", ids);
    if (updErr) {
      console.error(`❌ ${cat} のアーカイブ更新失敗:`, updErr.message);
      continue;
    }
    console.log(`・${cat}: ${overflow.length} 件を archived=true にしました。`);
  }

  console.log("完了。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
