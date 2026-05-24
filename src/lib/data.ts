export type Series = "F1" | "F2" | "F3" | "SF" | "INDY";

export type ScheduleSession = {
  name: string;
  localDate: string;
  localTime: string;
  jpDate: string;
  jpTime: string;
  type?: "race" | "sprint" | "quali" | "practice";
};

export type ScheduleItem = {
  series: Series;
  round: number;
  country: string;
  flag: string;
  name: string;
  date: string;
  weekendType: "通常週末" | "スプリント週末";
  status?: "next" | "past" | "upcoming" | "live";
  broadcast: string;
  sessions?: ScheduleSession[];
};

export type BroadcastSession = {
  session: string;
  date: string;
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
};

export type NewsItem = {
  category: Series | "F2/F3";
  source: string;
  title: string;
  summary: string;
  date: string;
  url: string;
  imageUrl?: string;
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

export type Review = {
  series: Series;
  round: number;
  flag: string;
  gpName: string;
  date: string;
  title: string;
  excerpt: string;
  sourceUrl?: string;
  raceType?: "決勝" | "スプリント" | "フィーチャー" | "予選";
  imageUrl?: string;
};

/* ============================
   2026 SCHEDULES（公式カレンダー）
   ============================ */
export const schedules: Record<Series, ScheduleItem[]> = {
  F1: [
    {
      series: "F1",
      round: 1,
      country: "Australia",
      flag: "🇦🇺",
      name: "オーストラリアGP",
      date: "3月6日〜8日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 2,
      country: "China",
      flag: "🇨🇳",
      name: "中国GP",
      date: "3月20日〜22日",
      weekendType: "スプリント週末",
      status: "past",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 3,
      country: "Japan",
      flag: "🇯🇵",
      name: "日本GP",
      date: "4月10日〜12日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 4,
      country: "USA",
      flag: "🇺🇸",
      name: "マイアミGP",
      date: "5月1日〜3日",
      weekendType: "スプリント週末",
      status: "past",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 5,
      country: "Canada",
      flag: "🇨🇦",
      name: "カナダGP",
      date: "5月22日〜24日",
      weekendType: "スプリント週末",
      status: "live",
      broadcast: "FOD / フジテレビNEXT",
      sessions: [
        {
          name: "FP1",
          localDate: "5/22 (金)",
          localTime: "12:30 - 13:30",
          jpDate: "5/23 (土)",
          jpTime: "深夜1:30 - 2:30",
          type: "practice",
        },
        {
          name: "スプリント予選",
          localDate: "5/22 (金)",
          localTime: "16:30 - 17:14",
          jpDate: "5/23 (土)",
          jpTime: "早朝5:30 - 6:14",
          type: "quali",
        },
        {
          name: "スプリント",
          localDate: "5/23 (土)",
          localTime: "12:00 - 12:30",
          jpDate: "5/24 (日)",
          jpTime: "深夜1:00 - 1:30",
          type: "sprint",
        },
        {
          name: "予選",
          localDate: "5/23 (土)",
          localTime: "16:00 - 17:00",
          jpDate: "5/24 (日)",
          jpTime: "早朝5:00 - 6:00",
          type: "quali",
        },
        {
          name: "決勝（70 LAP）",
          localDate: "5/24 (日)",
          localTime: "16:00 - 18:00",
          jpDate: "5/25 (月)",
          jpTime: "早朝5:00 - 7:00",
          type: "race",
        },
      ],
    },
    {
      series: "F1",
      round: 6,
      country: "Spain",
      flag: "🇪🇸",
      name: "スペインGP",
      date: "6月12日〜14日",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 7,
      country: "Austria",
      flag: "🇦🇹",
      name: "オーストリアGP",
      date: "6月26日〜28日",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FOD / フジテレビNEXT",
    },
    {
      series: "F1",
      round: 8,
      country: "Great Britain",
      flag: "🇬🇧",
      name: "イギリスGP",
      date: "7月3日〜5日",
      weekendType: "スプリント週末",
      status: "upcoming",
      broadcast: "FOD / フジテレビNEXT",
    },
  ],
  F2: [
    {
      series: "F2",
      round: 1,
      country: "Australia",
      flag: "🇦🇺",
      name: "メルボルン",
      date: "3月6日〜8日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 2,
      country: "USA",
      flag: "🇺🇸",
      name: "マイアミ",
      date: "5月1日〜3日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 3,
      country: "Canada",
      flag: "🇨🇦",
      name: "モントリオール",
      date: "5月22日〜24日",
      weekendType: "通常週末",
      status: "live",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 4,
      country: "Monaco",
      flag: "🇲🇨",
      name: "モナコ",
      date: "6月4日〜7日",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 5,
      country: "Spain",
      flag: "🇪🇸",
      name: "バルセロナ",
      date: "6月12日〜14日",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
  ],
  F3: [
    {
      series: "F3",
      round: 1,
      country: "Australia",
      flag: "🇦🇺",
      name: "メルボルン",
      date: "3月6日〜8日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FODプロコース",
    },
    {
      series: "F3",
      round: 2,
      country: "Monaco",
      flag: "🇲🇨",
      name: "モナコ",
      date: "6月4日〜7日",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FODプロコース",
    },
    {
      series: "F3",
      round: 3,
      country: "Spain",
      flag: "🇪🇸",
      name: "バルセロナ",
      date: "6月12日〜14日",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
  ],
  SF: [
    {
      series: "SF",
      round: 1,
      country: "Japan",
      flag: "🇯🇵",
      name: "鈴鹿 Rd.1",
      date: "3月7日〜8日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "ABEMA / J SPORTS / SFgo",
    },
    {
      series: "SF",
      round: 2,
      country: "Japan",
      flag: "🇯🇵",
      name: "もてぎ Rd.2",
      date: "4月18日〜19日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "ABEMA / J SPORTS / SFgo",
    },
    {
      series: "SF",
      round: 3,
      country: "Japan",
      flag: "🇯🇵",
      name: "オートポリス Rd.3",
      date: "5月9日〜10日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "ABEMA / J SPORTS / SFgo",
    },
    {
      series: "SF",
      round: 4,
      country: "Japan",
      flag: "🇯🇵",
      name: "鈴鹿 Rd.4",
      date: "5月22日〜24日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "ABEMA / J SPORTS / SFgo",
    },
    {
      series: "SF",
      round: 5,
      country: "Japan",
      flag: "🇯🇵",
      name: "富士 Rd.5",
      date: "7月11日〜12日",
      weekendType: "通常週末",
      status: "next",
      broadcast: "ABEMA / J SPORTS / SFgo",
    },
  ],
  INDY: [
    {
      series: "INDY",
      round: 5,
      country: "USA",
      flag: "🇺🇸",
      name: "インディGP",
      date: "5月10日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
    {
      series: "INDY",
      round: 6,
      country: "USA",
      flag: "🇺🇸",
      name: "インディ500 予選",
      date: "5月17日〜18日",
      weekendType: "通常週末",
      status: "past",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
    {
      series: "INDY",
      round: 7,
      country: "USA",
      flag: "🇺🇸",
      name: "インディ500 決勝",
      date: "5月24日（日）",
      weekendType: "通常週末",
      status: "live",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
      sessions: [
        {
          name: "決勝（200 LAP）",
          localDate: "5/24 (日)",
          localTime: "12:45 ET",
          jpDate: "5/25 (月)",
          jpTime: "深夜1:45 〜",
          type: "race",
        },
      ],
    },
    {
      series: "INDY",
      round: 8,
      country: "USA",
      flag: "🇺🇸",
      name: "デトロイト",
      date: "5月31日〜6月1日",
      weekendType: "通常週末",
      status: "next",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
  ],
};

/* ============================
   今週末の放送予定
   ============================ */
export const thisWeekendBroadcasts: WeekendBroadcast[] = [
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    weekendType: "スプリント週末",
    channels: ["FOD", "フジNEXT"],
    sessions: [
      {
        session: "FP1",
        date: "5/23 (土)",
        jst: "深夜1:30",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "スプリント予選",
        date: "5/23 (土)",
        jst: "早朝5:30",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "🏁 スプリント",
        date: "5/24 (日)",
        jst: "深夜1:00",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "予選",
        date: "5/24 (日)",
        jst: "早朝5:00",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "🏁 決勝",
        date: "5/25 (月)",
        jst: "早朝5:00",
        channels: { FOD: true, "フジNEXT": true },
      },
    ],
  },
  {
    series: "INDY",
    round: 7,
    flag: "🇺🇸",
    gpName: "インディ500",
    weekendType: "通常週末",
    channels: ["GAORA", "GAORAオンデマンド"],
    sessions: [
      {
        session: "🏁 決勝（200 LAP）",
        date: "5/25 (月)",
        jst: "深夜1:45",
        channels: { GAORA: true, "GAORAオンデマンド": true },
      },
    ],
  },
];

/* ============================
   NEWS（要約3-4行・日本人言及・出典URL付き）
   ============================ */
export const news: NewsItem[] = [
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "カナダGPスプリント：ラッセル、メルセデス同士の波乱を制して勝利",
    summary:
      "ポールから発進したラッセルが、チームメイト・アントネッリと1コーナーで接触しながらも首位を死守。タイヤをいたわりノリスを1.2秒差で抑え今季2勝目のスプリント勝利。アントネッリは「あれは譲るべきだった」とチーム無線で激怒したが3位フィニッシュ、3-4位のピアストリ、5-6位のルクレール／ハミルトンも順位を変えていない。",
    date: "2026年5月24日",
    url: "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "カナダGP予選：ラッセルがアントネッリを最終アタックで阻止、ポールから決勝へ",
    summary:
      "Q3最後の周回でラッセルがコース上の限界ぎりぎりを攻めてアントネッリを0.1秒以内で逆転、ポールポジションを獲得。3番手にはノリス、4番手ピアストリ、5番手ルクレール。フェルスタッペンはQ3進出を果たすも7番手にとどまった。決勝は日本時間5/25（月）早朝5:00スタート。",
    date: "2026年5月24日",
    url: "https://www.formula1.com/en/latest/article/russell-denies-mercedes-rival-antonelli-pole-position-for-canadian-grand-prix-with-last-gasp-effort.5b91PZNqJKlwMzExUu9twT",
  },
  {
    category: "SF",
    source: "motorsport.com",
    title:
      "SF鈴鹿Rd.4：フェネストラズが14番手から大逆転優勝、岩佐は13位ノーポイント",
    summary:
      "予選で岩佐歩夢が今季3度目のポールを獲得していたが、決勝は雨が絡む大荒れの展開に。14番手スタートのフェネストラズが小雨タイミングでステイアウトする戦略で一気にトップへ。2位は松下信治（DELiGHTWORKS）、3位は同じTOM'Sの坪井翔。岩佐はSC明けのリスタートとウェット交換が裏目に出て13位ノーポイントに沈んだ。",
    date: "2026年5月23日",
    url: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
  },
  {
    category: "INDY",
    source: "RacingNews365",
    title:
      "インディ500予選：パロウが232.348mphで2度目のポール、佐藤琢磨は13番手",
    summary:
      "土曜が雨で延期となり日曜決行となったインディ500予選で、IndyCar4度の王者パロウが232.348mphの4周平均で堂々のポール獲得。2位ロッシ、3位マルカス。3度のIndy500ウィナー（'17・'20）の佐藤琢磨は今季スポット参戦としてRahal Letterman Lanigan Racing #75（ホンダ）から出走、予選13番手で決勝に挑む。",
    date: "2026年5月18日",
    url: "https://racingnews365.com/2026-indy-500---full-qualifying-results",
  },
  {
    category: "F2",
    source: "FIA Formula 2",
    title:
      "F2マイアミ：宮田莉朋がフィーチャー6位で初の入賞、フライアウェイ最終戦で前進",
    summary:
      "Hitech TGRに移籍3年目シーズンを送る宮田莉朋が、マイアミGPでスプリント12位／フィーチャー6位とF1初参戦並みの追い上げを披露。マイアミの2レース合計で16ポジションをゲインし、自身のキャリアハイとなる初の入賞ポイントを獲得。チームメイトはコルトン・ハータで、Hitech勢は日曜のレースペースで存在感を見せた。",
    date: "2026年5月3日",
    url: "https://www.fiaformula2.com/Latest/17eXLgMCjY2QaIt65Ds1QA/what-we-learned-some-of-the-key-storylines-from-round-2-in-miami",
  },
  {
    category: "F1",
    source: "Sky Sports",
    title:
      "マイアミGP：アントネッリが今季3連勝、史上初の偉業で選手権独走",
    summary:
      "ポールスタートから一時3位まで落ちたアントネッリが、ピットストップでのアンダーカットでノリスを抜き返し、終盤の僅差バトルを耐えて勝利。Norrisが2位、ピアストリが最終ラップでルクレールを抜き3位表彰台。アントネッリはルーキーで「マイデン3ポールをすべて勝ちに変えた史上初」のドライバーとなり、選手権リードを20ポイントに拡大した。",
    date: "2026年5月3日",
    url: "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
  },
  {
    category: "F3",
    source: "TopNews",
    title:
      "F3：ホンダ育成・加藤大翔が開幕戦表彰台、シュピールベルクテストで総合トップ",
    summary:
      "ART Grand Prixから2026 FIA F3にステップアップしたホンダ育成・加藤大翔（HFDP）が、開幕戦メルボルンでフィーチャーレース3位の表彰台を獲得。続くシュピールベルクのインシーズンテストでも2日間総合トップタイム（1分20秒297）を記録し好調をキープ。同じくF3に参戦するりー海夏澄（ART／4人目の日本人）、中村仁（Hitech TGR）、山越陽悠（VAR）と合わせて、日本人勢4人がF1直下カテゴリーに揃った歴史的シーズンとなっている。",
    date: "2026年5月22日",
    url: "https://topnews.jp/2026/05/22/news/f1/drivers/taito-kato/247527.html",
  },
  {
    category: "INDY",
    source: "Motorsport.com",
    title:
      "インディGP：ルンガードが2勝目、パロウは5位でランキング独走",
    summary:
      "ロードコースの「ソンシオGP」でArrow McLarenのクリスチャン・ルンガードがキャリア2勝目を獲得し、ランキング順位を5位→4位に上げた。パロウは5位フィニッシュながら首位を堅持し、2位カークウッドとの差は27ポイントに拡大。マルカスが3位、ニューガーデンは6位、ディクソンとオワードは148pt同点で6-7位に並んだ。",
    date: "2026年5月10日",
    url: "https://www.motorsport.com/indycar/news/complete-indycar-championship-standings-after-2026-indy-gp/10819574/",
  },
  {
    category: "F1",
    source: "Sky Sports",
    title:
      "フェルスタッペン、現行レギュレーションに苦言「メンタル的に持たない」",
    summary:
      "カナダGPの会場で記者会見に応じたフェルスタッペンは、グラウンドエフェクト第3世代となった現行マシンに改めて不満を吐露。「ドライバーがマシンに合わせ続けなければならない状況はメンタル的にもたない」と語り、FIAの今後の修正案に注目していると述べた。マイアミ以降は車両アップグレードで明らかな進展を見せているが、選手権ではアントネッリから74ポイントビハインド。",
    date: "2026年5月22日",
    url: "https://www.skysports.com/f1/news/12433/13547301/max-verstappen-red-bull-driver-renews-f1-quit-threat-as-he-says-current-regulations-are-not-mentally-doable-at-canadian-gp",
  },
];

/* ============================
   STANDINGS
   ============================ */
export const standings: Record<
  Series,
  { drivers: StandingRow[]; teams: StandingRow[]; note?: string }
> = {
  F1: {
    note: "2026年マイアミGP（Round 4）終了時点。カナダGP終了後に更新予定。",
    drivers: [
      { pos: 1, name: "K.アントネッリ", team: "Mercedes", points: 100 },
      { pos: 2, name: "G.ラッセル", team: "Mercedes", points: 80 },
      { pos: 3, name: "C.ルクレール", team: "Ferrari", points: 59 },
      { pos: 4, name: "L.ノリス", team: "McLaren", points: 51 },
      { pos: 5, name: "L.ハミルトン", team: "Ferrari", points: 51 },
      { pos: 6, name: "O.ピアストリ", team: "McLaren", points: 43 },
      { pos: 7, name: "M.フェルスタッペン", team: "Red Bull", points: 26 },
    ],
    teams: [
      { pos: 1, name: "Mercedes", points: 180 },
      { pos: 2, name: "Ferrari", points: 110 },
      { pos: 3, name: "McLaren", points: 94 },
      { pos: 4, name: "Red Bull", points: 30 },
      { pos: 5, name: "Alpine", points: 23 },
      { pos: 6, name: "Haas", points: 18 },
      { pos: 7, name: "RB", points: 14 },
      { pos: 8, name: "Williams", points: 10 },
      { pos: 9, name: "Audi", points: 2 },
      { pos: 10, name: "Aston Martin", points: 0 },
    ],
  },
  F2: {
    note: "2026年マイアミGP（Round 2）終了時点。カナダ戦終了後に更新。",
    drivers: [
      { pos: 1, name: "G.ミニ", points: 42 },
      { pos: 2, name: "R.カマラ", points: 36 },
      { pos: 3, name: "N.ツォロフ", points: 35 },
      { pos: 4, name: "N.レオン", points: 32 },
      { pos: 5, name: "L.ファンホペン", points: 31 },
      { pos: 6, name: "D.ベガノヴィッチ", points: 24 },
      { pos: 7, name: "宮田 莉朋", points: 22 },
      { pos: 8, name: "J.デュルクセン", points: 16 },
      { pos: 9, name: "T.インスラプワサクル", points: 13 },
      { pos: 10, name: "A.ダン", points: 12 },
    ],
    teams: [
      { pos: 1, name: "Campos Racing", points: 55 },
      { pos: 2, name: "Invicta Racing", points: 50 },
      { pos: 3, name: "MP Motorsport", points: 46 },
      { pos: 4, name: "Hitech TGR", points: 30 },
      { pos: 5, name: "TRIDENT", points: 26 },
    ],
  },
  F3: {
    note: "2026年メルボルン（Round 1）終了時点。日本人参戦4名のうち加藤大翔（ART）は開幕戦Feature 3位。",
    drivers: [
      { pos: 1, name: "U.ウゴチュク", points: 25 },
      { pos: 2, name: "B.デル・ピノ", points: 19 },
      { pos: 3, name: "E.デリニー", points: 15 },
      { pos: 4, name: "加藤 大翔", points: 15 },
      { pos: 5, name: "T.バーニコート", points: 10 },
    ],
    teams: [
      { pos: 1, name: "ART Grand Prix", points: 40 },
      { pos: 2, name: "Van Amersfoort Racing", points: 34 },
      { pos: 3, name: "Hitech TGR", points: 14 },
    ],
  },
  SF: {
    note: "2026年第4戦鈴鹿終了後（公式ポイントランキング）。",
    drivers: [
      { pos: 1, name: "太田 格之進", points: 41 },
      { pos: 2, name: "S.フェネストラズ", points: 22.5 },
      { pos: 3, name: "岩佐 歩夢", points: 20.5 },
      { pos: 4, name: "松下 信治", points: 16 },
      { pos: 5, name: "L.ブラウニング", points: 16 },
    ],
    teams: [
      { pos: 1, name: "VANTELIN TEAM TOM'S", points: 34.5 },
      { pos: 2, name: "DOCOMO TEAM DANDELION RACING", points: 34 },
      { pos: 3, name: "SANKI VERTEX PARTNERS CERUMO・INGING", points: 26 },
      { pos: 4, name: "DELiGHTWORKS RACING", points: 16 },
      { pos: 5, name: "REALIZE KONDO RACING", points: 16 },
    ],
  },
  INDY: {
    note: "2026年インディGP（5/10）終了時点。Indy500決勝（5/25未明 JST）後に更新予定。",
    drivers: [
      { pos: 1, name: "A.パロウ", points: 237 },
      { pos: 2, name: "K.カークウッド", points: 210 },
      { pos: 3, name: "D.マルカス", points: 185 },
      { pos: 4, name: "C.ルンガード", points: 182 },
      { pos: 5, name: "J.ニューガーデン", points: 162 },
      { pos: 6, name: "S.ディクソン", points: 148 },
      { pos: 7, name: "P.オワード", points: 148 },
    ],
    teams: [],
  },
};

/* ============================
   RESULTS
   ============================ */
export const recentResults: RaceResult[] = [
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月25日（日本時間 月曜 早朝5:00 START）",
    raceType: "決勝",
    status: "live",
    podium: [],
    note:
      "本日決勝開催中。日本時間 5/25（月）早朝5:00スタート、結果は公式発表後に反映します。",
    sourceUrl: "https://www.formula1.com/en/racing/2026/canada",
  },
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月24日（日本時間 日曜 深夜1:00）",
    raceType: "スプリント",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "30:21.xxx" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+1.2s" },
      { pos: 3, driver: "K.アントネッリ", team: "Mercedes", time: "+1.5s" },
    ],
    note:
      "1コーナーでラッセル／アントネッリが接触、ラッセルが死守して優勝。4位ピアストリ、5位ルクレール、6位ハミルトン、7位フェルスタッペン、8位リンドブラード。",
    sourceUrl:
      "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    series: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    date: "2026年5月4日（日本時間）",
    raceType: "決勝",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+3.264s" },
      { pos: 3, driver: "O.ピアストリ", team: "McLaren", time: "—" },
    ],
    sourceUrl:
      "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
  },
  {
    series: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    date: "2026年5月3日",
    raceType: "スプリント",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "L.ノリス", team: "McLaren", time: "—" },
      { pos: 2, driver: "O.ピアストリ", team: "McLaren", time: "—" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "—" },
    ],
    sourceUrl:
      "https://www.formula1.com/en/latest/article/norris-beats-piastri-and-leclerc-to-victory-in-miami-sprint.4H4WI3lnIs7jOZ8lSBIp6X",
  },
  {
    series: "SF",
    round: 4,
    flag: "🇯🇵",
    gpName: "鈴鹿 Rd.4",
    date: "2026年5月23日",
    raceType: "決勝",
    status: "confirmed",
    podium: [
      {
        pos: 1,
        driver: "S.フェネストラズ",
        team: "VANTELIN TEAM TOM'S",
        time: "1h05'12.423",
      },
      {
        pos: 2,
        driver: "松下 信治",
        team: "DELiGHTWORKS RACING",
        time: "+0.760",
      },
      {
        pos: 3,
        driver: "坪井 翔",
        team: "VANTELIN TEAM TOM'S",
        time: "+1.159",
      },
    ],
    note:
      "ポール獲得の岩佐歩夢は13位ノーポイント。4位ブラウニング、5位ブルツ、6位大湯都史樹。",
    sourceUrl: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
  },
  {
    series: "F2",
    round: 2,
    flag: "🇺🇸",
    gpName: "マイアミ",
    date: "2026年5月3日",
    raceType: "フィーチャー",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ミニ", team: "Prema Racing", time: "—" },
      { pos: 2, driver: "K.マイニ", team: "DAMS Lucas Oil", time: "—" },
      { pos: 3, driver: "R.カマラ", team: "Campos Racing", time: "—" },
    ],
    note: "宮田莉朋（Hitech TGR）は6位入賞、自己ベストの結果。",
    sourceUrl:
      "https://www.pitdebrief.com/post/2026-f2-miami-gp-feature-race-results/",
  },
  {
    series: "F2",
    round: 2,
    flag: "🇺🇸",
    gpName: "マイアミ",
    date: "2026年5月3日",
    raceType: "スプリント",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "N.ツォロフ", team: "Campos Racing", time: "—" },
      { pos: 2, driver: "L.ファンホペン", team: "TRIDENT", time: "+0.17s" },
      { pos: 3, driver: "A.ダン", team: "Rodin Motorsport", time: "—" },
    ],
    note: "宮田は12位。最終ラップでツォロフ／ファンホペン／ダンが激しいバトル。",
    sourceUrl:
      "https://racingnews365.com/2026-miami-grand-prix-f2-sprint-results",
  },
  {
    series: "F3",
    round: 1,
    flag: "🇦🇺",
    gpName: "メルボルン",
    date: "2026年3月8日",
    raceType: "フィーチャー",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "U.ウゴチュク", team: "ART Grand Prix", time: "—" },
      { pos: 2, driver: "E.デリニー", team: "Van Amersfoort Racing", time: "—" },
      { pos: 3, driver: "加藤 大翔", team: "ART Grand Prix", time: "—" },
    ],
    note: "加藤は5位フィニッシュ後、上位車のペナルティで3位へ繰り上がり、F3デビュー戦で表彰台獲得。",
    sourceUrl:
      "https://www.pitdebrief.com/post/f3-2026-australian-gp-feature-race-results/",
  },
  {
    series: "F3",
    round: 1,
    flag: "🇦🇺",
    gpName: "メルボルン",
    date: "2026年3月8日",
    raceType: "スプリント",
    status: "confirmed",
    podium: [
      { pos: 1, driver: "B.デル・ピノ", team: "Van Amersfoort Racing", time: "—" },
      { pos: 2, driver: "E.デリニー", team: "Van Amersfoort Racing", time: "—" },
      { pos: 3, driver: "T.バーニコート", team: "Hitech TGR", time: "—" },
    ],
    sourceUrl:
      "https://www.formula1.com/en/latest/article/f3-del-pino-wins-melbourne-sprint-race-ahead-of-deligny-for-var-1-2.2TKh8SK8TiLNxrvw3zmQio",
  },
  {
    series: "INDY",
    round: 7,
    flag: "🇺🇸",
    gpName: "インディ500 決勝",
    date: "2026年5月25日（日本時間 月曜 深夜1:45 START）",
    raceType: "決勝",
    status: "live",
    podium: [],
    note:
      "本日決勝開催中。日本時間 5/25（月）深夜1:45スタート、佐藤琢磨は13番手から出走予定。結果は公式発表後に反映します。",
    sourceUrl: "https://www.indycar.com/Results",
  },
  {
    series: "INDY",
    round: 6,
    flag: "🇺🇸",
    gpName: "インディ500 予選",
    date: "2026年5月18日",
    raceType: "予選",
    status: "confirmed",
    podium: [
      {
        pos: 1,
        driver: "A.パロウ",
        team: "Chip Ganassi Racing",
        time: "232.348 mph",
      },
      {
        pos: 2,
        driver: "A.ロッシ",
        team: "Ed Carpenter Racing",
        time: "231.990 mph",
      },
      {
        pos: 3,
        driver: "D.マルカス",
        team: "Team Penske",
        time: "231.877 mph",
      },
    ],
    note: "佐藤琢磨（RLL #75 / ホンダ）は13番手で決勝へ。",
    sourceUrl:
      "https://racingnews365.com/2026-indy-500---full-qualifying-results",
  },
  {
    series: "INDY",
    round: 5,
    flag: "🇺🇸",
    gpName: "インディGP（ソンシオGP）",
    date: "2026年5月10日",
    raceType: "決勝",
    status: "confirmed",
    podium: [
      {
        pos: 1,
        driver: "C.ルンガード",
        team: "Arrow McLaren",
        time: "—",
      },
      { pos: 2, driver: "D.マルカス", team: "Team Penske", time: "—" },
      { pos: 3, driver: "K.カークウッド", team: "Andretti Global", time: "—" },
    ],
    sourceUrl:
      "https://www.motorsport.com/indycar/news/official-race-results-indycar-2026-indy-gp/10819572/",
  },
];

