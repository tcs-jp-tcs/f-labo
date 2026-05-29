-- ============================================================
-- Fラボ ニュースシード SQL
-- src/lib/data.ts の news 配列（414-762行）から生成
--   - アクティブ記事: archived = false（20件）
--   - /* ARCHIVED */ ブロックの退避記事: archived = true（8件）
-- 日本語日付はJST（+09:00）で published_at に変換。
-- source_url に UNIQUE 制約が無いため通常の INSERT（ON CONFLICT なし）。
-- ※ 実行はしないこと。SQL生成のみ。
-- ============================================================

-- ----------------------------------------------------------
-- アクティブ記事（archived = false）
-- ----------------------------------------------------------

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ウォルフ「アントネッリvsラッセルのバトルをトーンダウンさせる可能性」2016年ロズベルグ再来を警戒', 'カナダGPでチーム内バトルが激化したメルセデス。スプリントでの接触、決勝24周目のシケインでの接触を経て、トト・ウォルフ代表は「ペースアドバンテージがない場面では戦いをトーンダウンさせる必要があるかもしれない」と発言。2016年ハミルトンvsロズベルグの再来は避けたい意向で、ラッセルとアントネッリの“自由な戦い”に一定の線引きを示唆。「2人とも素晴らしいレースを見せたが、チームに損失を生むような戦いを続けるわけにはいかない」と説明した。', 'motorsport.com', 'https://www.motorsport.com/f1/news/mercedes-knows-it-may-have-to-turn-russell-antonelli-fight-down-a-notch/10824231/', 'https://cdn-5.motorsport.com/images/amp/2GdwQvVY/s6/andrea-kimi-antonelli-mercedes-2.jpg', '2026-05-26T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ロス・ブラウン、MotoGPプラマック・レーシング取締役に就任。Liberty Media傘下で“横展開”', 'F1で22のワールドタイトル獲得に貢献した名将ロス・ブラウンが、MotoGPのプラマック・レーシング（ヤマハサテライト）の取締役に就任することが発表された。チーム代表ゲンマ・カンピノーティの戦略アドバイザーとして活動する。MotoGPもLiberty Mediaの傘下に入ったことが背景にあり、F1での経験を二輪世界選手権に持ち込む形となる。ブラウンはベネトン、フェラーリ、ホンダ、ブラウンGP、メルセデスでチーム代表や技術ディレクターを歴任した伝説的人物。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/f1-legend-brawn-makes-motorsport-return-with-motogp-team-role.67HZiRZRy1m5sNZxfYq1Fh', 'https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Miscellaneous/Ross-Brawn.webp', '2026-05-26T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ルクレール「フェラーリPUは馬力で劣る」カナダGPは「F1キャリアで最悪の週末」', 'カナダGPで4位ながら週末を通して苦戦したルクレールが、レース後に「最後の15周はトップから1〜1.5秒落ちのペースで走るしかなかった」「予選は壁に当たるかP8かというギリギリだった。F1キャリアで最悪の週末」と告白。フェラーリのパワーユニットについて「メルセデス、レッドブルに対して馬力で明確に劣っている」と認めた。同じマシンでハミルトンが2位を獲得した中、自身の不調と車両特性のミスマッチに苦悩する内容となった。', 'The Race', 'https://www.the-race.com/formula-1/f1-2026-canadian-grand-prix-everything-we-learned/', 'https://cdn-3.motorsport.com/images/amp/0ZqA4546/s1000/charles-leclerc-ferrari.webp', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'カナダGP決勝：アントネッリがF1史上初のキャリア初4連勝、ラッセルはリードからリタイア', 'ポールスタートのラッセルが序盤に首位を奪い返したが、31周目にパワーロスでリタイア。代わって首位に立ったアントネッリが残りラップを支配し、中国・日本・マイアミに続く4連勝を達成。デビューシーズン4連勝はF1史上初の偉業となった。2位は今季ベストのハミルトン(+10.768)、3位フェルスタッペン(+11.276)、4位ルクレール(+44.151)、5位ハジャー、6位コラピント。ノリスはギアボックストラブルでDNF、ピアストリはアルボン接触のペナルティで11位に沈んだ。アントネッリは選手権リードを43ポイントに拡大。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/live-coverage-formula-1-lenovo-grand-prix-du-canada-2026.7m4KTueNNOQnM0HuMqI1RW', 'https://media.formula1.com/image/upload/t_16by9Centre/c_fill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278029679.webp', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'アントネッリ「勝ち方は望んでいたものじゃない」ラッセルとのバトル、リタイアを語る', 'カナダGPでキャリア初の4連勝を達成し選手権リードを43点に広げたアントネッリは「正直、こんな勝ち方は望んでいなかった。ジョージとのバトルはタフで本当に激しかった。最後までやり合いたかった」とコメント。「お互いミスをしていたし、二人ともギリギリで攻めていた。彼が止まってしまったのは本当に残念」とチームメイトのリタイアに同情。一方で「フェラーリ・レッドブル・マクラーレンが詰めてきているので、自分のやることを続けて、もう一段バーを上げていく」と引き締めも忘れなかった。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/not-really-the-way-i-wanted-to-win-antonelli-gives-verdict-on-tough-russell-battle-after-canada-victory.6DGPBEHsKnyvjHW82nVoNq', 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278032049.webp', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ラッセル「信じられない。誰かが俺にタイトル争いをさせたくないみたいだ」リードからのリタイアに茫然', '30周目にパワーユニットの不調でリードから消えたラッセルは「信じられない。直近5戦のうち3戦で何かが俺に逆らっている。言葉が出ない」と落胆。一方でアントネッリとのバトルは「カートの頃を思い出した。接触なしでハードに、近くで戦えた。あと30周続けたかった」と最大級の賛辞。直後にヘッドレストを車外に投げ捨てた行為はFIAから「危険行為」と判断され、停止処分付きの罰金5,000ユーロを科された。本人は「お恥ずかしい行為だった」と公の謝罪を申し出ている。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/it-feels-like-somebody-doesnt-want-me-to-fight-for-this-championship-russell-in-disbelief-over-canada-retirement.4Hnn3vh7vAhSqt7F1RpL4P', 'https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Canada/16x9%20single%20image%20-%202026-05-24T230727.335.webp', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('INDY', 'インディ500：ローゼンクヴィストが史上最少差0.0233秒で初優勝、佐藤琢磨はトップ10フィニッシュ', '110回目の伝統のインディ500決勝は、Meyer Shank Racing #60のフェリックス・ローゼンクヴィストが最終ラップでデビッド・マルカスをパスし、わずか0.0233秒差というインディ500史上最少差で初優勝。3度ウィナーの佐藤琢磨（RLL #75ホンダ・スポット参戦）は終盤の競り合いを粘り強くまとめて10位フィニッシュ、レース後「2027年の再挑戦を検討する」と語った。3位パト・オワード、4位マーカス・アームストロング、5位リヌス・ヴィーケイ、6位パロウ。', 'Motorsport.com', 'https://www.motorsport.com/indycar/news/felix-rosenqvist-wins-2026-indy-500-in-closest-ever-finish/10823901/', 'https://cdn-7.motorsport.com/images/amp/YE9w3dGY/s6/alex-palou-chip-ganassi-racing.jpg', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('INDY', 'ローゼンクヴィスト「最後の1周は夢で何度も走ってきた」史上最少差でつかんだインディ500初制覇', 'インディ500初制覇を遂げたフェリックス・ローゼンクヴィスト（Meyer Shank Racing #60）は「あの最後の1周はずっと頭の中で思い描いていた。実際に起きたときは筋肉が覚えていた感じだった」と感慨。「ハイラインを丸々1周フラットで行ったのは初めて、本当にクールな勝ち方だった」とアウト側からのオーバーテイクを振り返り、「マシンはロケットだった。Meyer Shank、ホンダ、パートナー全員に感謝。優勝可能な車を2台揃えてくれたチームに最大限の敬意を」と再生中のMSRを称えた。', 'Motorsport.com', 'https://www.motorsport.com/indycar/news/felix-rosenqvist-dreamed-of-this-indy-500-finish-then-made-it-real/10824056/', 'https://cdn-6.motorsport.com/images/amp/0qgPjlyY/s1000/felix-rosenqvist-meyer-shank-r.webp', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', 'SF鈴鹿Rd.5：野中誠太がRd.4の130Rクラッシュから即日復帰で完走。「突然リヤが抜けて恐ろしかった」精密検査経て翌日Rd.5へ', '5月23日の鈴鹿Rd.4で130R進入直前にリヤウイングが脱落しスピン→バリアに激突した野中誠太（KCMG）。左足を痛めて精密検査を受けたが、翌24日のRd.5にレース復帰し完走を果たした。本人はレース後「身体は大丈夫。突然リヤが抜けて本当に恐ろしかった。それでも翌日に戻ってこられて良かった」とコメント。KCMGはRd.4/Rd.5でも野中の継続起用を発表しており、第6戦以降のシート確保に向けて存在感を残す週末となった。Rd.5の優勝は福住仁嶺（NTT docomo Business ROOKIE）、2位岩佐歩夢、3位太田格之進。', 'as-web.jp', 'https://www.as-web.jp/super-formula/1318823', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-24T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', 'SF鈴鹿Rd.5：福住仁嶺がポール・トゥ・ウインで今季初優勝、ROOKIE Racing初勝利', 'ポールから発進した福住仁嶺（NTT docomo Business ROOKIE）がOTSの応酬を制し、2位岩佐歩夢（TEAM MUGEN）、3位太田格之進（DOCOMO TEAM DANDELION）を抑えてポール・トゥ・ウイン。福住自身の今季初優勝でROOKIE Racingに参戦初勝利をもたらした。岩佐は前日Rd.4のポール獲得→決勝13位ノーポイントの雪辱、太田はランキングリーダーを死守。', 'motorsport.com', 'https://jp.motorsport.com/super-formula/news/2026-sf-r5-race-result/10823691/', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-24T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', '福住仁嶺「モリゾウオーナーからどんなご褒美が待ってるかな」鈴鹿Rd.5優勝コメント', '5年ぶりの優勝でROOKIE Racingに参戦初勝利をもたらした福住仁嶺は「自分自身にとって久しぶりの優勝、チームにとっては今日が初ポール初優勝。チームの皆さんにとって素敵な日になったと思うので、おめでとうという気持ちでいっぱい」と決勝後会見でコメント。「みんなの気持ちが一丸となれたからこそ、この1勝がある。本当にチームのおかげ」と感謝を述べ、オーナーの豊田章男氏（モリゾウ）に触れて「まだ話していないけど、どんなご褒美が待ってるかな。後で連絡します(笑)」とユーモアを交えた。', 'fmotor.jp', 'https://www.fmotor.jp/2026-sf-rd5-winners', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-24T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', 'SF鈴鹿Rd.4：復帰の松下信治が2位表彰台、DELiGHTWORKSにデビューイヤー初表彰台「ロジックなし、勘です」', '5月23日の鈴鹿Rd.4は途中で小雨が舞う大波乱の展開。13番手スタートの松下信治（DELiGHTWORKS RACING）が、ドライ継続のステイアウト戦略でじわじわとポジションを上げ、2セーフティカー絡みの混乱を切り抜けて2位フィニッシュ。今季SFに復帰した松下にとっては、新生DELiGHTWORKSに参戦初年度初表彰台をもたらす象徴的な結果となった。決勝後の会見では「明確なロジックはなくて……勘です」とユーモアたっぷりにタイヤ戦略を振り返り、エンジニアとの土壇場のやりとりが勝負を分けたと明かした。優勝は14番手から逆転したS.フェネストラズ（TOM''S）、3位は坪井翔。', 'as-web.jp', 'https://www.as-web.jp/super-formula/1318820', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-23T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', 'SF鈴鹿Rd.4：フェネストラズが14番手から大逆転優勝、岩佐は13位ノーポイント', '予選で岩佐歩夢（TEAM MUGEN）が今季3度目のポールを獲得していたが、決勝は雨絡みの大荒れの展開に。14番手スタートのフェネストラズが小雨タイミングでステイアウトする戦略で一気にトップへ。タイムは1h05''12.423、2位は松下信治（DELiGHTWORKS）+0.760、3位は坪井翔（TOM''S）+1.159。岩佐はSC明けのリスタートとウェット交換が裏目に出て13位ノーポイント。', 'motorsport.com', 'https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-23T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('SF', 'フェネストラズ「TOM''Sが俺と坪井をステイアウトさせると主張してくれた」鈴鹿Rd.4逆転V', '14番手スタートから雨絡みの混乱を制したサッシャ・フェネストラズ（TOM''S）は「この結果にとても幸せ。チームが俺と坪井をステイアウトさせると強く主張してくれた」とチームの戦略決断を称賛。「鈴鹿の新しい路面は乾くのがすごく早い。前日のSFLightsセッションでも乾きの速さを確認できていた。TOM''SはSFLightsにもチームを持っているから、その情報を活かしたのが今回のギャンブルにつながったのだと思う」と勝利の鍵を明かした。', 'Motorsport.com', 'https://www.motorsport.com/super-formula/news/super-formula-suzuka-sacha-fenestraz-wins-hectic-opening-race/10823278/', 'https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg', '2026-05-23T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F2', 'F2カナダ・フィーチャー：M.ステンスホルネがRodinで初優勝、宮田 莉朋はリタイア', '波乱続きのモントリオールF2フィーチャーレースで、Rodin Motorsportのマルティニウス・ステンスホルネがキャリア初勝利。チームメイトのアレックス・ダンを抑えてRodinに1-2をもたらし、3位は選手権首位のG.ミニ。宮田 莉朋（Hitech TGR）は26周目にデュルクセンの追突でスピンして16番手まで後退、34周目のSC明けにオリバー・ゲーテと接触してリタイアと、悔しいモントリオールデビュー戦になった。', 'FIA Formula 2', 'https://www.fiaformula2.com/Latest/5S86JJoiKIQWhV19XBbLIJ/feature-race-stenshorne-leads-home-rodin-1-2-in-montreal', 'https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_563,w_1000/v1/f2/global/articles/2026/05_May/GettyImages-2277994353', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F2', 'ステンスホルネ「予選から良いペースを持っていた。両日表彰台は格別」F2カナダ初優勝コメント', 'モントリオールでF2キャリア初勝利を挙げたマルティニウス・ステンスホルネ（Rodin Motorsport）は「週末はとても良かった。予選から良いペースを持っていた。最初のセッションは思うようにいかなかったけど、それ以外は終始好調」と振り返り、「2日間ともポディウムに上がれたのは格別な気分」と前日のスプリント3位を含めた週末の安定感を強調。Rodinはダンの2位フィニッシュと合わせてチーム今季最高の1-2を達成した。', 'FIA Formula 2', 'https://www.fiaformula2.com/Latest/5S86JJoiKIQWhV19XBbLIJ/feature-race-stenshorne-leads-home-rodin-1-2-in-montreal', 'https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_563,w_1000/v1/f2/global/articles/2026/05_May/GettyImages-2277994353', '2026-05-25T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F2', 'F2モントリオールRd.3スプリント：ノエル・レオンが2026シーズン初勝利', 'モントリオールでのF2スプリントレースで、メキシコ人ドライバーのノエル・レオンがキャリア初のF2勝利を獲得。2位は選手権首位のG.ミニ、3位はM.ステンスホルネ。宮田 莉朋（Hitech TGR）は2026シーズンここまで4戦中3戦で入賞しており、今回のマイアミ以降のチームの好調を継続中。', 'RacingNews365', 'https://racingnews365.com/2026-canadian-grand-prix---f2-sprint-race-results', 'https://cdn.racingnews365.com/2026/Formula-2/Tsolov.jpg?v=1777733213&width=1800&height=945&quality=75&crop=3780%2C1985%2C0%2C267', '2026-05-24T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F3', 'F3：加藤大翔、メルボルン表彰台＆シュピールベルクテスト総合トップでモナコ初参戦へ', 'ART Grand Prixのホンダ育成・加藤大翔（HFDP）が、開幕戦メルボルンでフィーチャー3位を獲得後、シュピールベルクのインシーズンテストで総合トップタイム(1:20.297)を記録。マカオ経験を武器にモナコへ初参戦。中村仁（Hitech TGR）はメルボルンFeature 9位、りー海夏澄（ART）と山越陽悠（VAR）も合わせて日本人勢4名がF1直下カテゴリーに揃った歴史的シーズン。', 'Pit Debrief', 'https://www.pitdebrief.com/post/kato-confident-ahead-of-monaco-after-encouraging-performance-in-2026-f3-melbourne-opener-with-art/', 'https://i0.wp.com/topnews.jp/wp-content/uploads/2026/05/taitokato_F3test_austria.jpg', '2026-05-22T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F2', 'F2マイアミ：宮田莉朋がフィーチャー6位入賞、Hitech TGRで日曜の強さ示す', 'Hitech TGRに移籍3年目シーズンを送る宮田莉朋が、マイアミGPでスプリント12位／フィーチャー6位とF1初参戦並みの追い上げを披露。2レース合計で16ポジションをゲインし、今季初の入賞ポイントを獲得。チームメイトはコルトン・ハータで、Hitech勢は日曜のレースペースで存在感を見せた。', 'FIA Formula 2', 'https://www.fiaformula2.com/Latest/17eXLgMCjY2QaIt65Ds1QA/what-we-learned-some-of-the-key-storylines-from-round-2-in-miami', 'https://res.cloudinary.com/prod-f2f3/image/upload/ar_16:9,dpr_1.0,c_fill,f_auto,g_auto,q_auto,w_980/v1777980338/f2/global/articles/2026/05_May/GettyImages-2274301399', '2026-05-03T00:00:00+09:00', false);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('INDY', 'インディGP：ルンガードが2勝目、パロウは5位でランキング独走', 'ロードコースの「ソンシオGP」でArrow McLarenのクリスチャン・ルンガードがキャリア2勝目を獲得。パロウは5位フィニッシュながら首位を堅持し、2位カークウッドとの差は27ポイントに拡大。マルカスが3位、ニューガーデンは6位、ディクソンとオワードは148pt同点で6-7位。', 'Motorsport.com', 'https://www.motorsport.com/indycar/news/complete-indycar-championship-standings-after-2026-indy-gp/10819574/', 'https://cdn-7.motorsport.com/images/amp/YE9w3dGY/s6/alex-palou-chip-ganassi-racing.jpg', '2026-05-10T00:00:00+09:00', false);

