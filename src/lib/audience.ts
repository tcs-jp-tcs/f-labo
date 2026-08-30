import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * オーディエンス（フォロワーの内訳）のデータアクセス層。
 *
 * 投稿の実績（telemetry.ts）が「期間の集計」なのに対し、こちらは
 * snapshot_date 時点の断面。期間フィルターではなくスナップショット日で切り替える。
 * 現状は1日分しか無いが、日付が溜まったら availableDates から選べるようにしてある。
 */

/* ------------------------------------------------------------------ 型 */

export type CountryStat = {
  code: string;
  name: string;
  followers: number;
  share: number;
};

export type Gender = "male" | "female" | "undefined";

export type AgeGenderStat = {
  ageBracket: string;
  male: number;
  female: number;
  unknown: number;
  total: number;
};

export type FollowerStat = {
  platform: string;
  label: string;
  followers: number;
};

export type Audience = {
  /** 表示中のスナップショット日（YYYY-MM-DD）。データが無ければ null */
  snapshotDate: string | null;
  /** 選択できるスナップショット日（新しい順）。2件以上あればUIに日付切替が出る */
  availableDates: string[];
  topCountries: CountryStat[];
  /** 11位以下のまとめ。該当なしなら null */
  otherCountries: { count: number; followers: number } | null;
  countryTotal: number;
  countryCount: number;
  ageGender: AgeGenderStat[];
  ageGenderTotal: number;
  followers: FollowerStat[];
  followerDate: string | null;
};

export const EMPTY_AUDIENCE: Audience = {
  snapshotDate: null,
  availableDates: [],
  topCountries: [],
  otherCountries: null,
  countryTotal: 0,
  countryCount: 0,
  ageGender: [],
  ageGenderTotal: 0,
  followers: [],
  followerDate: null,
};

/* ------------------------------------------------------------------ 国名 */

/**
 * ISO 3166-1 alpha-2 → 日本語の国・地域名。
 * 基本は Intl.DisplayNames に任せ、正式名称が長すぎるものだけ上書きする。
 * （US=「アメリカ合衆国」/ HK=「中華人民共和国香港特別行政区」など）
 */
const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  US: "アメリカ",
  HK: "香港",
  MO: "マカオ",
  GB: "イギリス",
  KR: "韓国",
  RU: "ロシア",
  AE: "UAE",
  VA: "バチカン",
};

let displayNames: Intl.DisplayNames | null | undefined;

export function countryName(code: string): string {
  const upper = code.toUpperCase();
  const override = COUNTRY_NAME_OVERRIDES[upper];
  if (override) return override;

  if (displayNames === undefined) {
    try {
      displayNames = new Intl.DisplayNames(["ja"], { type: "region" });
    } catch {
      displayNames = null;
    }
  }
  try {
    return displayNames?.of(upper) ?? upper;
  } catch {
    // 国コードとして不正な値（Intl が例外を投げる）はそのまま出す
    return upper;
  }
}

/* ------------------------------------------------------------ 表示ラベル */

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X",
  tiktok: "TikTok",
};

/** KPIカードの並び順（登録が増えても未知のプラットフォームは末尾に回る） */
const PLATFORM_ORDER = ["instagram", "youtube", "x", "tiktok"];

const TOP_COUNTRY_COUNT = 10;

/** 年齢層の並び順。数値の若い順に並べ、想定外の値は末尾へ */
function ageBracketRank(bracket: string): number {
  const head = Number.parseInt(bracket, 10);
  return Number.isFinite(head) ? head : Number.MAX_SAFE_INTEGER;
}

/* ------------------------------------------------------------ DB 行の型 */

type CountryRow = { snapshot_date: string; country_code: string; followers: number };
type AgeGenderRow = {
  snapshot_date: string;
  age_bracket: string;
  gender: string;
  followers: number;
};
type FollowerRow = { date: string; platform: string; followers: number };

/* ------------------------------------------------------------------ 取得 */

/**
 * 指定スナップショット日（省略時は最新）のオーディエンス内訳を取得する。
 * 取得に失敗しても例外は投げず、空のオーディエンスを返す（画面は「データなし」）。
 */
