export type Series = "F1" | "F2" | "F3" | "SF" | "INDY";

export type ScheduleSession = {
  name: string;
  localDate: string;
  localTime: string;
  jpDate: string;
  jpTime: string;
  type?: "race" | "sprint" | "quali" | "practice";
  /** 放送局名 → 番組開始時刻（公式番組表で確認できた分のみ） */
  broadcasts?: Record<string, string>;
};

export type ScheduleResultPodium = {
  pos: number;
  driver: string;
  team: string;
};

export type ScheduleResult = {
  pole?: { driver: string; team: string; time?: string };
  fastestLap?: { driver: string; team: string; time?: string };
  podium?: ScheduleResultPodium[];
  sprint?: {
    pole?: { driver: string; team: string; time?: string };
    podium?: ScheduleResultPodium[];
  };
  sourceUrl?: string;
};

export type ScheduleItem = {
  series: Series;
  round: number;
  /** Round表示の上書き（例: "Rd.1 & Rd.2 (2レース制)"）。指定があれば優先表示 */
  roundLabel?: string;
  country: string;
  flag: string;
  name: string;
  date: string;
  weekendType: "通常週末" | "スプリント週末";
  status?: "next" | "past" | "upcoming" | "live";
  broadcast: string;
  /** カード展開時の統合テーブルで列ヘッダとして使う放送局名（最大2局推奨） */
  networks?: string[];
  sessions?: ScheduleSession[];
  result?: ScheduleResult;
};

export type BroadcastSession = {
  session: string;
  date: string;
  localTime?: string;
  jst: string;
  channels: Record<string, boolean>;
};

export type WeekendBroadcast = {
  series: Series;
  round: number;
  flag: string;
  gpName: string;
  weekendType: "通常週末" | "スプリント週末";
  channels: string[];
  sessions: BroadcastSession[];
  note?: string;
};

export type NewsContentType = "translation" | "commentary";

export type NewsItem = {
  /** Supabase の行ID（DB取得時のみ存在）。/news/[id] 導線に使用 */
  id?: number;
  category: Series | "F2/F3";
  source: string;
  title: string;
  summary: string;
  date: string;
  url: string;
  imageUrl?: string;
  /** 翻訳/解説の全文（Markdown）。入っている記事だけ「翻訳を読む」導線を出す */
  translationBody?: string;
  /** 'translation'=公式PRの全文翻訳 / 'commentary'=商業メディアをもとにした独自解説 */
  contentType?: NewsContentType;
};

export type ReviewCategory = "F1" | "SF";

export type ReviewSummary = {
  slug: string;
  category: ReviewCategory;
  round: number;
  flag: string;
  gpName: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
};

/** 個別レビューページ用（一覧サマリー + Markdown 本文） */
export type Review = ReviewSummary & {
  /** 本文（Markdown）。Supabase reviews テーブルから取得 */
  body: string;
};

export type StandingRow = {
  pos: number;
  name: string;
  team?: string;
  points: number;
};

export type PodiumRow = {
  pos: number;
  driver: string;
  team: string;
  time: string;
};

export type RaceResult = {
  series: Series;
  round: number;
  flag: string;
  gpName: string;
  date: string;
  raceType?: "決勝" | "スプリント" | "フィーチャー" | "予選";
  status?: "confirmed" | "live" | "scheduled";
  podium: PodiumRow[];
  note?: string;
  sourceUrl?: string;
};

/* ============================
   NEWS（出典URL + 公式 OG画像）
   ============================ */