-- ----------------------------------------------------------
-- ARCHIVED 退避記事（archived = true）
-- ----------------------------------------------------------

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ラルフ・シューマッハ「アントネッリはフェルスタッペンの後継者になれる」', 'ラルフ・シューマッハがカナダGPでのアントネッリとラッセルのバトルを「エピックなデュエル」と評価。「19歳とは思えないほど落ち着いて成熟した対応を見せた」「若くしてこれだけ状況をコントロールし、ミスから学べるのは並大抵じゃない」と冷静さを称賛し、「これが続けば、本当にマックス・フェルスタッペンの後継者を手にすることになるかもしれない」と語った。チームメイトのラッセルに絶えず圧力をかけ続け4連勝を達成したアントネッリへの賛辞となった。', 'motorsport.com', 'https://www.motorsport.com/f1/news/ralf-schumacher-claims-kimi-antonelli-could-become-f1s-next-max-verstappen/10823998/', 'https://cdn-1.motorsport.com/images/amp/0ZqA4yN6/s1000/andrea-kimi-antonelli-mercedes.webp', '2026-05-25T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ラッセル、ヘッドレスト投げ捨てでFIAから罰金＋公の謝罪', 'カナダGPでパワーユニット故障によりリードからリタイアしたラッセルが、感情のままヘッドレストをコース上へ投げ捨てた行為について、FIAから5,000ユーロの罰金（12ヶ月の執行猶予付き）を科された。本人はSNSで「マーシャルとFIAの仕事を、必要以上に大変にしてしまった。あの瞬間は感情が抑えきれなかった。本当に申し訳ない」と公に謝罪。FIAステュワードに対しても「お恥ずかしい行為だった」と認め、自ら公開謝罪を申し出たという。', 'motorsport.com', 'https://www.motorsport.com/f1/news/george-russell-issues-fia-apology-after-canadian-gp-fine/10824143/', 'https://cdn-6.motorsport.com/images/amp/YpbP5kX0/s2/george-russell-mercedes.jpg', '2026-05-25T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ラッセル「2026年レギュレーションは変えるべきじゃない」アントネッリとの名バトルを称賛', 'リードからのリタイアという悔しい結果に終わったラッセルだが、アントネッリとのバトルは「ここ数年で味わったことがないような最高の戦いだった。本当に大好きだった」と絶賛。批判の多い2026年の新エンジン規則についても「この新しいパワーユニットがあるからこそ、こんなバトルが可能になる」と擁護し、ルール変更には明確に反対する姿勢を示した。メルセデスが新規則への批判を抑えるよう他チームを説得した数少ない陣営の一つであることも報じられている。', 'autosport.com', 'https://www.autosport.com/f1/news/why-george-russell-doesnt-want-to-see-the-2026-f1-rules-changed/10824151/', 'https://cdn-3.motorsport.com/images/amp/0ZqA4546/s1000/george-russell-mercedes.webp', '2026-05-25T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'ハミルトン「フェラーリでの最高の一日」モントリオールでフェラーリ加入後ベストの2位', 'P5スタートから終盤フェルスタッペンをパスして2位を奪取したハミルトンは「フェラーリ加入後で一番幸せな日だ。表彰台に乗れて、メインレースで初めての2位を獲れた」と感無量。「身も心もとても軽くて、フィジカルもメンタルも絶好調」「望んでいたエンジニアリングチームをついに手にした。マシンも素晴らしいし、自分自身もマシンを深く理解できるようになった」とフェラーリへの感謝を強調。フェラーリ移籍後2度目の表彰台で、ルクレールの4位と合わせてコンストラクターズ2番手を固めた。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/i-feel-very-light-right-now-hamilton-hails-canada-p2-as-happiest-day-at-ferrari-so-far.3RYdn6nDmrEqc84TWA4DB2', 'https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278036032.webp', '2026-05-25T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'カナダGP予選：ラッセルが1:12.578でポール、4戦連続ポール狙うアントネッリを0.068秒差で阻止', 'Q3最終アタックでラッセルが1:12.578をマーク、4戦連続ポールを狙ったアントネッリを0.068秒差で阻みポールポジション。3番手ノリス(+0.151)、4番手ピアストリ(+0.203)、5番手ハミルトン(+0.290)、6番手フェルスタッペン(+0.329)、7番手ハジャー、8番手ルクレール。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/russell-denies-mercedes-rival-antonelli-pole-position-for-canadian-grand-prix-with-last-gasp-effort.5b91PZNqJKlwMzExUu9twT', 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277884971.webp', '2026-05-24T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'カナダGPスプリント：ラッセル、メルセデス同士の波乱を制して勝利', 'ポールから発進したラッセルが、1コーナーでチームメイト・アントネッリと接触しながらも首位を死守。28:50.951でゴール、ノリスを1.272秒差、アントネッリを1.843秒差で抑え今季2勝目のスプリント勝利。4位ピアストリ、5位ルクレール、6位ハミルトン、7位フェルスタッペンと続いた。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb', 'https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277841936.webp', '2026-05-23T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'フェルスタッペン、現行レギュレーションに苦言「メンタル的に持たない」', 'カナダGPの会場で記者会見に応じたフェルスタッペンは、現行マシンに改めて不満を吐露。「ドライバーがマシンに合わせ続けなければならない状況はメンタル的にもたない」と語った。マイアミ以降は車両アップグレードで進展を見せているが、選手権ではアントネッリから74ポイントビハインドの7位に沈む。', 'Sky Sports', 'https://www.skysports.com/f1/news/12433/13547301/max-verstappen-red-bull-driver-renews-f1-quit-threat-as-he-says-current-regulations-are-not-mentally-doable-at-canadian-gp', 'https://e0.365dm.com/26/05/1600x900/skysports-f1-max-verstappen_7256904.jpg?20260524020107', '2026-05-22T00:00:00+09:00', true);

INSERT INTO news (category, title, summary, source_name, source_url, thumbnail_url, published_at, archived)
VALUES ('F1', 'マイアミGP決勝：アントネッリが今季3連勝、史上初の偉業で選手権独走', 'ポールスタートから一時3位まで落ちたアントネッリが、ピットでのアンダーカットでノリスを抜き返し、3.0秒差で勝利。3位は最終ラップにルクレールを抜いたピアストリ。デビューシーズン「マイデン3ポールを全て勝ちに変えた」史上初の偉業を達成し、選手権リードを20ポイントに拡大した。', 'Formula1.com', 'https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc', 'https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Miami/16x9%20single%20image%20-%202026-05-03T195302.163.webp', '2026-05-04T00:00:00+09:00', true);
