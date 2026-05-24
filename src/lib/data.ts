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
  date: string;
  url: string;
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
  podium: PodiumRow[];
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
};

/* ============================
   2026 SCHEDULES（公式カレンダー + カナダGP実セッション）
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
      sessions: [
        {
          name: "プラクティス",
          localDate: "5/22 (金)",
          localTime: "10:05 - 10:50",
          jpDate: "5/22 (金)",
          jpTime: "夜23:05 - 23:50",
          type: "practice",
        },
        {
          name: "予選",
          localDate: "5/22 (金)",
          localTime: "14:00 - 14:30",
          jpDate: "5/23 (土)",
          jpTime: "深夜3:00 - 3:30",
          type: "quali",
        },
        {
          name: "スプリント",
          localDate: "5/23 (土)",
          localTime: "14:10 - 15:00",
          jpDate: "5/24 (日)",
          jpTime: "深夜3:10 - 4:00",
          type: "sprint",
        },
        {
          name: "フィーチャー",
          localDate: "5/24 (日)",
          localTime: "12:05 - 13:10",
          jpDate: "5/25 (月)",
          jpTime: "深夜1:05 - 2:10",
          type: "race",
        },
      ],
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
    {
      series: "F3",
      round: 4,
      country: "Austria",
      flag: "🇦🇹",
      name: "シュピールベルク",
      date: "6月26日〜28日",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
    {
      series: "F3",
      round: 5,
      country: "Great Britain",
      flag: "🇬🇧",
      name: "シルバーストン",
      date: "7月3日〜5日",
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
          jpTime: "深夜1:45 - 5:00頃",
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
   今週末の放送予定（実セッション・日付付き）
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
   NEWS（出典URL付き、Web検索ベース）
   ============================ */
export const news: NewsItem[] = [
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "ラッセル、カナダGPスプリント制す。アントネッリと接触の波乱もポール堅持",
    date: "2026年5月23日",
    url: "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "カナダGP予選：ラッセルが終盤ギリギリのアタックでチームメイト・アントネッリを抑えポール",
    date: "2026年5月23日",
    url: "https://www.formula1.com/en/latest/article/russell-denies-mercedes-rival-antonelli-pole-position-for-canadian-grand-prix-with-last-gasp-effort.5b91PZNqJKlwMzExUu9twT",
  },
  {
    category: "SF",
    source: "AUTOSPORT web",
    title: "SF第4戦鈴鹿決勝：フェネストラズが2026年シーズン初優勝、松下が2位",
    date: "2026年5月23日",
    url: "https://www.as-web.jp/super-formula/1318746",
  },
  {
    category: "INDY",
    source: "RacingNews365",
    title:
      "インディ500：パロウが圧巻のポール獲得、佐藤琢磨は予選13番手で決勝へ",
    date: "2026年5月18日",
    url: "https://racingnews365.com/2026-indy-500---full-qualifying-results",
  },
  {
    category: "F1",
    source: "Sky Sports",
    title:
      "フェルスタッペン、現行レギュレーションに苦言「メンタル的に無理がある」",
    date: "2026年5月22日",
    url: "https://www.skysports.com/f1/news/12433/13547301/max-verstappen-red-bull-driver-renews-f1-quit-threat-as-he-says-current-regulations-are-not-mentally-doable-at-canadian-gp",
  },
  {
    category: "F1",
    source: "Formula1.com",
    title:
      "マイアミGP：アントネッリが今季3勝目、ノリスを抑えチャンピオンシップ首位を独走",
    date: "2026年5月3日",
    url: "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
  },
  {
    category: "F2/F3",
    source: "Pit Debrief",
    title:
      "F2マイアミ：ミニがフィーチャー制覇、ツォロフはスプリント勝利で首位浮上",
    date: "2026年5月3日",
    url: "https://www.pitdebrief.com/post/2026-f2-miami-gp-feature-race-results/",
  },
  {
    category: "SF",
    source: "AUTOSPORT web",
    title: "SF第4戦鈴鹿予選：岩佐歩夢がポールポジション、野尻が2番手",
    date: "2026年5月23日",
    url: "https://www.as-web.jp/super-formula/1318600",
  },
  {
    category: "INDY",
    source: "Motorsport.com",
    title:
      "インディGP：ルンガードが今季初優勝、パロウは5位でランキングリードを拡大",
    date: "2026年5月11日",
    url: "https://www.motorsport.com/indycar/news/complete-indycar-championship-standings-after-2026-indy-gp/10819574/",
  },
];

/* ============================
   STANDINGS（マイアミGP後 = Round 4 終了時点。F1のスプリント+本戦含む）
   ============================ */
export const standings: Record<
  Series,
  { drivers: StandingRow[]; teams: StandingRow[]; note?: string }