export async function getAudience(requestedDate?: string): Promise<Audience> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return EMPTY_AUDIENCE;

  // 選択可能な日付（国別を基準にする）
  const datesRes = await supabase
    .from("audience_countries")
    .select("snapshot_date")
    .order("snapshot_date", { ascending: false });

  if (datesRes.error) {
    console.error("[admin/audience] snapshot_date fetch failed:", datesRes.error.message);
    return EMPTY_AUDIENCE;
  }

  const availableDates = [
    ...new Set((datesRes.data ?? []).map((row) => (row as { snapshot_date: string }).snapshot_date)),
  ];

  const snapshotDate =
    requestedDate && availableDates.includes(requestedDate)
      ? requestedDate
      : (availableDates[0] ?? null);

  const [countryRes, ageRes, followerRes] = await Promise.all([
    snapshotDate
      ? supabase
          .from("audience_countries")
          .select("snapshot_date, country_code, followers")
          .eq("snapshot_date", snapshotDate)
      : Promise.resolve({ data: [], error: null }),
    // 年齢・性別は国別と同じ日付が無いこともあるので、その場合は自身の最新を使う
    supabase
      .from("audience_agegender")
      .select("snapshot_date, age_bracket, gender, followers")
      .order("snapshot_date", { ascending: false }),
    supabase
      .from("sns_followers")
      .select("date, platform, followers")
      .order("date", { ascending: false }),
  ]);

  for (const res of [countryRes, ageRes, followerRes]) {
    if (res.error) console.error("[admin/audience] fetch failed:", res.error.message);
  }

  /* ---- 国別 ---- */
  const countryRows = (countryRes.data ?? []) as CountryRow[];
  const countryTotal = countryRows.reduce((acc, row) => acc + row.followers, 0);
  const sortedCountries = [...countryRows].sort(
    (a, b) => b.followers - a.followers || a.country_code.localeCompare(b.country_code),
  );
  const topCountries: CountryStat[] = sortedCountries
    .slice(0, TOP_COUNTRY_COUNT)
    .map((row) => ({
      code: row.country_code.toUpperCase(),
      name: countryName(row.country_code),
      followers: row.followers,
      share: countryTotal > 0 ? row.followers / countryTotal : 0,
    }));
  const rest = sortedCountries.slice(TOP_COUNTRY_COUNT);
  const otherCountries =
    rest.length > 0
      ? { count: rest.length, followers: rest.reduce((acc, row) => acc + row.followers, 0) }
      : null;

  /* ---- 年齢・性別 ---- */
  const ageRows = (ageRes.data ?? []) as AgeGenderRow[];
  const ageDate = snapshotDate ?? ageRows[0]?.snapshot_date ?? null;
  const ageRowsForDate = ageRows.filter((row) => row.snapshot_date === ageDate);
  const ageMap = new Map<string, AgeGenderStat>();
  for (const row of ageRowsForDate) {
    const stat =
      ageMap.get(row.age_bracket) ??
      { ageBracket: row.age_bracket, male: 0, female: 0, unknown: 0, total: 0 };
    if (row.gender === "male") stat.male += row.followers;
    else if (row.gender === "female") stat.female += row.followers;
    else stat.unknown += row.followers;
    stat.total += row.followers;
    ageMap.set(row.age_bracket, stat);
  }
  const ageGender = [...ageMap.values()].sort(
    (a, b) => ageBracketRank(a.ageBracket) - ageBracketRank(b.ageBracket),
  );

  /* ---- フォロワー数 ---- */
  const followerRows = (followerRes.data ?? []) as FollowerRow[];
  const followerDate = followerRows[0]?.date ?? null;
  const followers: FollowerStat[] = followerRows
    .filter((row) => row.date === followerDate)
    .map((row) => ({
      platform: row.platform,
      label: PLATFORM_LABEL[row.platform] ?? row.platform,
      followers: row.followers,
    }))
    .sort((a, b) => {
      const ra = PLATFORM_ORDER.indexOf(a.platform);
      const rb = PLATFORM_ORDER.indexOf(b.platform);
      return (ra < 0 ? PLATFORM_ORDER.length : ra) - (rb < 0 ? PLATFORM_ORDER.length : rb);
    });

  return {
    snapshotDate,
    availableDates,
    topCountries,
    otherCountries,
    countryTotal,
    countryCount: countryRows.length,
    ageGender,
    ageGenderTotal: ageGender.reduce((acc, stat) => acc + stat.total, 0),
    followers,
    followerDate,
  };
}