export const news: NewsItem[] = [
  {
    category: "F1",
    source: "motorsport.com",
    title:
      "ウォルフ「アントネッリvsラッセルのバトルをトーンダウンさせる可能性」2016年ロズベルグ再来を警戒",
    summary:
      "カナダGPでチーム内バトルが激化したメルセデス。スプリントでの接触、決勝24周目のシケインでの接触を経て、トト・ウォルフ代表は「ペースアドバンテージがない場面では戦いをトーンダウンさせる必要があるかもしれない」と発言。2016年ハミルトンvsロズベルグの再来は避けたい意向で、ラッセルとアントネッリの“自由な戦い”に一定の線引きを示唆。「2人とも素晴らしいレースを見せたが、チームに損失を生むような戦いを続けるわけにはいかない」と説明した。",
    date: "2026年5月26日",
    url: "https://www.motorsport.com/f1/news/mercedes-knows-it-may-have-to-turn-russell-antonelli-fight-down-a-notch/10824231/",
    imageUrl:
      "https://cdn-5.motorsport.com/images/amp/2GdwQvVY/s6/andrea-kimi-antonelli-mercedes-2.jpg",
  },
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "ロス・ブラウン、MotoGPプラマック・レーシング取締役に就任。Liberty Media傘下で“横展開”",
    summary:
      "F1で22のワールドタイトル獲得に貢献した名将ロス・ブラウンが、MotoGPのプラマック・レーシング（ヤマハサテライト）の取締役に就任することが発表された。チーム代表ゲンマ・カンピノーティの戦略アドバイザーとして活動する。MotoGPもLiberty Mediaの傘下に入ったことが背景にあり、F1での経験を二輪世界選手権に持ち込む形となる。ブラウンはベネトン、フェラーリ、ホンダ、ブラウンGP、メルセデスでチーム代表や技術ディレクターを歴任した伝説的人物。",
    date: "2026年5月26日",
    url: "https://www.formula1.com/en/latest/article/f1-legend-brawn-makes-motorsport-return-with-motogp-team-role.67HZiRZRy1m5sNZxfYq1Fh",
    imageUrl:
      "https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Miscellaneous/Ross-Brawn.webp",
  },
  {
    category: "F1",
    source: "The Race",
    title:
      "ルクレール「フェラーリPUは馬力で劣る」カナダGPは「F1キャリアで最悪の週末」",
    summary:
      "カナダGPで4位ながら週末を通して苦戦したルクレールが、レース後に「最後の15周はトップから1〜1.5秒落ちのペースで走るしかなかった」「予選は壁に当たるかP8かというギリギリだった。F1キャリアで最悪の週末」と告白。フェラーリのパワーユニットについて「メルセデス、レッドブルに対して馬力で明確に劣っている」と認めた。同じマシンでハミルトンが2位を獲得した中、自身の不調と車両特性のミスマッチに苦悩する内容となった。",
    date: "2026年5月25日",
    url: "https://www.the-race.com/formula-1/f1-2026-canadian-grand-prix-everything-we-learned/",
    imageUrl:
      "https://cdn-3.motorsport.com/images/amp/0ZqA4546/s1000/charles-leclerc-ferrari.webp",
  },
  /* ARCHIVED 2026-05-28: F1上限超過につき退避
  {
    category: "F1",
    source: "motorsport.com",
    title:
      "ラルフ・シューマッハ「アントネッリはフェルスタッペンの後継者になれる」",
    summary:
      "ラルフ・シューマッハがカナダGPでのアントネッリとラッセルのバトルを「エピックなデュエル」と評価。「19歳とは思えないほど落ち着いて成熟した対応を見せた」「若くしてこれだけ状況をコントロールし、ミスから学べるのは並大抵じゃない」と冷静さを称賛し、「これが続けば、本当にマックス・フェルスタッペンの後継者を手にすることになるかもしれない」と語った。チームメイトのラッセルに絶えず圧力をかけ続け4連勝を達成したアントネッリへの賛辞となった。",
    date: "2026年5月25日",
    url: "https://www.motorsport.com/f1/news/ralf-schumacher-claims-kimi-antonelli-could-become-f1s-next-max-verstappen/10823998/",
    imageUrl:
      "https://cdn-1.motorsport.com/images/amp/0ZqA4yN6/s1000/andrea-kimi-antonelli-mercedes.webp",
  },
  */
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "カナダGP決勝：アントネッリがF1史上初のキャリア初4連勝、ラッセルはリードからリタイア",
    summary:
      "ポールスタートのラッセルが序盤に首位を奪い返したが、31周目にパワーロスでリタイア。代わって首位に立ったアントネッリが残りラップを支配し、中国・日本・マイアミに続く4連勝を達成。デビューシーズン4連勝はF1史上初の偉業となった。2位は今季ベストのハミルトン(+10.768)、3位フェルスタッペン(+11.276)、4位ルクレール(+44.151)、5位ハジャー、6位コラピント。ノリスはギアボックストラブルでDNF、ピアストリはアルボン接触のペナルティで11位に沈んだ。アントネッリは選手権リードを43ポイントに拡大。",
    date: "2026年5月25日",
    url: "https://www.formula1.com/en/latest/article/live-coverage-formula-1-lenovo-grand-prix-du-canada-2026.7m4KTueNNOQnM0HuMqI1RW",
    imageUrl:
      "https://media.formula1.com/image/upload/t_16by9Centre/c_fill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278029679.webp",
  },
  /* ARCHIVED 2026-05-28: F1上限超過につき退避
  {
    category: "F1",
    source: "motorsport.com",
    title:
      "ラッセル、ヘッドレスト投げ捨てでFIAから罰金＋公の謝罪",
    summary:
      "カナダGPでパワーユニット故障によりリードからリタイアしたラッセルが、感情のままヘッドレストをコース上へ投げ捨てた行為について、FIAから5,000ユーロの罰金（12ヶ月の執行猶予付き）を科された。本人はSNSで「マーシャルとFIAの仕事を、必要以上に大変にしてしまった。あの瞬間は感情が抑えきれなかった。本当に申し訳ない」と公に謝罪。FIAステュワードに対しても「お恥ずかしい行為だった」と認め、自ら公開謝罪を申し出たという。",
    date: "2026年5月25日",
    url: "https://www.motorsport.com/f1/news/george-russell-issues-fia-apology-after-canadian-gp-fine/10824143/",
    imageUrl:
      "https://cdn-6.motorsport.com/images/amp/YpbP5kX0/s2/george-russell-mercedes.jpg",
  },
  {
    category: "F1",
    source: "autosport.com",
    title:
      "ラッセル「2026年レギュレーションは変えるべきじゃない」アントネッリとの名バトルを称賛",
    summary:
      "リードからのリタイアという悔しい結果に終わったラッセルだが、アントネッリとのバトルは「ここ数年で味わったことがないような最高の戦いだった。本当に大好きだった」と絶賛。批判の多い2026年の新エンジン規則についても「この新しいパワーユニットがあるからこそ、こんなバトルが可能になる」と擁護し、ルール変更には明確に反対する姿勢を示した。メルセデスが新規則への批判を抑えるよう他チームを説得した数少ない陣営の一つであることも報じられている。",
    date: "2026年5月25日",
    url: "https://www.autosport.com/f1/news/why-george-russell-doesnt-want-to-see-the-2026-f1-rules-changed/10824151/",
    imageUrl:
      "https://cdn-3.motorsport.com/images/amp/0ZqA4546/s1000/george-russell-mercedes.webp",
  },
  */
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "アントネッリ「勝ち方は望んでいたものじゃない」ラッセルとのバトル、リタイアを語る",
    summary:
      "カナダGPでキャリア初の4連勝を達成し選手権リードを43点に広げたアントネッリは「正直、こんな勝ち方は望んでいなかった。ジョージとのバトルはタフで本当に激しかった。最後までやり合いたかった」とコメント。「お互いミスをしていたし、二人ともギリギリで攻めていた。彼が止まってしまったのは本当に残念」とチームメイトのリタイアに同情。一方で「フェラーリ・レッドブル・マクラーレンが詰めてきているので、自分のやることを続けて、もう一段バーを上げていく」と引き締めも忘れなかった。",
    date: "2026年5月25日",
    url: "https://www.formula1.com/en/latest/article/not-really-the-way-i-wanted-to-win-antonelli-gives-verdict-on-tough-russell-battle-after-canada-victory.6DGPBEHsKnyvjHW82nVoNq",
    imageUrl:
      "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278032049.webp",
  },
  /* ARCHIVED 2026-05-28: F1上限超過につき退避
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "ハミルトン「フェラーリでの最高の一日」モントリオールでフェラーリ加入後ベストの2位",
    summary:
      "P5スタートから終盤フェルスタッペンをパスして2位を奪取したハミルトンは「フェラーリ加入後で一番幸せな日だ。表彰台に乗れて、メインレースで初めての2位を獲れた」と感無量。「身も心もとても軽くて、フィジカルもメンタルも絶好調」「望んでいたエンジニアリングチームをついに手にした。マシンも素晴らしいし、自分自身もマシンを深く理解できるようになった」とフェラーリへの感謝を強調。フェラーリ移籍後2度目の表彰台で、ルクレールの4位と合わせてコンストラクターズ2番手を固めた。",
    date: "2026年5月25日",
    url: "https://www.formula1.com/en/latest/article/i-feel-very-light-right-now-hamilton-hails-canada-p2-as-happiest-day-at-ferrari-so-far.3RYdn6nDmrEqc84TWA4DB2",
    imageUrl:
      "https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada/2278036032.webp",
  },
  */
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "ラッセル「信じられない。誰かが俺にタイトル争いをさせたくないみたいだ」リードからのリタイアに茫然",
    summary:
      "30周目にパワーユニットの不調でリードから消えたラッセルは「信じられない。直近5戦のうち3戦で何かが俺に逆らっている。言葉が出ない」と落胆。一方でアントネッリとのバトルは「カートの頃を思い出した。接触なしでハードに、近くで戦えた。あと30周続けたかった」と最大級の賛辞。直後にヘッドレストを車外に投げ捨てた行為はFIAから「危険行為」と判断され、停止処分付きの罰金5,000ユーロを科された。本人は「お恥ずかしい行為だった」と公の謝罪を申し出ている。",
    date: "2026年5月25日",
    url: "https://www.formula1.com/en/latest/article/it-feels-like-somebody-doesnt-want-me-to-fight-for-this-championship-russell-in-disbelief-over-canada-retirement.4Hnn3vh7vAhSqt7F1RpL4P",
    imageUrl:
      "https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Canada/16x9%20single%20image%20-%202026-05-24T230727.335.webp",
  },
  {
    category: "INDY",
    source: "Motorsport.com",
    title:
      "インディ500：ローゼンクヴィストが史上最少差0.0233秒で初優勝、佐藤琢磨はトップ10フィニッシュ",
    summary:
      "110回目の伝統のインディ500決勝は、Meyer Shank Racing #60のフェリックス・ローゼンクヴィストが最終ラップでデビッド・マルカスをパスし、わずか0.0233秒差というインディ500史上最少差で初優勝。3度ウィナーの佐藤琢磨（RLL #75ホンダ・スポット参戦）は終盤の競り合いを粘り強くまとめて10位フィニッシュ、レース後「2027年の再挑戦を検討する」と語った。3位パト・オワード、4位マーカス・アームストロング、5位リヌス・ヴィーケイ、6位パロウ。",
    date: "2026年5月25日",
    url: "https://www.motorsport.com/indycar/news/felix-rosenqvist-wins-2026-indy-500-in-closest-ever-finish/10823901/",
    imageUrl:
      "https://cdn-7.motorsport.com/images/amp/YE9w3dGY/s6/alex-palou-chip-ganassi-racing.jpg",
  },
  {
    category: "INDY",
    source: "Motorsport.com",
    title:
      "ローゼンクヴィスト「最後の1周は夢で何度も走ってきた」史上最少差でつかんだインディ500初制覇",
    summary:
      "インディ500初制覇を遂げたフェリックス・ローゼンクヴィスト（Meyer Shank Racing #60）は「あの最後の1周はずっと頭の中で思い描いていた。実際に起きたときは筋肉が覚えていた感じだった」と感慨。「ハイラインを丸々1周フラットで行ったのは初めて、本当にクールな勝ち方だった」とアウト側からのオーバーテイクを振り返り、「マシンはロケットだった。Meyer Shank、ホンダ、パートナー全員に感謝。優勝可能な車を2台揃えてくれたチームに最大限の敬意を」と再生中のMSRを称えた。",
    date: "2026年5月25日",
    url: "https://www.motorsport.com/indycar/news/felix-rosenqvist-dreamed-of-this-indy-500-finish-then-made-it-real/10824056/",
    imageUrl:
      "https://cdn-6.motorsport.com/images/amp/0qgPjlyY/s1000/felix-rosenqvist-meyer-shank-r.webp",
  },
  {
    category: "SF",
    source: "as-web.jp",
    title:
      "SF鈴鹿Rd.5：野中誠太がRd.4の130Rクラッシュから即日復帰で完走。「突然リヤが抜けて恐ろしかった」精密検査経て翌日Rd.5へ",
    summary:
      "5月23日の鈴鹿Rd.4で130R進入直前にリヤウイングが脱落しスピン→バリアに激突した野中誠太（KCMG）。左足を痛めて精密検査を受けたが、翌24日のRd.5にレース復帰し完走を果たした。本人はレース後「身体は大丈夫。突然リヤが抜けて本当に恐ろしかった。それでも翌日に戻ってこられて良かった」とコメント。KCMGはRd.4/Rd.5でも野中の継続起用を発表しており、第6戦以降のシート確保に向けて存在感を残す週末となった。Rd.5の優勝は福住仁嶺（NTT docomo Business ROOKIE）、2位岩佐歩夢、3位太田格之進。",
    date: "2026年5月24日",
    url: "https://www.as-web.jp/super-formula/1318823",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "SF",
    source: "motorsport.com",
    title:
      "SF鈴鹿Rd.5：福住仁嶺がポール・トゥ・ウインで今季初優勝、ROOKIE Racing初勝利",
    summary:
      "ポールから発進した福住仁嶺（NTT docomo Business ROOKIE）がOTSの応酬を制し、2位岩佐歩夢（TEAM MUGEN）、3位太田格之進（DOCOMO TEAM DANDELION）を抑えてポール・トゥ・ウイン。福住自身の今季初優勝でROOKIE Racingに参戦初勝利をもたらした。岩佐は前日Rd.4のポール獲得→決勝13位ノーポイントの雪辱、太田はランキングリーダーを死守。",
    date: "2026年5月24日",
    url: "https://jp.motorsport.com/super-formula/news/2026-sf-r5-race-result/10823691/",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "SF",
    source: "fmotor.jp",
    title:
      "福住仁嶺「モリゾウオーナーからどんなご褒美が待ってるかな」鈴鹿Rd.5優勝コメント",
    summary:
      "5年ぶりの優勝でROOKIE Racingに参戦初勝利をもたらした福住仁嶺は「自分自身にとって久しぶりの優勝、チームにとっては今日が初ポール初優勝。チームの皆さんにとって素敵な日になったと思うので、おめでとうという気持ちでいっぱい」と決勝後会見でコメント。「みんなの気持ちが一丸となれたからこそ、この1勝がある。本当にチームのおかげ」と感謝を述べ、オーナーの豊田章男氏（モリゾウ）に触れて「まだ話していないけど、どんなご褒美が待ってるかな。後で連絡します(笑)」とユーモアを交えた。",
    date: "2026年5月24日",
    url: "https://www.fmotor.jp/2026-sf-rd5-winners",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "SF",
    source: "as-web.jp",
    title:
      "SF鈴鹿Rd.4：復帰の松下信治が2位表彰台、DELiGHTWORKSにデビューイヤー初表彰台「ロジックなし、勘です」",
    summary:
      "5月23日の鈴鹿Rd.4は途中で小雨が舞う大波乱の展開。13番手スタートの松下信治（DELiGHTWORKS RACING）が、ドライ継続のステイアウト戦略でじわじわとポジションを上げ、2セーフティカー絡みの混乱を切り抜けて2位フィニッシュ。今季SFに復帰した松下にとっては、新生DELiGHTWORKSに参戦初年度初表彰台をもたらす象徴的な結果となった。決勝後の会見では「明確なロジックはなくて……勘です」とユーモアたっぷりにタイヤ戦略を振り返り、エンジニアとの土壇場のやりとりが勝負を分けたと明かした。優勝は14番手から逆転したS.フェネストラズ（TOM'S）、3位は坪井翔。",
    date: "2026年5月23日",
    url: "https://www.as-web.jp/super-formula/1318820",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "SF",
    source: "motorsport.com",
    title:
      "SF鈴鹿Rd.4：フェネストラズが14番手から大逆転優勝、岩佐は13位ノーポイント",
    summary:
      "予選で岩佐歩夢（TEAM MUGEN）が今季3度目のポールを獲得していたが、決勝は雨絡みの大荒れの展開に。14番手スタートのフェネストラズが小雨タイミングでステイアウトする戦略で一気にトップへ。タイムは1h05'12.423、2位は松下信治（DELiGHTWORKS）+0.760、3位は坪井翔（TOM'S）+1.159。岩佐はSC明けのリスタートとウェット交換が裏目に出て13位ノーポイント。",
    date: "2026年5月23日",
    url: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "SF",
    source: "Motorsport.com",
    title:
      "フェネストラズ「TOM'Sが俺と坪井をステイアウトさせると主張してくれた」鈴鹿Rd.4逆転V",
    summary:
      "14番手スタートから雨絡みの混乱を制したサッシャ・フェネストラズ（TOM'S）は「この結果にとても幸せ。チームが俺と坪井をステイアウトさせると強く主張してくれた」とチームの戦略決断を称賛。「鈴鹿の新しい路面は乾くのがすごく早い。前日のSFLightsセッションでも乾きの速さを確認できていた。TOM'SはSFLightsにもチームを持っているから、その情報を活かしたのが今回のギャンブルにつながったのだと思う」と勝利の鍵を明かした。",
    date: "2026年5月23日",
    url: "https://www.motorsport.com/super-formula/news/super-formula-suzuka-sacha-fenestraz-wins-hectic-opening-race/10823278/",
    imageUrl:
      "https://cdn-2.motorsport.com/images/amp/0qgP47wY/s6/sacha-fenestraz-vantelin-team-.jpg",
  },
  {
    category: "F2",
    source: "FIA Formula 2",
    title:
      "F2カナダ・フィーチャー：M.ステンスホルネがRodinで初優勝、宮田 莉朋はリタイア",
    summary:
      "波乱続きのモントリオールF2フィーチャーレースで、Rodin Motorsportのマルティニウス・ステンスホルネがキャリア初勝利。チームメイトのアレックス・ダンを抑えてRodinに1-2をもたらし、3位は選手権首位のG.ミニ。宮田 莉朋（Hitech TGR）は26周目にデュルクセンの追突でスピンして16番手まで後退、34周目のSC明けにオリバー・ゲーテと接触してリタイアと、悔しいモントリオールデビュー戦になった。",
    date: "2026年5月25日",
    url: "https://www.fiaformula2.com/Latest/5S86JJoiKIQWhV19XBbLIJ/feature-race-stenshorne-leads-home-rodin-1-2-in-montreal",
    imageUrl:
      "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_563,w_1000/v1/f2/global/articles/2026/05_May/GettyImages-2277994353",
  },
  {
    category: "F2",
    source: "FIA Formula 2",
    title:
      "ステンスホルネ「予選から良いペースを持っていた。両日表彰台は格別」F2カナダ初優勝コメント",
    summary:
      "モントリオールでF2キャリア初勝利を挙げたマルティニウス・ステンスホルネ（Rodin Motorsport）は「週末はとても良かった。予選から良いペースを持っていた。最初のセッションは思うようにいかなかったけど、それ以外は終始好調」と振り返り、「2日間ともポディウムに上がれたのは格別な気分」と前日のスプリント3位を含めた週末の安定感を強調。Rodinはダンの2位フィニッシュと合わせてチーム今季最高の1-2を達成した。",
    date: "2026年5月25日",
    url: "https://www.fiaformula2.com/Latest/5S86JJoiKIQWhV19XBbLIJ/feature-race-stenshorne-leads-home-rodin-1-2-in-montreal",
    imageUrl:
      "https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_563,w_1000/v1/f2/global/articles/2026/05_May/GettyImages-2277994353",
  },
  /* ARCHIVED 2026-05-28: F1上限超過につき退避
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "カナダGP予選：ラッセルが1:12.578でポール、4戦連続ポール狙うアントネッリを0.068秒差で阻止",
    summary:
      "Q3最終アタックでラッセルが1:12.578をマーク、4戦連続ポールを狙ったアントネッリを0.068秒差で阻みポールポジション。3番手ノリス(+0.151)、4番手ピアストリ(+0.203)、5番手ハミルトン(+0.290)、6番手フェルスタッペン(+0.329)、7番手ハジャー、8番手ルクレール。",
    date: "2026年5月24日",
    url: "https://www.formula1.com/en/latest/article/russell-denies-mercedes-rival-antonelli-pole-position-for-canadian-grand-prix-with-last-gasp-effort.5b91PZNqJKlwMzExUu9twT",
    imageUrl:
      "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277884971.webp",
  },
  */
  {
    category: "F2",
    source: "RacingNews365",
    title: "F2モントリオールRd.3スプリント：ノエル・レオンが2026シーズン初勝利",
    summary:
      "モントリオールでのF2スプリントレースで、メキシコ人ドライバーのノエル・レオンがキャリア初のF2勝利を獲得。2位は選手権首位のG.ミニ、3位はM.ステンスホルネ。宮田 莉朋（Hitech TGR）は2026シーズンここまで4戦中3戦で入賞しており、今回のマイアミ以降のチームの好調を継続中。",
    date: "2026年5月24日",
    url: "https://racingnews365.com/2026-canadian-grand-prix---f2-sprint-race-results",
    imageUrl:
      "https://cdn.racingnews365.com/2026/Formula-2/Tsolov.jpg?v=1777733213&width=1800&height=945&quality=75&crop=3780%2C1985%2C0%2C267",
  },
  /* ARCHIVED 2026-05-27: F1上限9件超過のため最古を退避
  {
    category: "F1",
    source: "Formula1.com",
    title: "カナダGPスプリント：ラッセル、メルセデス同士の波乱を制して勝利",
    summary:
      "ポールから発進したラッセルが、1コーナーでチームメイト・アントネッリと接触しながらも首位を死守。28:50.951でゴール、ノリスを1.272秒差、アントネッリを1.843秒差で抑え今季2勝目のスプリント勝利。4位ピアストリ、5位ルクレール、6位ハミルトン、7位フェルスタッペンと続いた。",
    date: "2026年5月23日",
    url: "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
    imageUrl:
      "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_2048/q_auto/v1740000001/trackside-images/2026/F1_Grand_Prix_of_Canada___Sprint__Qualifying/2277841936.webp",
  },
  */
  {
    category: "F3",
    source: "Pit Debrief",
    title:
      "F3：加藤大翔、メルボルン表彰台＆シュピールベルクテスト総合トップでモナコ初参戦へ",
    summary:
      "ART Grand Prixのホンダ育成・加藤大翔（HFDP）が、開幕戦メルボルンでフィーチャー3位を獲得後、シュピールベルクのインシーズンテストで総合トップタイム(1:20.297)を記録。マカオ経験を武器にモナコへ初参戦。中村仁（Hitech TGR）はメルボルンFeature 9位、りー海夏澄（ART）と山越陽悠（VAR）も合わせて日本人勢4名がF1直下カテゴリーに揃った歴史的シーズン。",
    date: "2026年5月22日",
    url: "https://www.pitdebrief.com/post/kato-confident-ahead-of-monaco-after-encouraging-performance-in-2026-f3-melbourne-opener-with-art/",
    imageUrl:
      "https://i0.wp.com/topnews.jp/wp-content/uploads/2026/05/taitokato_F3test_austria.jpg",
  },
  /* ARCHIVED 2026-05-27: F1上限9件超過のため最古を退避
  {
    category: "F1",
    source: "Sky Sports",
    title:
      "フェルスタッペン、現行レギュレーションに苦言「メンタル的に持たない」",
    summary:
      "カナダGPの会場で記者会見に応じたフェルスタッペンは、現行マシンに改めて不満を吐露。「ドライバーがマシンに合わせ続けなければならない状況はメンタル的にもたない」と語った。マイアミ以降は車両アップグレードで進展を見せているが、選手権ではアントネッリから74ポイントビハインドの7位に沈む。",
    date: "2026年5月22日",
    url: "https://www.skysports.com/f1/news/12433/13547301/max-verstappen-red-bull-driver-renews-f1-quit-threat-as-he-says-current-regulations-are-not-mentally-doable-at-canadian-gp",
    imageUrl:
      "https://e0.365dm.com/26/05/1600x900/skysports-f1-max-verstappen_7256904.jpg?20260524020107",
  },
  */
  {
    category: "F2",
    source: "FIA Formula 2",
    title:
      "F2マイアミ：宮田莉朋がフィーチャー6位入賞、Hitech TGRで日曜の強さ示す",
    summary:
      "Hitech TGRに移籍3年目シーズンを送る宮田莉朋が、マイアミGPでスプリント12位／フィーチャー6位とF1初参戦並みの追い上げを披露。2レース合計で16ポジションをゲインし、今季初の入賞ポイントを獲得。チームメイトはコルトン・ハータで、Hitech勢は日曜のレースペースで存在感を見せた。",
    date: "2026年5月3日",
    url: "https://www.fiaformula2.com/Latest/17eXLgMCjY2QaIt65Ds1QA/what-we-learned-some-of-the-key-storylines-from-round-2-in-miami",
    imageUrl:
      "https://res.cloudinary.com/prod-f2f3/image/upload/ar_16:9,dpr_1.0,c_fill,f_auto,g_auto,q_auto,w_980/v1777980338/f2/global/articles/2026/05_May/GettyImages-2274301399",
  },
  /* ARCHIVED 2026-05-27: F1上限9件超過のため最古を退避
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "マイアミGP決勝：アントネッリが今季3連勝、史上初の偉業で選手権独走",
    summary:
      "ポールスタートから一時3位まで落ちたアントネッリが、ピットでのアンダーカットでノリスを抜き返し、3.0秒差で勝利。3位は最終ラップにルクレールを抜いたピアストリ。デビューシーズン「マイデン3ポールを全て勝ちに変えた」史上初の偉業を達成し、選手権リードを20ポイントに拡大した。",
    date: "2026年5月4日",
    url: "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
    imageUrl:
      "https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000001/fom-website/2026/Miami/16x9%20single%20image%20-%202026-05-03T195302.163.webp",
  },
  */
  {
    category: "INDY",
    source: "Motorsport.com",
    title: "インディGP：ルンガードが2勝目、パロウは5位でランキング独走",
    summary:
      "ロードコースの「ソンシオGP」でArrow McLarenのクリスチャン・ルンガードがキャリア2勝目を獲得。パロウは5位フィニッシュながら首位を堅持し、2位カークウッドとの差は27ポイントに拡大。マルカスが3位、ニューガーデンは6位、ディクソンとオワードは148pt同点で6-7位。",
    date: "2026年5月10日",
    url: "https://www.motorsport.com/indycar/news/complete-indycar-championship-standings-after-2026-indy-gp/10819574/",
    imageUrl:
      "https://cdn-7.motorsport.com/images/amp/YE9w3dGY/s6/alex-palou-chip-ganassi-racing.jpg",
  },
];

