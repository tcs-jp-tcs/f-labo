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

/* ============================
   公式カレンダー出典：
   - F1:   formula1.com/en/racing/2026
   - F2:   fiaformula2.com/Calendar
   - F3:   fiaformula3.com/Calendar
   - SF:   toyotagazooracing.com/jp/superformula/calendar/2026/
   - INDY: indycar.com/Schedule
   ============================ */
export const schedules: Record<Series, ScheduleItem[]> = {
  F1: [
    { series: "F1", round: 1, country: "Australia", flag: "🇦🇺", name: "オーストラリアGP", date: "3月6日〜8日", weekendType: "通常週末", status: "past", broadcast: "FOD / フジテレビNEXT",
      result: {
        pole: { driver: "G.ラッセル", team: "Mercedes", time: "1:18.518" },
        podium: [
          { pos: 1, driver: "G.ラッセル", team: "Mercedes" },
          { pos: 2, driver: "K.アントネッリ", team: "Mercedes" },
          { pos: 3, driver: "C.ルクレール", team: "Ferrari" },
        ],
        sourceUrl: "https://www.formula1.com/en/latest/article/russell-wins-action-packed-australian-gp-from-antonelli-as-mercedes-secure-1.4WRxPAtF4dFtrKCsWIiQX2",
      },
    },
    { series: "F1", round: 2, country: "China", flag: "🇨🇳", name: "中国GP", date: "3月13日〜15日", weekendType: "スプリント週末", status: "past", broadcast: "FOD / フジテレビNEXT",
      result: {
        sprint: {
          pole: { driver: "G.ラッセル", team: "Mercedes" },
          podium: [
            { pos: 1, driver: "G.ラッセル", team: "Mercedes" },
            { pos: 2, driver: "C.ルクレール", team: "Ferrari" },
            { pos: 3, driver: "L.ハミルトン", team: "Ferrari" },
          ],
        },
        pole: { driver: "K.アントネッリ", team: "Mercedes" },
        podium: [
          { pos: 1, driver: "K.アントネッリ", team: "Mercedes" },
          { pos: 2, driver: "G.ラッセル", team: "Mercedes" },
          { pos: 3, driver: "C.ルクレール", team: "Ferrari" },
        ],
        sourceUrl: "https://www.formula1.com/en/latest/article/russell-wins-thrilling-china-sprint-from-ferraris-leclerc-and-hamilton.3HLw6daSkBmV0rPREohMwQ",
      },
    },
    { series: "F1", round: 3, country: "Japan", flag: "🇯🇵", name: "日本GP", date: "3月27日〜29日", weekendType: "通常週末", status: "past", broadcast: "FOD / フジテレビNEXT",
      result: {
        pole: { driver: "K.アントネッリ", team: "Mercedes" },
        podium: [
          { pos: 1, driver: "K.アントネッリ", team: "Mercedes" },
          { pos: 2, driver: "O.ピアストリ", team: "McLaren" },
          { pos: 3, driver: "C.ルクレール", team: "Ferrari" },
        ],
        sourceUrl: "https://www.formula1.com/en/latest/article/antonelli-takes-championship-lead-after-surging-to-victory-in-japan-from.4EC4uZc29IUEO2iE5nKpUp",
      },
    },
    { series: "F1", round: 4, country: "USA", flag: "🇺🇸", name: "マイアミGP", date: "5月1日〜3日", weekendType: "スプリント週末", status: "past", broadcast: "FOD / フジテレビNEXT",
      result: {
        sprint: {
          pole: { driver: "L.ノリス", team: "McLaren" },
          podium: [
            { pos: 1, driver: "L.ノリス", team: "McLaren" },
            { pos: 2, driver: "O.ピアストリ", team: "McLaren" },
            { pos: 3, driver: "C.ルクレール", team: "Ferrari" },
          ],
        },
        pole: { driver: "K.アントネッリ", team: "Mercedes", time: "1:27.798" },
        podium: [
          { pos: 1, driver: "K.アントネッリ", team: "Mercedes" },
          { pos: 2, driver: "L.ノリス", team: "McLaren" },
          { pos: 3, driver: "O.ピアストリ", team: "McLaren" },
        ],
        sourceUrl: "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
      },
    },
    { series: "F1", round: 5, country: "Canada", flag: "🇨🇦", name: "カナダGP", date: "5月22日〜24日", weekendType: "スプリント週末", status: "past", broadcast: "FOD / フジテレビNEXT",
      sessions: [
        { name: "FP1", localDate: "5/22 (金)", localTime: "13:30 - 14:30", jpDate: "5/23 (土)", jpTime: "深夜1:20 -", type: "practice",
          broadcasts: { "フジTV NEXT": "深夜1:20", "FOD": "深夜1:20" } },
        { name: "スプリント予選", localDate: "5/22 (金)", localTime: "17:30 - 18:14", jpDate: "5/23 (土)", jpTime: "早朝5:20 -", type: "quali",
          broadcasts: { "フジTV NEXT": "早朝5:20", "FOD": "早朝5:20" } },
        { name: "スプリント", localDate: "5/23 (土)", localTime: "12:00 - 12:30", jpDate: "5/24 (日)", jpTime: "深夜0:30 -", type: "sprint",
          broadcasts: { "フジTV NEXT": "深夜0:30", "FOD": "深夜0:30" } },
        { name: "予選", localDate: "5/23 (土)", localTime: "16:00 - 17:00", jpDate: "5/24 (日)", jpTime: "早朝4:50 -", type: "quali",
          broadcasts: { "フジTV NEXT": "早朝4:50", "FOD": "早朝4:50" } },
        { name: "決勝（70 LAP）", localDate: "5/24 (日)", localTime: "14:00 -", jpDate: "5/25 (月)", jpTime: "早朝5:00 -", type: "race",
          broadcasts: { "フジTV NEXT": "早朝4:20", "FOD": "早朝4:20" } },
      ],
      result: {
        sprint: {
          pole: { driver: "G.ラッセル", team: "Mercedes" },
          podium: [
            { pos: 1, driver: "G.ラッセル", team: "Mercedes" },
            { pos: 2, driver: "L.ノリス", team: "McLaren" },
            { pos: 3, driver: "K.アントネッリ", team: "Mercedes" },
          ],
        },
        pole: { driver: "G.ラッセル", team: "Mercedes", time: "1:12.578" },
        fastestLap: { driver: "K.アントネッリ", team: "Mercedes", time: "1:14.210" },
        podium: [
          { pos: 1, driver: "K.アントネッリ", team: "Mercedes" },
          { pos: 2, driver: "L.ハミルトン", team: "Ferrari" },
          { pos: 3, driver: "M.フェルスタッペン", team: "Red Bull" },
        ],
        sourceUrl: "https://www.formula1.com/en/results/2026/races/1285/canada/race-result",
      },
    },
    { series: "F1", round: 6, country: "Monaco", flag: "🇲🇨", name: "モナコGP", date: "6月5日〜7日", weekendType: "通常週末", status: "next", broadcast: "FOD / フジテレビNEXT",
      sessions: [
        { name: "FP1", localDate: "6/5 (金)", localTime: "13:30 - 14:30", jpDate: "6/5 (金)", jpTime: "20:30 - 21:30", type: "practice",
          broadcasts: { "フジTV NEXT": "20:20", "FOD": "20:20" } },
        { name: "FP2", localDate: "6/5 (金)", localTime: "17:00 - 18:00", jpDate: "6/6 (土)", jpTime: "深夜0:00 - 1:00", type: "practice",
          broadcasts: { "フジTV NEXT": "深夜23:50", "FOD": "深夜23:50" } },
        { name: "FP3", localDate: "6/6 (土)", localTime: "12:30 - 13:30", jpDate: "6/6 (土)", jpTime: "19:30 - 20:30", type: "practice",
          broadcasts: { "フジTV NEXT": "19:20", "FOD": "19:20" } },
        { name: "予選", localDate: "6/6 (土)", localTime: "16:00 - 17:00", jpDate: "6/6 (土)", jpTime: "23:00 - 24:00", type: "quali",
          broadcasts: { "フジTV NEXT": "22:50", "FOD": "22:50" } },
        { name: "決勝（78 LAP）", localDate: "6/7 (日)", localTime: "15:00 -", jpDate: "6/7 (日)", jpTime: "22:00 -", type: "race",
          broadcasts: { "フジTV NEXT": "21:20", "FOD": "21:20" } },
      ],
    },
    { series: "F1", round: 7, country: "Spain", flag: "🇪🇸", name: "スペインGP（バルセロナ）", date: "6月12日〜14日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT",
      sessions: [
        { name: "FP1", localDate: "6/12 (金)", localTime: "13:30 - 14:30", jpDate: "6/12 (金)", jpTime: "20:30 - 21:30", type: "practice",
          broadcasts: { "フジTV NEXT": "20:20", "FOD": "20:20" } },
        { name: "FP2", localDate: "6/12 (金)", localTime: "17:00 - 18:00", jpDate: "6/13 (土)", jpTime: "深夜0:00 - 1:00", type: "practice",
          broadcasts: { "フジTV NEXT": "深夜23:50", "FOD": "深夜23:50" } },
        { name: "FP3", localDate: "6/13 (土)", localTime: "12:30 - 13:30", jpDate: "6/13 (土)", jpTime: "19:30 - 20:30", type: "practice",
          broadcasts: { "フジTV NEXT": "19:20", "FOD": "19:20" } },
        { name: "予選", localDate: "6/13 (土)", localTime: "16:00 - 17:00", jpDate: "6/13 (土)", jpTime: "23:00 - 24:00", type: "quali",
          broadcasts: { "フジTV NEXT": "22:50", "FOD": "22:50" } },
        { name: "決勝（66 LAP）", localDate: "6/14 (日)", localTime: "15:00 -", jpDate: "6/14 (日)", jpTime: "22:00 -", type: "race",
          broadcasts: { "フジTV NEXT": "21:20", "FOD": "21:20" } },
      ],
    },
    { series: "F1", round: 8, country: "Austria", flag: "🇦🇹", name: "オーストリアGP", date: "6月26日〜28日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 9, country: "Great Britain", flag: "🇬🇧", name: "イギリスGP", date: "7月3日〜5日", weekendType: "スプリント週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 10, country: "Belgium", flag: "🇧🇪", name: "ベルギーGP", date: "7月17日〜19日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 11, country: "Hungary", flag: "🇭🇺", name: "ハンガリーGP", date: "7月24日〜26日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 12, country: "Netherlands", flag: "🇳🇱", name: "オランダGP", date: "8月21日〜23日", weekendType: "スプリント週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 13, country: "Italy", flag: "🇮🇹", name: "イタリアGP（モンツァ）", date: "9月4日〜6日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 14, country: "Spain", flag: "🇪🇸", name: "スペインGP（マドリード）", date: "9月11日〜13日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 15, country: "Azerbaijan", flag: "🇦🇿", name: "アゼルバイジャンGP", date: "9月24日〜26日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 16, country: "Singapore", flag: "🇸🇬", name: "シンガポールGP", date: "10月9日〜11日", weekendType: "スプリント週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 17, country: "USA", flag: "🇺🇸", name: "アメリカGP（オースティン）", date: "10月23日〜25日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 18, country: "Mexico", flag: "🇲🇽", name: "メキシコシティGP", date: "10月30日〜11月1日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 19, country: "Brazil", flag: "🇧🇷", name: "サンパウロGP", date: "11月6日〜8日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 20, country: "USA", flag: "🇺🇸", name: "ラスベガスGP", date: "11月19日〜21日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 21, country: "Qatar", flag: "🇶🇦", name: "カタールGP", date: "11月27日〜29日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
    { series: "F1", round: 22, country: "Abu Dhabi", flag: "🇦🇪", name: "アブダビGP", date: "12月4日〜6日", weekendType: "通常週末", status: "upcoming", broadcast: "FOD / フジテレビNEXT" },
  ],
  F2: [
    { series: "F2", round: 1, country: "Australia", flag: "🇦🇺", name: "メルボルン", date: "3月6日〜8日", weekendType: "通常週末", status: "past", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 2, country: "USA", flag: "🇺🇸", name: "マイアミ", date: "5月1日〜3日", weekendType: "通常週末", status: "past", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 3, country: "Canada", flag: "🇨🇦", name: "モントリオール", date: "5月22日〜24日", weekendType: "通常週末", status: "live", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 4, country: "Monaco", flag: "🇲🇨", name: "モナコ", date: "6月4日〜7日", weekendType: "通常週末", status: "next", broadcast: "FODプロコース（F1 TV経由）",
      sessions: [
        { name: "プラクティス", localDate: "6/4 (木)", localTime: "15:00 - 15:45", jpDate: "6/4 (木)", jpTime: "22:00 - 22:45", type: "practice" },
        { name: "予選 グループA", localDate: "6/5 (金)", localTime: "15:10 - 15:24", jpDate: "6/5 (金)", jpTime: "22:10 - 22:24", type: "quali" },
        { name: "予選 グループB", localDate: "6/5 (金)", localTime: "15:34 - 15:48", jpDate: "6/5 (金)", jpTime: "22:34 - 22:48", type: "quali" },
        { name: "スプリント", localDate: "6/6 (土)", localTime: "14:15 - 15:00", jpDate: "6/6 (土)", jpTime: "21:15 - 22:00", type: "sprint" },
        { name: "フィーチャー", localDate: "6/7 (日)", localTime: "09:35 - 10:35", jpDate: "6/7 (日)", jpTime: "16:35 - 17:35", type: "race" },
      ],
    },
    { series: "F2", round: 5, country: "Spain", flag: "🇪🇸", name: "バルセロナ", date: "6月12日〜14日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 6, country: "Austria", flag: "🇦🇹", name: "シュピールベルク", date: "6月26日〜28日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 7, country: "Great Britain", flag: "🇬🇧", name: "シルバーストン", date: "7月3日〜5日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 8, country: "Belgium", flag: "🇧🇪", name: "スパ", date: "7月17日〜19日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 9, country: "Hungary", flag: "🇭🇺", name: "ブダペスト", date: "7月24日〜26日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 10, country: "Italy", flag: "🇮🇹", name: "モンツァ", date: "9月4日〜6日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 11, country: "Spain", flag: "🇪🇸", name: "マドリード", date: "9月11日〜13日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 12, country: "Azerbaijan", flag: "🇦🇿", name: "バクー", date: "9月24日〜26日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 13, country: "Qatar", flag: "🇶🇦", name: "ルサイル", date: "11月27日〜29日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F2", round: 14, country: "Abu Dhabi", flag: "🇦🇪", name: "ヤス・マリーナ", date: "12月4日〜6日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
  ],
  F3: [
    { series: "F3", round: 1, country: "Australia", flag: "🇦🇺", name: "メルボルン", date: "3月6日〜8日", weekendType: "通常週末", status: "past", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 2, country: "Monaco", flag: "🇲🇨", name: "モナコ", date: "6月4日〜7日", weekendType: "通常週末", status: "next", broadcast: "FODプロコース（F1 TV経由）",
      sessions: [
        { name: "プラクティス", localDate: "6/4 (木)", localTime: "13:25 - 14:10", jpDate: "6/4 (木)", jpTime: "20:25 - 21:10", type: "practice" },
        { name: "予選 グループA", localDate: "6/5 (金)", localTime: "10:05 - 10:19", jpDate: "6/5 (金)", jpTime: "17:05 - 17:19", type: "quali" },
        { name: "予選 グループB", localDate: "6/5 (金)", localTime: "11:29 - 11:43", jpDate: "6/5 (金)", jpTime: "18:29 - 18:43", type: "quali" },
        { name: "スプリント", localDate: "6/6 (土)", localTime: "10:45 - 11:25", jpDate: "6/6 (土)", jpTime: "17:45 - 18:25", type: "sprint" },
        { name: "フィーチャー", localDate: "6/7 (日)", localTime: "07:55 - 08:40", jpDate: "6/7 (日)", jpTime: "14:55 - 15:40", type: "race" },
      ],
    },
    { series: "F3", round: 3, country: "Spain", flag: "🇪🇸", name: "バルセロナ", date: "6月12日〜14日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 4, country: "Austria", flag: "🇦🇹", name: "シュピールベルク", date: "6月26日〜28日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 5, country: "Great Britain", flag: "🇬🇧", name: "シルバーストン", date: "7月3日〜5日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 6, country: "Belgium", flag: "🇧🇪", name: "スパ", date: "7月17日〜19日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 7, country: "Hungary", flag: "🇭🇺", name: "ブダペスト", date: "7月24日〜26日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 8, country: "Italy", flag: "🇮🇹", name: "モンツァ", date: "9月4日〜6日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
    { series: "F3", round: 9, country: "Spain", flag: "🇪🇸", name: "マドリード", date: "9月11日〜13日", weekendType: "通常週末", status: "upcoming", broadcast: "FODプロコース（F1 TV経由）" },
  ],
  SF: [
    { series: "SF", round: 1, roundLabel: "第1大会 Rd.1 + Rd.2 (2レース制)", country: "Japan", flag: "🇯🇵", name: "もてぎ", date: "4月4日（土）+ 4月5日（日）", weekendType: "通常週末", status: "past", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
    { series: "SF", round: 3, roundLabel: "第2大会 Rd.3 (1レース)", country: "Japan", flag: "🇯🇵", name: "オートポリス", date: "4月25日〜26日", weekendType: "通常週末", status: "past", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
    { series: "SF", round: 4, roundLabel: "第3大会 Rd.4 + Rd.5 (2レース制)", country: "Japan", flag: "🇯🇵", name: "鈴鹿", date: "5月23日（土）+ 5月24日（日）", weekendType: "通常週末", status: "past", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo",
      result: {
        pole: { driver: "岩佐 歩夢", team: "TEAM MUGEN" },
        podium: [
          { pos: 1, driver: "S.フェネストラズ", team: "VANTELIN TEAM TOM'S" },
          { pos: 2, driver: "松下 信治", team: "DELiGHTWORKS RACING" },
          { pos: 3, driver: "坪井 翔", team: "VANTELIN TEAM TOM'S" },
        ],
        sourceUrl: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
      },
    },
    { series: "SF", round: 6, roundLabel: "第4大会 Rd.6 + Rd.7 (2レース制)", country: "Japan", flag: "🇯🇵", name: "富士", date: "7月18日（土）+ 7月19日（日）", weekendType: "通常週末", status: "next", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
    { series: "SF", round: 8, roundLabel: "第5大会 Rd.8 (1レース)", country: "Japan", flag: "🇯🇵", name: "SUGO", date: "8月8日〜9日", weekendType: "通常週末", status: "upcoming", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
    { series: "SF", round: 9, roundLabel: "第6大会 Rd.9 + Rd.10 (2レース制)", country: "Japan", flag: "🇯🇵", name: "富士", date: "10月10日（土）+ 10月11日（日）", weekendType: "通常週末", status: "upcoming", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
    { series: "SF", round: 11, roundLabel: "第7大会 Rd.11 + Rd.12 (2レース制)", country: "Japan", flag: "🇯🇵", name: "鈴鹿", date: "11月21日（土）+ 11月22日（日）", weekendType: "通常週末", status: "upcoming", broadcast: "ABEMA（決勝無料）/ J SPORTS / FOD / DAZN / SFgo" },
  ],
  INDY: [
    { series: "INDY", round: 1, country: "USA", flag: "🇺🇸", name: "セントピーターズバーグ", date: "3月1日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 2, country: "USA", flag: "🇺🇸", name: "フェニックス（Good Ranchers 250）", date: "3月7日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 3, country: "USA", flag: "🇺🇸", name: "アーリントン（Java House GP）", date: "3月15日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 4, country: "USA", flag: "🇺🇸", name: "バーバー（Indy GP）", date: "3月29日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 5, country: "USA", flag: "🇺🇸", name: "ロングビーチ（Acura GP）", date: "4月19日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 6, country: "USA", flag: "🇺🇸", name: "ソンシオGP（インディGP）", date: "5月9日", weekendType: "通常週末", status: "past", broadcast: "GAORA SPORTS / GAORAオンデマンド",
      result: {
        podium: [
          { pos: 1, driver: "C.ルンガード", team: "Arrow McLaren" },
          { pos: 2, driver: "D.マルカス", team: "Team Penske" },
          { pos: 3, driver: "K.カークウッド", team: "Andretti Global" },
        ],
        sourceUrl: "https://www.motorsport.com/indycar/news/official-race-results-indycar-2026-indy-gp/10819572/",
      },
    },
    { series: "INDY", round: 7, country: "USA", flag: "🇺🇸", name: "インディ500", date: "5月24日", weekendType: "通常週末", status: "live", broadcast: "GAORA SPORTS / GAORAオンデマンド",
      sessions: [
        { name: "決勝（200 LAP）", localDate: "5/24 (日)", localTime: "12:45 ET", jpDate: "5/25 (月)", jpTime: "深夜1:45 〜", type: "race" },
      ],
      result: {
        pole: { driver: "A.パロウ", team: "Chip Ganassi Racing", time: "232.348 mph" },
        sourceUrl: "https://racingnews365.com/2026-indy-500---full-qualifying-results",
      },
    },
    { series: "INDY", round: 8, country: "USA", flag: "🇺🇸", name: "デトロイト（Chevrolet GP）", date: "5月29日〜31日", weekendType: "通常週末", status: "next", broadcast: "GAORA SPORTS / GAORAオンデマンド",
      sessions: [
        { name: "プラクティス1", localDate: "5/29 (金) ET", localTime: "15:00 -", jpDate: "5/30 (土)", jpTime: "早朝4:00 -", type: "practice" },
        { name: "プラクティス2", localDate: "5/30 (土) ET", localTime: "09:00 -", jpDate: "5/30 (土)", jpTime: "22:00 -", type: "practice" },
        { name: "予選", localDate: "5/30 (土) ET", localTime: "13:00 -", jpDate: "5/31 (日)", jpTime: "深夜2:00 -", type: "quali" },
        { name: "ウォームアップ", localDate: "5/31 (日) ET", localTime: "09:30 -", jpDate: "5/31 (日)", jpTime: "22:30 -", type: "practice" },
        { name: "決勝（100 LAP）", localDate: "5/31 (日) ET", localTime: "12:30 -", jpDate: "6/1 (月)", jpTime: "深夜1:30 -", type: "race" },
      ],
    },
    { series: "INDY", round: 9, country: "USA", flag: "🇺🇸", name: "WWTレースウェイ（Bommarito 500）", date: "6月7日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 10, country: "USA", flag: "🇺🇸", name: "ロード・アメリカ（XPEL GP）", date: "6月21日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 11, country: "USA", flag: "🇺🇸", name: "ミッドオハイオ（Honda Indy 200）", date: "7月5日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 12, country: "USA", flag: "🇺🇸", name: "ナッシュビル", date: "7月19日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 13, country: "USA", flag: "🇺🇸", name: "ポートランド（OnlyBulls GP）", date: "8月9日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 14, country: "Canada", flag: "🇨🇦", name: "マーカム（Ontario Honda Dealers Indy）", date: "8月16日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 15, country: "USA", flag: "🇺🇸", name: "ワシントンD.C.（Freedom 250）", date: "8月23日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 16, country: "USA", flag: "🇺🇸", name: "ミルウォーキー Race 1", date: "8月29日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
    { series: "INDY", round: 17, country: "USA", flag: "🇺🇸", name: "ミルウォーキー Race 2", date: "8月30日", weekendType: "通常週末", status: "upcoming", broadcast: "GAORA SPORTS / GAORAオンデマンド" },
  ],
};

/* ============================
   今週末の放送予定（フジテレビNEXT 公式時刻＋FOD ライブ配信）
   ============================ */
export const thisWeekendBroadcasts: WeekendBroadcast[] = [
  {
    series: "F1",
    round: 5,
    flag: "🇨🇦",
    gpName: "カナダGP",
    weekendType: "スプリント週末",
    channels: ["フジTV NEXT", "FOD"],
    note: "決勝レースは日本時間 5/25(月) 早朝5:00スタート。フジテレビNEXT番組表は番組開始時刻を「深夜0:30／早朝H:MM」形式で表示。",
    sessions: [
      { session: "FP1", date: "5/23 (土)", jst: "深夜1:20", channels: { "フジTV NEXT": true, FOD: true } },
      { session: "スプリント予選", date: "5/23 (土)", jst: "早朝5:20", channels: { "フジTV NEXT": true, FOD: true } },
      { session: "🏁 スプリント", date: "5/24 (日)", jst: "深夜0:30", channels: { "フジTV NEXT": true, FOD: true } },
      { session: "予選", date: "5/24 (日)", jst: "早朝4:50", channels: { "フジTV NEXT": true, FOD: true } },
      { session: "🏁 決勝（番組開始4:20 / レース5:00）", date: "5/25 (月)", jst: "早朝4:20", channels: { "フジTV NEXT": true, FOD: true } },
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
      { session: "🏁 決勝（200 LAP）", date: "5/25 (月)", jst: "深夜1:45", channels: { GAORA: true, "GAORAオンデマンド": true } },
    ],
  },
];

/* ============================
   NEWS（出典URL + 公式 OG画像）
   ============================ */
export const news: NewsItem[] = [
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
    category: "F2",
    source: "Pit Debrief",
    title:
      "F2カナダ・フィーチャー：M.ステンスホルネが初優勝、宮田 莉朋はリタイア",
    summary:
      "モントリオールのF2フィーチャーレースで、Hitech TGRのマルティニウス・ステンスホルネが今季初勝利。2位アレックス・ダン、3位は選手権首位のG.ミニ。宮田 莉朋（Hitech TGR）はレース中盤にピットへ向かいリタイアとなり、悔しいモントリオールデビュー戦に。チームメイトのステンスホルネは表彰台中央でHitechに今季最高の結果をもたらした。",
    date: "2026年5月25日",
    url: "https://www.pitdebrief.com/post/2026-f2-canadian-gp-feature-race-results/",
    imageUrl:
      "https://cdn.racingnews365.com/2026/Formula-2/Tsolov.jpg?v=1777733213&width=1800&height=945&quality=75&crop=3780%2C1985%2C0%2C267",
  },
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
  {
    category: "F3",
    source: "TopNews",
    title:
      "F3：ホンダ育成・加藤大翔が開幕戦表彰台、シュピールベルクテストで総合トップ",
    summary:
      "ART Grand Prixから2026 FIA F3にステップアップしたホンダ育成・加藤大翔（HFDP）が、開幕戦メルボルンでフィーチャー3位の表彰台を獲得。続くシュピールベルクのインシーズンテストでも2日間総合トップタイム（1分20秒297）を記録。同じくF3に参戦するりー海夏澄（ART）、中村仁（Hitech TGR）、山越陽悠（VAR）と合わせて日本人勢4人がF1直下カテゴリーに揃った歴史的シーズン。",
    date: "2026年5月22日",
    url: "https://topnews.jp/2026/05/22/news/f1/drivers/taito-kato/247527.html",
    imageUrl:
      "https://i0.wp.com/topnews.jp/wp-content/uploads/2026/05/taitokato_F3test_austria.jpg",
  },
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
];

/* ============================
   STANDINGS
   ============================ */
export const standings: Record<
  Series,
  { drivers: StandingRow[]; teams: StandingRow[]; note?: string }
> = {
  F1: {
    note: "2026年カナダGP（Round 5）終了時点。アントネッリが中国・日本・マイアミに続く4連勝でF1史上初のキャリア初4連勝。リード43ポイントに拡大。",
    drivers: [
      { pos: 1, name: "K.アントネッリ", team: "Mercedes", points: 131 },
      { pos: 2, name: "G.ラッセル", team: "Mercedes", points: 88 },
      { pos: 3, name: "C.ルクレール", team: "Ferrari", points: 75 },
      { pos: 4, name: "L.ハミルトン", team: "Ferrari", points: 72 },
      { pos: 5, name: "L.ノリス", team: "McLaren", points: 58 },
      { pos: 6, name: "O.ピアストリ", team: "McLaren", points: 48 },
      { pos: 7, name: "M.フェルスタッペン", team: "Red Bull", points: 43 },
      { pos: 8, name: "I.ハジャー", team: "Red Bull", points: 11 },
      { pos: 9, name: "F.コラピント", team: "Alpine", points: 8 },
      { pos: 10, name: "L.ローソン", team: "Racing Bulls", points: 6 },
    ],
    teams: [
      { pos: 1, name: "Mercedes", points: 219 },
      { pos: 2, name: "Ferrari", points: 147 },
      { pos: 3, name: "McLaren", points: 106 },
      { pos: 4, name: "Red Bull", points: 58 },
      { pos: 5, name: "Alpine", points: 35 },
      { pos: 6, name: "Racing Bulls", points: 20 },
      { pos: 7, name: "Haas", points: 19 },
      { pos: 8, name: "Williams", points: 12 },
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
    series: "F1", round: 5, flag: "🇨🇦", gpName: "カナダGP",
    date: "2026年5月25日（日本時間 月曜 早朝）", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "L.ハミルトン", team: "Ferrari", time: "+10.768s" },
      { pos: 3, driver: "M.フェルスタッペン", team: "Red Bull", time: "+11.276s" },
    ],
    note: "ポール：ラッセル（1:12.578）/ FL：アントネッリ（1:14.210）。アントネッリは中国・日本・マイアミに続く4連勝でF1史上初のキャリア初4連勝。ラッセルは31周目にパワーロスでDNF、ノリスはギアボックストラブルでDNF、ピアストリはアルボン接触の10秒ペナルティで11位。トップ10：4位ルクレール(+44.151)、5位ハジャー(+1Lap)、6位コラピント(+1Lap)、7位ローソン(+1Lap)、8位ガスリー(+1Lap)、9位サインツ(+1Lap)、10位ベアマン(+1Lap)。",
    sourceUrl: "https://www.formula1.com/en/results/2026/races/1285/canada/race-result",
  },
  {
    series: "F1", round: 5, flag: "🇨🇦", gpName: "カナダGP",
    date: "2026年5月24日（日本時間 日曜 深夜1:00）", raceType: "スプリント", status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "28:50.951" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+1.272s" },
      { pos: 3, driver: "K.アントネッリ", team: "Mercedes", time: "+1.843s" },
    ],
    note: "1コーナーでラッセル／アントネッリが接触、ラッセルが死守して優勝。4位ピアストリ、5位ルクレール、6位ハミルトン、7位フェルスタッペン。",
    sourceUrl: "https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb",
  },
  {
    series: "F1", round: 4, flag: "🇺🇸", gpName: "マイアミGP",
    date: "2026年5月4日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "L.ノリス", team: "McLaren", time: "+3.0s" },
      { pos: 3, driver: "O.ピアストリ", team: "McLaren", time: "—" },
    ],
    note: "ポール：アントネッリ（1:27.798）。4位ラッセル、5位フェルスタッペン、6位ハミルトン。",
    sourceUrl: "https://www.formula1.com/en/latest/article/antonelli-wins-thrilling-miami-grand-prix-from-norris-and-piastri.2bxaKuYKJjxlXx8KOJf7lc",
  },
  {
    series: "F1", round: 4, flag: "🇺🇸", gpName: "マイアミGP",
    date: "2026年5月3日", raceType: "スプリント", status: "confirmed",
    podium: [
      { pos: 1, driver: "L.ノリス", team: "McLaren", time: "—" },
      { pos: 2, driver: "O.ピアストリ", team: "McLaren", time: "+3.766s" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "+6.251s" },
    ],
    sourceUrl: "https://www.formula1.com/en/latest/article/norris-beats-piastri-and-leclerc-to-victory-in-miami-sprint.4H4WI3lnIs7jOZ8lSBIp6X",
  },
  {
    series: "F1", round: 3, flag: "🇯🇵", gpName: "日本GP",
    date: "2026年3月29日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "O.ピアストリ", team: "McLaren", time: "+13s台" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "—" },
    ],
    note: "ポール：アントネッリ。4位ラッセルでアントネッリが選手権首位浮上。",
    sourceUrl: "https://www.formula1.com/en/latest/article/antonelli-takes-championship-lead-after-surging-to-victory-in-japan-from.4EC4uZc29IUEO2iE5nKpUp",
  },
  {
    series: "F1", round: 2, flag: "🇨🇳", gpName: "中国GP",
    date: "2026年3月15日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "K.アントネッリ", team: "Mercedes", time: "—" },
      { pos: 2, driver: "G.ラッセル", team: "Mercedes", time: "—" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "—" },
    ],
    sourceUrl: "https://www.formula1.com/en/results/2026/races",
  },
  {
    series: "F1", round: 2, flag: "🇨🇳", gpName: "中国GP",
    date: "2026年3月15日", raceType: "スプリント", status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "—" },
      { pos: 2, driver: "C.ルクレール", team: "Ferrari", time: "+0.674s" },
      { pos: 3, driver: "L.ハミルトン", team: "Ferrari", time: "+2.554s" },
    ],
    sourceUrl: "https://www.formula1.com/en/latest/article/russell-wins-thrilling-china-sprint-from-ferraris-leclerc-and-hamilton.3HLw6daSkBmV0rPREohMwQ",
  },
  {
    series: "F1", round: 1, flag: "🇦🇺", gpName: "オーストラリアGP",
    date: "2026年3月8日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ラッセル", team: "Mercedes", time: "—" },
      { pos: 2, driver: "K.アントネッリ", team: "Mercedes", time: "+4s台" },
      { pos: 3, driver: "C.ルクレール", team: "Ferrari", time: "—" },
    ],
    note: "ポール：ラッセル（1:18.518、2位アントネッリに+0.785）",
    sourceUrl: "https://www.formula1.com/en/latest/article/russell-wins-action-packed-australian-gp-from-antonelli-as-mercedes-secure-1.4WRxPAtF4dFtrKCsWIiQX2",
  },
  {
    series: "SF", round: 4, flag: "🇯🇵", gpName: "鈴鹿 Rd.4",
    date: "2026年5月23日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "S.フェネストラズ", team: "VANTELIN TEAM TOM'S", time: "1h05'12.423" },
      { pos: 2, driver: "松下 信治", team: "DELiGHTWORKS RACING", time: "+0.760" },
      { pos: 3, driver: "坪井 翔", team: "VANTELIN TEAM TOM'S", time: "+1.159" },
    ],
    note: "ポール：岩佐歩夢（TEAM MUGEN）→ 決勝P13ノーポイント。4位ブラウニング(+6.639)、5位ブルツ(+10.419)、6位大湯。",
    sourceUrl: "https://jp.motorsport.com/super-formula/news/2026-sf-r4-race-result/10823240/",
  },
  {
    series: "F2", round: 2, flag: "🇺🇸", gpName: "マイアミ",
    date: "2026年5月3日", raceType: "フィーチャー", status: "confirmed",
    podium: [
      { pos: 1, driver: "G.ミニ", team: "Prema Racing", time: "—" },
      { pos: 2, driver: "K.マイニ", team: "DAMS Lucas Oil", time: "—" },
      { pos: 3, driver: "R.カマラ", team: "Campos Racing", time: "—" },
    ],
    note: "宮田莉朋（Hitech TGR）は6位入賞、自己ベストの結果。",
    sourceUrl: "https://www.pitdebrief.com/post/2026-f2-miami-gp-feature-race-results/",
  },
  {
    series: "F2", round: 2, flag: "🇺🇸", gpName: "マイアミ",
    date: "2026年5月3日", raceType: "スプリント", status: "confirmed",
    podium: [
      { pos: 1, driver: "N.ツォロフ", team: "Campos Racing", time: "—" },
      { pos: 2, driver: "L.ファンホペン", team: "TRIDENT", time: "+0.170s" },
      { pos: 3, driver: "A.ダン", team: "Rodin Motorsport", time: "—" },
    ],
    note: "宮田は12位。最終ラップでツォロフ／ファンホペン／ダンが激しいバトル。",
    sourceUrl: "https://racingnews365.com/2026-miami-grand-prix-f2-sprint-results",
  },
  {
    series: "F3", round: 1, flag: "🇦🇺", gpName: "メルボルン",
    date: "2026年3月8日", raceType: "フィーチャー", status: "confirmed",
    podium: [
      { pos: 1, driver: "U.ウゴチュク", team: "ART Grand Prix", time: "—" },
      { pos: 2, driver: "E.デリニー", team: "Van Amersfoort Racing", time: "—" },
      { pos: 3, driver: "加藤 大翔", team: "ART Grand Prix", time: "—" },
    ],
    note: "加藤は5位フィニッシュ後、ペナルティで3位繰り上がりF3デビュー戦表彰台。",
    sourceUrl: "https://www.pitdebrief.com/post/f3-2026-australian-gp-feature-race-results/",
  },
  {
    series: "F3", round: 1, flag: "🇦🇺", gpName: "メルボルン",
    date: "2026年3月8日", raceType: "スプリント", status: "confirmed",
    podium: [
      { pos: 1, driver: "B.デル・ピノ", team: "Van Amersfoort Racing", time: "—" },
      { pos: 2, driver: "E.デリニー", team: "Van Amersfoort Racing", time: "—" },
      { pos: 3, driver: "T.バーニコート", team: "Hitech TGR", time: "—" },
    ],
    sourceUrl: "https://www.formula1.com/en/latest/article/f3-del-pino-wins-melbourne-sprint-race-ahead-of-deligny-for-var-1-2.2TKh8SK8TiLNxrvw3zmQio",
  },
  {
    series: "INDY", round: 7, flag: "🇺🇸", gpName: "インディ500 決勝",
    date: "2026年5月25日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "F.ローゼンクヴィスト", team: "Meyer Shank Racing", time: "—" },
      { pos: 2, driver: "D.マルカス", team: "AJ Foyt Racing", time: "+0.0233s" },
      { pos: 3, driver: "P.オワード", team: "Arrow McLaren", time: "—" },
    ],
    note: "インディ500史上最少差0.0233秒の劇的フィニッシュ。ローゼンクヴィストが最終ラップでマルカスをパスし初優勝。4位M.アームストロング、5位R.ヴィーケイ、6位A.パロウ、7位S.フェルッチ、8位R.グロージャン、9位非公開。佐藤琢磨（RLL #75ホンダ）は13番手スタートから10位入賞、レース後「2027年再挑戦を検討」と語った。",
    sourceUrl: "https://www.motorsport.com/indycar/news/felix-rosenqvist-wins-2026-indy-500-in-closest-ever-finish/10823901/",
  },
  {
    series: "INDY", round: 6, flag: "🇺🇸", gpName: "インディ500 予選",
    date: "2026年5月18日", raceType: "予選", status: "confirmed",
    podium: [
      { pos: 1, driver: "A.パロウ", team: "Chip Ganassi Racing", time: "232.348 mph" },
      { pos: 2, driver: "A.ロッシ", team: "Ed Carpenter Racing", time: "231.990 mph" },
      { pos: 3, driver: "D.マルカス", team: "Team Penske", time: "231.877 mph" },
    ],
    note: "佐藤琢磨（RLL #75 / ホンダ）は13番手で決勝へ。",
    sourceUrl: "https://racingnews365.com/2026-indy-500---full-qualifying-results",
  },
  {
    series: "INDY", round: 6, flag: "🇺🇸", gpName: "インディGP（ソンシオGP）",
    date: "2026年5月10日", raceType: "決勝", status: "confirmed",
    podium: [
      { pos: 1, driver: "C.ルンガード", team: "Arrow McLaren", time: "—" },
      { pos: 2, driver: "D.マルカス", team: "Team Penske", time: "—" },
      { pos: 3, driver: "K.カークウッド", team: "Andretti Global", time: "—" },
    ],
    sourceUrl: "https://www.motorsport.com/indycar/news/official-race-results-indycar-2026-indy-gp/10819572/",
  },
];

/* レビューは Coming Soon。データ自体は使わないが互換のため空配列を残す */
export const reviews: never[] = [];

/* SNS */
export const sns = {
  x: { handle: "@flabo_jp", url: "https://x.com/flabo_jp" },
  instagram: { handle: "@flabo.jp", url: "https://instagram.com/flabo.jp" },
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
