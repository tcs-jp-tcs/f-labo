export type Series = "F1" | "F2" | "F3" | "SF" | "INDY";

export type ScheduleItem = {
  series: Series;
  round: number;
  country: string;
  flag: string;
  name: string;
  date: string;
  weekendType: "通常週末" | "スプリント週末";
  status?: "next" | "past" | "upcoming";
  broadcast: string;
};

export type BroadcastSession = {
  session: string;
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
  podium: PodiumRow[];
};

export type Review = {
  series: Series;
  round: number;
  flag: string;
  gpName: string;
  date: string;
  title: string;
  excerpt: string;
};

/* ============ SCHEDULES ============ */
export const schedules: Record<Series, ScheduleItem[]> = {
  F1: [
    {
      series: "F1",
      round: 8,
      country: "Canada",
      flag: "🇨🇦",
      name: "カナダGP",
      date: "5月24日（土）",
      weekendType: "通常週末",
      status: "past",
      broadcast: "FOD / フジNEXT",
    },
    {
      series: "F1",
      round: 9,
      country: "Spain",
      flag: "🇪🇸",
      name: "スペインGP",
      date: "6月1日（日）",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FOD / フジNEXT",
    },
    {
      series: "F1",
      round: 10,
      country: "Austria",
      flag: "🇦🇹",
      name: "オーストリアGP",
      date: "6月15日（日）",
      weekendType: "スプリント週末",
      status: "upcoming",
      broadcast: "FOD / フジNEXT",
    },
    {
      series: "F1",
      round: 11,
      country: "Great Britain",
      flag: "🇬🇧",
      name: "イギリスGP",
      date: "7月6日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FOD / フジNEXT",
    },
    {
      series: "F1",
      round: 12,
      country: "Belgium",
      flag: "🇧🇪",
      name: "ベルギーGP",
      date: "7月27日（日）",
      weekendType: "スプリント週末",
      status: "upcoming",
      broadcast: "FOD / フジNEXT",
    },
    {
      series: "F1",
      round: 13,
      country: "Hungary",
      flag: "🇭🇺",
      name: "ハンガリーGP",
      date: "8月3日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FOD / フジNEXT",
    },
  ],
  F2: [
    {
      series: "F2",
      round: 7,
      country: "Spain",
      flag: "🇪🇸",
      name: "スペイン Rd.7",
      date: "5月31日（土）〜6月1日（日）",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 8,
      country: "Austria",
      flag: "🇦🇹",
      name: "オーストリア Rd.8",
      date: "6月14日（土）〜6月15日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 9,
      country: "Great Britain",
      flag: "🇬🇧",
      name: "シルバーストン Rd.9",
      date: "7月5日（土）〜7月6日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
    {
      series: "F2",
      round: 10,
      country: "Belgium",
      flag: "🇧🇪",
      name: "スパ Rd.10",
      date: "7月26日（土）〜7月27日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
  ],
  F3: [
    {
      series: "F3",
      round: 6,
      country: "Spain",
      flag: "🇪🇸",
      name: "スペイン Rd.6",
      date: "5月31日（土）〜6月1日（日）",
      weekendType: "通常週末",
      status: "next",
      broadcast: "FODプロコース",
    },
    {
      series: "F3",
      round: 7,
      country: "Austria",
      flag: "🇦🇹",
      name: "オーストリア Rd.7",
      date: "6月14日（土）〜6月15日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
    {
      series: "F3",
      round: 8,
      country: "Great Britain",
      flag: "🇬🇧",
      name: "シルバーストン Rd.8",
      date: "7月5日（土）〜7月6日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "FODプロコース",
    },
  ],
  SF: [
    {
      series: "SF",
      round: 4,
      country: "Japan",
      flag: "🇯🇵",
      name: "鈴鹿 Rd.4",
      date: "5月17日（土）〜5月18日（日）",
      weekendType: "通常週末",
      status: "past",
      broadcast: "ABEMA / J SPORTS / FOD / DAZN / SFgo",
    },
    {
      series: "SF",
      round: 5,
      country: "Japan",
      flag: "🇯🇵",
      name: "オートポリス Rd.5",
      date: "6月7日（土）〜6月8日（日）",
      weekendType: "通常週末",
      status: "next",
      broadcast: "ABEMA / J SPORTS / FOD / DAZN / SFgo",
    },
    {
      series: "SF",
      round: 6,
      country: "Japan",
      flag: "🇯🇵",
      name: "もてぎ Rd.6",
      date: "8月23日（土）〜8月24日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "ABEMA / J SPORTS / FOD / DAZN / SFgo",
    },
    {
      series: "SF",
      round: 7,
      country: "Japan",
      flag: "🇯🇵",
      name: "SUGO Rd.7",
      date: "9月20日（土）〜9月21日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "ABEMA / J SPORTS / FOD / DAZN / SFgo",
    },
  ],
  INDY: [
    {
      series: "INDY",
      round: 6,
      country: "USA",
      flag: "🇺🇸",
      name: "インディ500",
      date: "5月25日（日）",
      weekendType: "通常週末",
      status: "next",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
    {
      series: "INDY",
      round: 7,
      country: "USA",
      flag: "🇺🇸",
      name: "デトロイト",
      date: "6月1日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
    {
      series: "INDY",
      round: 8,
      country: "USA",
      flag: "🇺🇸",
      name: "ロード・アメリカ",
      date: "6月22日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
    {
      series: "INDY",
      round: 9,
      country: "USA",
      flag: "🇺🇸",
      name: "アイオワ",
      date: "7月13日（日）",
      weekendType: "通常週末",
      status: "upcoming",
      broadcast: "GAORA SPORTS / GAORAオンデマンド",
    },
  ],
};

/* ============ THIS WEEKEND BROADCAST ============ */
export const thisWeekendBroadcasts: WeekendBroadcast[] = [
  {
    series: "F1",
    round: 9,
    flag: "🇪🇸",
    gpName: "スペインGP",
    weekendType: "通常週末",
    channels: ["FOD", "フジNEXT"],
    sessions: [
      {
        session: "FP1",
        jst: "夜 21:30",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "FP2",
        jst: "深夜 1:00",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "FP3",
        jst: "夜 20:30",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "予選",
        jst: "夜 23:00",
        channels: { FOD: true, "フジNEXT": true },
      },
      {
        session: "🏁 決勝",
        jst: "夜 22:00",
        channels: { FOD: true, "フジNEXT": true },
      },
    ],
  },
  {
    series: "INDY",
    round: 6,
    flag: "🇺🇸",
    gpName: "インディ500",
    weekendType: "通常週末",
    channels: ["GAORA", "GAORAオンデマンド"],
    sessions: [
      {
        session: "ファイナル予選",
        jst: "早朝 4:00",
        channels: { GAORA: true, "GAORAオンデマンド": true },
      },
      {
        session: "🏁 決勝",
        jst: "深夜 1:45",
        channels: { GAORA: true, "GAORAオンデマンド": true },
      },
    ],
  },
];

/* ============ NEWS ============ */
export const news: NewsItem[] = [
  {
    category: "F1",
    source: "Formula1.com",
    title: "メキースがフェルスタッペンの残留を強調、ピアストリ移籍の噂を否定",
    date: "2026年5月24日",
  },
  {
    category: "SF",
    source: "スーパーフォーミュラ公式",
    title: "鈴鹿Rd.4、フェネストラが雨の波乱で劇的優勝",
    date: "2026年5月23日",
  },
  {
    category: "INDY",
    source: "IndyCar 公式",
    title: "インディ500：エリクソンがポールポジション獲得、佐藤琢磨は12番手",
    date: "2026年5月22日",
  },
  {
    category: "F1",
    source: "AUTOSPORT",
    title: "メルセデス、スペインGPで大型アップグレード投入を予告",
    date: "2026年5月22日",
  },
  {
    category: "F2/F3",
    source: "Formula2.com",
    title: "F2モナコ：ハジャーがフィーチャーレース制覇、選手権首位に",
    date: "2026年5月21日",
  },
  {
    category: "F1",
    source: "RACER",
    title: "ローソン、レッドブル離脱の可能性に言及「決断は近い」",
    date: "2026年5月20日",
  },
  {
    category: "SF",
    source: "AS-web",
    title: "野尻智紀、TGRが新空力パッケージ投入「劇的に変わる」",
    date: "2026年5月19日",
  },
  {
    category: "INDY",
    source: "RACER",
    title: "Andretti Globalがインディ500で5台体制、新人デビューも",
    date: "2026年5月18日",
  },
  {
    category: "F2/F3",
    source: "Formula3.com",
    title: "F3モナコ：チームライバルが接触、レッドフラッグで終了",
    date: "2026年5月17日",
  },
];

/* ============ STANDINGS ============ */
export const standings: Record<
  Series,
  { drivers: StandingRow[]; teams: StandingRow[] }
> = {
  F1: {
    drivers: [
      { pos: 1, name: "L.ノリス", points: 186 },
      { pos: 2, name: "C.ルクレール", points: 172 },
      { pos: 3, name: "M.フェルスタッペン", points: 158 },
      { pos: 4, name: "O.ピアストリ", points: 140 },
      { pos: 5, name: "G.ラッセル", points: 118 },
      { pos: 6, name: "L.ハミルトン", points: 96 },
      { pos: 7, name: "F.アロンソ", points: 64 },
      { pos: 8, name: "C.サインツ", points: 58 },
      { pos: 9, name: "F.コラピント", points: 42 },
      { pos: 10, name: "I.ハジャー", points: 33 },
    ],
    teams: [
      { pos: 1, name: "McLaren", points: 326 },
      { pos: 2, name: "Ferrari", points: 312 },
      { pos: 3, name: "Red Bull", points: 256 },
      { pos: 4, name: "Mercedes", points: 218 },
      { pos: 5, name: "Aston Martin", points: 88 },
      { pos: 6, name: "Williams", points: 64 },
      { pos: 7, name: "RB", points: 42 },
      { pos: 8, name: "Alpine", points: 21 },
    ],
  },
  F2: {
    drivers: [
      { pos: 1, name: "I.ハジャー", points: 124 },
      { pos: 2, name: "P.アロン", points: 108 },
      { pos: 3, name: "G.ボルトレート", points: 96 },
      { pos: 4, name: "A.アントネッリ", points: 87 },
      { pos: 5, name: "L.クロフォード", points: 62 },
      { pos: 6, name: "Z.マロニー", points: 54 },
    ],
    teams: [
      { pos: 1, name: "Hitech Pulse-Eight", points: 218 },
      { pos: 2, name: "ART Grand Prix", points: 198 },
      { pos: 3, name: "Prema Racing", points: 174 },
      { pos: 4, name: "DAMS", points: 132 },
    ],
  },
  F3: {
    drivers: [
      { pos: 1, name: "L.ティクトゥム", points: 88 },
      { pos: 2, name: "T.バーニコート", points: 74 },
      { pos: 3, name: "A.ドゥンネ", points: 66 },
      { pos: 4, name: "S.モントーヤ", points: 52 },
      { pos: 5, name: "C.メイニ", points: 47 },
    ],
    teams: [
      { pos: 1, name: "Trident", points: 164 },
      { pos: 2, name: "Prema Racing", points: 142 },
      { pos: 3, name: "ART Grand Prix", points: 118 },
    ],
  },
  SF: {
    drivers: [
      { pos: 1, name: "野尻 智紀", points: 56 },
      { pos: 2, name: "宮田 莉朋", points: 48 },
      { pos: 3, name: "山下 健太", points: 42 },
      { pos: 4, name: "笹原 右京", points: 38 },
      { pos: 5, name: "国本 雄資", points: 31 },
      { pos: 6, name: "T.フェネストラ", points: 28 },
    ],
    teams: [
      { pos: 1, name: "TEAM MUGEN", points: 92 },
      { pos: 2, name: "VANTELIN TEAM TOM'S", points: 84 },
      { pos: 3, name: "Kids com Team KCMG", points: 67 },
      { pos: 4, name: "TGM Grand Prix", points: 58 },
    ],
  },
  INDY: {
    drivers: [
      { pos: 1, name: "A.パロウ", points: 198 },
      { pos: 2, name: "S.ディクソン", points: 178 },
      { pos: 3, name: "C.ハータ", points: 164 },
      { pos: 4, name: "P.オワード", points: 152 },
      { pos: 5, name: "W.パワー", points: 138 },
      { pos: 6, name: "佐藤 琢磨", points: 96 },
    ],
    teams: [
      { pos: 1, name: "Chip Ganassi Racing", points: 396 },
      { pos: 2, name: "Andretti Global", points: 312 },
      { pos: 3, name: "Team Penske", points: 286 },
      { pos: 4, name: "Arrow McLaren", points: 242 },
    ],
  },
};

/* ============ RESULTS ============ */
export const recentResults: RaceResult[] = [
  {
    series: "F1",
    round: 8,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月24日",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "1:32:14.456" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+3.2s" },
      { pos: 3, driver: "M.フェルスタッペン", team: "Red Bull", time: "+5.8s" },
    ],
  },
  {
    series: "SF",
    round: 4,
    flag: "🇯🇵",
    gpName: "鈴鹿 Rd.4",
    date: "2026年5月18日",
    podium: [
      { pos: 1, driver: "T.フェネストラ", team: "TGM Grand Prix", time: "1:18:22.115" },
      { pos: 2, driver: "野尻 智紀", team: "TEAM MUGEN", time: "+4.1s" },
      { pos: 3, driver: "宮田 莉朋", team: "VANTELIN TEAM TOM'S", time: "+6.7s" },
    ],
  },
  {
    series: "F1",
    round: 7,
    flag: "🇲🇨",
    gpName: "モナコGP",
    date: "2026年5月18日",
    podium: [
      { pos: 1, driver: "C.ルクレール", team: "Ferrari", time: "1:42:11.872" },
      { pos: 2, driver: "O.ピアストリ", team: "McLaren", time: "+1.2s" },
      { pos: 3, driver: "L.ノリス", team: "McLaren", time: "+2.9s" },
    ],
  },
  {
    series: "F2",
    round: 6,
    flag: "🇲🇨",
    gpName: "モナコ Rd.6",
    date: "2026年5月17日",
    podium: [
      { pos: 1, driver: "I.ハジャー", team: "Hitech Pulse-Eight", time: "55:42.118" },
      { pos: 2, driver: "P.アロン", team: "ART Grand Prix", time: "+2.1s" },
      { pos: 3, driver: "G.ボルトレート", team: "Prema Racing", time: "+3.6s" },
    ],
  },
  {
    series: "INDY",
    round: 5,
    flag: "🇺🇸",
    gpName: "インディGP",
    date: "2026年5月11日",
    podium: [
      { pos: 1, driver: "A.パロウ", team: "Chip Ganassi Racing", time: "1:42:55.213" },
      { pos: 2, driver: "C.ハータ", team: "Andretti Global", time: "+1.8s" },
      { pos: 3, driver: "S.ディクソン", team: "Chip Ganassi Racing", time: "+3.5s" },
    ],
  },
];

/* ============ REVIEWS ============ */
export const reviews: Review[] = [
  {
    series: "F1",
    round: 8,
    flag: "🇨🇦",
    gpName: "カナダGP",
    date: "2026年5月24日",
    title: "ラッセルが完璧なレース運びで今季2勝目",
    excerpt:
      "予選3番手から好スタートを決めたラッセルが、1ストップ戦略でトップを守り切った。メルセデスのアップグレードパッケージが機能し、終始安定したペースを見せた一戦。",
  },
  {
    series: "SF",
    round: 4,
    flag: "🇯🇵",
    gpName: "鈴鹿 Rd.4",
    date: "2026年5月18日",
    title: "フェネストラが雨の波乱で初優勝",
    excerpt:
      "レース中盤の集中豪雨でタイヤ交換タイミングが勝敗を分けた一戦。フェネストラはピット判断の早さで一気にトップへ。野尻が冷静に2位を守った。",
  },
  {
    series: "F1",
    round: 7,
    flag: "🇲🇨",
    gpName: "モナコGP",
    date: "2026年5月18日",
    title: "ルクレールが地元で完全勝利、ポールトゥウィン",
    excerpt:
      "フェラーリのソフトタイヤ運用が冴え、SCをきっかけにギャップを最大化。マクラーレン勢を寄せ付けず、悲願の地元優勝を制した。",
  },
  {
    series: "F2",
    round: 6,
    flag: "🇲🇨",
    gpName: "モナコ Rd.6",
    date: "2026年5月17日",
    title: "ハジャーがフィーチャーレース制覇、選手権首位浮上",
    excerpt:
      "予選で見せた一発の速さをそのまま決勝に持ち込み、終始ライバルを抑え切った。アロンとのバトルは一切譲らず、自身2勝目を獲得。",
  },
];

/* ============ SNS ============ */
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