> = {
  F1: {
    note: "2026年マイアミGP（Round 4）終了時点。カナダGP決勝終了後に更新予定。",
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
    note: "2026年マイアミGP（Round 2）終了時点。",
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
    ],
  },
  F3: {
    note: "2026年メルボルン（Round 1）終了時点。Round 2モナコは6月開催予定。",
    drivers: [
      { pos: 1, name: "B.デル・ピノ", points: 15 },
      { pos: 2, name: "T.ナエル", points: 12 },
    ],
    teams: [],
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
    note: "2026年インディGP（5/10）終了時点。Indy500後に更新予定。",
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
   RESULTS（公式・スプリント/決勝を明確に区別）
   ============================ */
export const recentResults: RaceResult[] = [
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月23日",
    raceType: "スプリント",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "30:21.xxx" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+0.xxxs" },
      { pos: 3, driver: "K.アントネッリ", team: "Mercedes", time: "+0.xxxs" },
    ],
    sourceUrl:
      "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    series: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    date: "2026年5月3日",
    raceType: "決勝",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "—" },
      { pos: 3, driver: "O.ピアストリ", team: "McLaren", time: "—" },
    ],
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
    podium: [
      {
        pos: 1,
        driver: "S.フェネストラズ",
        team: "VANTELIN TEAM TOM'S",
        time: "—",
      },
      {
        pos: 2,
        driver: "松下 信治",
        team: "DELiGHTWORKS RACING",
        time: "—",
      },
      {
        pos: 3,
        driver: "坪井 翔",
        team: "VANTELIN TEAM TOM'S",
        time: "—",
      },
    ],
    sourceUrl: "https://www.as-web.jp/super-formula/1318746",
  },
  {
    series: "F2",
    round: 2,
    flag: "🇺🇸",
    gpName: "マイアミ",
    date: "2026年5月3日",
    raceType: "フィーチャー",
    podium: [
      { pos: 1, driver: "G.ミニ", team: "Prema Racing", time: "—" },
      { pos: 2, driver: "K.マイニ", team: "DAMS Lucas Oil", time: "—" },
      { pos: 3, driver: "R.カマラ", team: "Campos Racing", time: "—" },
    ],
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
    podium: [
      { pos: 1, driver: "N.ツォロフ", team: "Campos Racing", time: "—" },
      { pos: 2, driver: "L.ファンホペン", team: "AIX Racing", time: "+0.1s" },
      { pos: 3, driver: "A.ダン", team: "Rodin Motorsport", time: "—" },
    ],
    sourceUrl:
      "https://racingnews365.com/2026-miami-grand-prix-f2-sprint-results",
  },
  {
    series: "INDY",
    round: 5,
    flag: "🇺🇸",
    gpName: "インディGP（インディアナポリスGP）",
    date: "2026年5月10日",
    raceType: "決勝",
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
  {
    series: "INDY",
    round: 6,
    flag: "🇺🇸",
    gpName: "インディ500 予選",
    date: "2026年5月18日",
    raceType: "予選",
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
    sourceUrl:
      "https://racingnews365.com/2026-indy-500---full-qualifying-results",
  },
  {
    series: "F1",
    round: 3,
    flag: "🇯🇵",
    gpName: "日本GP",
    date: "2026年4月12日",
    raceType: "決勝",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "G.ラッセル", team: "Mercedes", time: "—" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "—" },
    ],
    sourceUrl: "https://www.formula1.com/en/results/2026/races",
  },
];

/* ============================
   REVIEWS
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
      "ポールスタートのラッセルが、チームメイト・アントネッリと接触しながらも首位を守り抜きスプリント優勝。2位ノリス、3位アントネッリ。決勝はモントリオール現地5/24（日本時間5/25早朝5:00）スタート。",
    sourceUrl:
      "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    series: "F1",
    round: 4,
    flag: "🇺🇸",
    gpName: "マイアミGP",
    date: "2026年5月3日",
    raceType: "決勝",
    title: "アントネッリが3連勝、ルーキー史上初の偉業",
    excerpt:
      "ポールトゥウィンを達成し開幕からの3戦すべて勝利。デビューシーズンの最初の3ポールをすべて勝ちに繋げた初のドライバーとなった。ノリス2位、ピアストリ3位。",
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
    title: "フェネストラズが今季初優勝、TOM'Sがダブル表彰台",
    excerpt:
      "予選では岩佐がポールを獲得していたが、決勝ではフェネストラズが冷静なレース運びでトップに立ち今季初勝利。2位は松下信治、3位は坪井翔。",
    sourceUrl: "https://www.as-web.jp/super-formula/1318746",
  },
  {
    series: "INDY",
    round: 6,
    flag: "🇺🇸",
    gpName: "インディ500 予選",
    date: "2026年5月18日",
    raceType: "予選",
    title: "パロウが232.348mphでポール、佐藤琢磨は13番手で決勝へ",
    excerpt:
      "通算4度のIndyCar王者・パロウが、土曜が雨で延期となった日曜決行の予選で堂々のポール獲得。2位ロッシ、3位マルカス。4度のインディ500王者・佐藤琢磨は予選13番手スタートとなる。",
    sourceUrl:
      "https://racingnews365.com/2026-indy-500---full-qualifying-results",
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