/* SNS */
export const sns = {
  x: { handle: "@flabo_jp", url: "https://x.com/flabo_jp" },
  instagram: { handle: "@flabo.jp", url: "https://instagram.com/flabo.jp" },
  youtube: { handle: "@flabo_jp", url: "https://www.youtube.com/@flabo_jp" },
};

export const seriesLabel: Record<Series, string> = {
  F1: "F1",
  F2: "F2",
  F3: "F3",
  SF: "SUPER FORMULA",
  INDY: "INDYCAR",
};

/** カード展開時の統合テーブル上で表示する代表的な放送局（最大2局） */
export const seriesNetworks: Record<Series, string[]> = {
  F1: ["フジTV NEXT", "FOD"],
  F2: ["FOD"],
  F3: ["FOD"],
  SF: ["ABEMA", "J SPORTS"],
  INDY: ["GAORA", "オンデマンド"],
};

/* ============================
   REVIEWS （独自レビュー記事）
   ============================ */
export const reviews: ReviewSummary[] = [
  {
    slug: "canada-gp-2026",
    category: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    title: "2026 F1 第5戦 カナダGP レビュー",
    subtitle: "史上初の4連勝、そして雨と波乱のモントリオール",
    excerpt:
      "アントネッリがキャリア初勝利からの4連勝という、F1史上誰も成し遂げたことのない偉業を達成。チームメイト・ラッセルのリード中のリタイア、マクラーレンの戦略大失敗、そして2人のワールドチャンピオンによる終盤の名バトル——68周に詰め込まれたドラマを総括する。",
    date: "2026年5月25日",
  },
  {
    slug: "miami-gp-2026",
    category: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    title: "2026 F1 第4戦 マイアミGP レビュー",
    subtitle: "アントネッリ3連勝、ノリスがスプリントで一矢報いる",
    excerpt:
      "アントネッリが3戦連続のポール・トゥ・ウィンで3連勝、選手権リードをほぼ1レース分に拡大。土曜のスプリントではノリスがメルセデス以外で今季初勝利を挙げ、マクラーレン復調の兆しを見せた。MAXのスピン＆ペナルティ全部入りの走り、表彰台目前でスピンしたルクレールの悲劇——雷雨予報で繰り上げ開催となったマイアミを振り返る。",
    date: "2026年5月3日",
  },
  {
    slug: "japan-gp-2026",
    category: "F1",
    round: 3,
    flag: "🇯🇵",
    gpName: "日本GP",
    title: "2026 F1 第3戦 日本GP レビュー",
    subtitle: "桜咲く鈴鹿、アントネッリが史上最年少ポイントリーダーに",
    excerpt:
      "スタートで6位に落ちたアントネッリがセーフティカーを味方につけて逆転し、開幕3連勝で19歳216日の史上最年少ポイントリーダーに。4年連続ポールの鈴鹿でフェルスタッペンがまさかのQ2敗退、デプロイ切れが招いたベアマンの50Gクラッシュ——31万5000人が見守った桜の鈴鹿を振り返る。",
    date: "2026年3月29日",
  },
  {
    slug: "china-gp-2026",
    category: "F1",
    round: 2,
    flag: "🇨🇳",
    gpName: "中国GP",
    title: "2026 F1 第2戦 中国GP レビュー",
    subtitle: "アントネッリ初優勝、イタリアに20年ぶりの歓喜",
    excerpt:
      "19歳202日のアントネッリがキャリア初優勝。イタリア人としては2006年フィジケラ以来20年ぶりのF1勝利に、表彰台で父と抱き合った。フェラーリの異次元のロケットスタート、マクラーレン2台がそろってDNSとなった新PU信頼性の不安——スプリント週末の上海を振り返る。",
    date: "2026年3月15日",
  },
  {
    slug: "australia-gp-2026",
    category: "F1",
    round: 1,
    flag: "🇦🇺",
    gpName: "オーストラリアGP",
    title: "2026 F1 第1戦 オーストラリアGP レビュー",
    subtitle: "新時代の幕開け、メルセデスが1-2で制す",
    excerpt:
      "シャシーとPUの大幅レギュレーション変更で迎えた2026年F1開幕戦。ラッセルがポール・トゥ・ウィン、アントネッリが2位でメルセデスが1-2フィニッシュを飾った。フェラーリのスタートの速さ、VSCでの戦略自滅、そして新PUの洗礼でサバイバルとなった一戦——アルバート・パークを振り返る。",
    date: "2026年3月8日",
  },
];