/* ============================
   REVIEWS（F1 + SF のみ）
   ============================ */
export const reviews: Review[] = [
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月23日",
    raceType: "スプリント",
    title: "ラッセル、メルセデス同士の波乱の中でスプリント勝利",
    excerpt:
      "ポールスタートのラッセルが、1コーナーでチームメイト・アントネッリと接触しながらも首位を堅持。タイヤをいたわるドライビングでノリスを1.2秒差で抑えて今季2勝目のスプリント勝利を飾った。アントネッリは無線で激怒したが3位フィニッシュ。決勝は日本時間5/25（月）早朝5:00スタート。",
    sourceUrl:
      "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    series: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    date: "2026年5月4日",
    raceType: "決勝",
    title: "アントネッリ、開幕からの3勝でマイデン3ポール全勝の偉業",
    excerpt:
      "ポールから一時3位まで落ちたアントネッリが、アンダーカットでノリスを抜き返し3.264秒差で勝利。Norrisが2位、ピアストリが最終ラップでルクレールを抜き3位表彰台。デビューシーズン最初の3ポールを全て勝ちに変えた初のドライバーとなり、選手権リードを20ポイントに拡大。",
    sourceUrl:
      "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
  },
  {
    series: "SF",
    round: 4,
    flag: "🇯🇵",
    gpName: "鈴鹿 Rd.4",
    date: "2026年5月23日",
    raceType: "決勝",
    title: "フェネストラズが14番手から大逆転、岩佐は13位ノーポイント",
    excerpt:
      "予選では岩佐歩夢が今季3度目のポールを獲得していたが、決勝は雨絡みの大荒れに。14番手スタートのフェネストラズが小雨タイミングでステイアウトする戦略を成功させ、トップでチェッカー。2位は松下信治、3位は坪井翔でTOM'S勢ダブル表彰台。岩佐はSC明けのリスタートとウェット交換が裏目に出て13位、ノーポイントに沈んだ。",
    sourceUrl: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
  },
  {
    series: "F1",
    round: 3,
    flag: "🇯🇵",
    gpName: "日本GP",
    date: "2026年4月12日",
    raceType: "決勝",
    title: "鈴鹿でアントネッリ連勝、メルセデス1-2フィニッシュ",
    excerpt:
      "鈴鹿の高速コーナーでメルセデスのアップグレードが見事に機能。ポールから引き離したアントネッリが連勝、ラッセルが2位でチームメイト同士のワンツー。3位はルクレールで、開幕からのメルセデス時代の到来を強く印象づけた一戦となった。",
    sourceUrl: "https://www.formula1.com/en/results/2026/races",
  },
];

/* ============================
   SNS
   ============================ */
export const sns = {
  x: { handle: "@flabo_jp", url: "https://x.com/flabo_jp" },
  instagram: {
    handle: "@flabo.jp",
    url: "https://instagram.com/flabo.jp",
  },
};

export const seriesLabel: Record<Series, string> = {
  F1: "F1",
  F2: "F2",
  F3: "F3",
  SF: "SUPER FORMULA",
  INDY: "INDYCAR",
};
