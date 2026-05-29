-- ============================================================
-- ニュース更新 SQL（2026-05-29 / F1オフウィーク）
-- news テーブルは RLS が SELECT(public read) のみ許可で、INSERT/UPDATE
-- ポリシーが無いため anon キーでは書き込めない。
-- 管理権限（Supabase SQL Editor / service_role）で実行すること。
--
-- 1) 新着F1ニュース3本を INSERT（archived=false）
-- 2) 保持ルール（カテゴリ毎 最新9件）を適用し超過分を archived=true に
-- ============================================================

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', '「カナダGPが盛り上がっても2026年規則が正しいわけじゃない」ドライバーたちが新パワーユニットに苦言', '接戦に沸いたカナダGPだったが、上位陣は2026年の新パワーユニット規則への懸念を改めて口にした。ハミルトンは「ストレートの半ばでパワーが消える」とエネルギーマネジメントの不自然さを指摘。アントネッリも改善は認めつつ「燃焼エンジンのパワー面はまだ煮詰める必要がある」と語り、フェルスタッペンは「面白いレースになったからといって今のルールが正しいとはならない。F1はもっとピュアであるべき」と訴えた。レースの面白さと規則の是非は別問題だという論調が広がっている。', 'motorsport.com', 'https://www.motorsport.com/f1/news/entertaining-canadian-gp-doesnt-mean-rules-are-fine-f1-drivers-say/10824763/', 'https://cdn-9.motorsport.com/images/amp/YvKQOrL6/s2/lewis-hamilton-ferrari-max-ver.jpg', '2026-05-28T20:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ルクレールのリアクションがバズる：ハミルトンが駆るフェラーリ新型EV「Luce」の助手席で大慌て', 'フェラーリが正式発表前の新型電気自動車「Luce」をサーキットで2人のF1ドライバーにテストさせた。ハミルトンがステアリングを握ると、助手席のルクレールが限界まで攻める走りに大げさなほど何度も警告を叫び、その慌てっぷりがSNSで拡散。ファンからは2人の仲の良さや、ドライバーごとに助手席での反応がまるで違う点に注目が集まった。オフウィークの和やかな話題となった。', 'motorsport.com', 'https://www.motorsport.com/f1/news/charles-leclercs-hilarious-reaction-to-lewis-hamilton-driving-ferraris-new-ev-goes-viral/10824846/', 'https://cdn-1.motorsport.com/images/amp/0rGXNR72/s1000/charles-leclerc-ferrari-lewis-.webp', '2026-05-28T19:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'メキース「まだ始まりに過ぎない」レッドブル、カナダ表彰台でさらなるリスクを取る姿勢', 'フェルスタッペンのカナダGP3位について、レッドブルのメキース代表は「マイアミ以降の進歩を裏付ける結果であり、我々がリスクを取る戦略も辞さないことを示せた」と前向きに評価。信頼性やバウンシングの課題は残るものの、トップとの差は確実に縮まったと強調した。さらに「ドライバーがマシンをより信頼できるよう、新しいアプローチを試し続ける」と語り、フェルスタッペンとハジャーがそろって今季ベストの結果を残したことに手応えを示した。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/its-only-the-beginning-mekies-insists-red-bull-will-take-more-risks-after-their-return-to-the-podium-in-canada.19EUr2gQA8uScvk3Ee6DbV', 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277876604.webp', '2026-05-26T12:00:00+09:00', false);

-- 保持ルール: カテゴリ毎に published_at 降順で最新9件を残し、超過分を archived=true に
WITH ranked AS (
  SELECT id,
         row_number() OVER (PARTITION BY category ORDER BY published_at DESC, id DESC) AS rn
  FROM news
  WHERE archived = false
)
UPDATE news SET archived = true
WHERE id IN (SELECT id FROM ranked WHERE rn > 9);
