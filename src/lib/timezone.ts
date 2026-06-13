/**
 * 時刻変換ユーティリティ（フェーズ2-2 地域時間対応）。
 * startUtc（ISO8601 UTCの瞬間）を IANA TZ 名で各地域の壁時計へ変換する。
 * サマータイム（DST）は IANA TZ + Intl が自動判定するため、固定オフセットは一切使わない。
 */

/** startUtc を指定TZの「M/D (曜) / HH:MM」に整形。無効値は null。 */
export function formatClock(
  startUtc: string,
  tz: string,
): { date: string; time: string } | null {
  const d = new Date(startUtc);
  if (Number.isNaN(d.getTime())) return null;
  try {
    const parts = new Intl.DateTimeFormat("ja-JP", {
      timeZone: tz,
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(d);
    const get = (t: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === t)?.value ?? "";
    const month = get("month");
    const day = get("day");
    const weekday = get("weekday");
    let hour = get("hour");
    const minute = get("minute");
    // ja-JP / hour12:false は環境により深夜0時を "24" と返すことがあるため正規化
    if (hour === "24") hour = "00";
    return { date: `${month}/${day} (${weekday})`, time: `${hour}:${minute}` };
  } catch {
    return null;
  }
}

/**
 * 主要地域の IANA TZ → 日本語地域名。
 * 海外SNS流入の主対象＋F1開催国を厳選。未マップは IANA 都市名にフォールバック
 * （時刻自体は常に正しく、ラベルが地名表記になるだけ）。
 */
const REGION_LABELS: Record<string, string> = {
  "Asia/Tokyo": "日本",
  "Asia/Kolkata": "インド",
  "Asia/Calcutta": "インド",
  "Asia/Shanghai": "中国",
  "Asia/Seoul": "韓国",
  "Asia/Taipei": "台湾",
  "Asia/Hong_Kong": "香港",
  "Asia/Singapore": "シンガポール",
  "Asia/Bangkok": "タイ",
  "Asia/Jakarta": "インドネシア",
  "Asia/Manila": "フィリピン",
  "Asia/Kuala_Lumpur": "マレーシア",
  "Asia/Dubai": "UAE",
  "Europe/London": "イギリス",
  "Europe/Paris": "フランス",
  "Europe/Berlin": "ドイツ",
  "Europe/Madrid": "スペイン",
  "Europe/Rome": "イタリア",
  "Europe/Amsterdam": "オランダ",
  "Europe/Monaco": "モナコ",
  "America/New_York": "アメリカ東部",
  "America/Detroit": "アメリカ東部",
  "America/Toronto": "カナダ東部",
  "America/Chicago": "アメリカ中部",
  "America/Denver": "アメリカ山岳部",
  "America/Los_Angeles": "アメリカ西部",
  "America/Sao_Paulo": "ブラジル",
  "Australia/Sydney": "オーストラリア東部",
};

/** IANA TZ → 表示用地域名（未マップは都市名フォールバック）。 */
export function tzRegion(tz: string): string {
  if (REGION_LABELS[tz]) return REGION_LABELS[tz];
  const city = tz.split("/").pop() ?? tz;
  return city.replace(/_/g, " ");
}

/**
 * 略称の上書き（DSTの無い地域のみ）。一部の ICU は Asia/Tokyo を "GMT+9"、
 * Asia/Kolkata を "GMT+5:30" と返すため、要件で明示された「JST」「IST」等を全環境で保証する。
 * DSTのある地域（米・欧）は季節で略称が変わるので上書きせず Intl に委ねる（EDT/CEST 等を正しく返す）。
 */
const ABBR_OVERRIDES: Record<string, string> = {
  "Asia/Tokyo": "JST",
  "Asia/Kolkata": "IST",
  "Asia/Calcutta": "IST",
  "Asia/Seoul": "KST",
};

/** 指定TZ・指定日時点の略称（例 "JST"）。取得不能なら空文字。 */
export function tzAbbr(tz: string, ref: Date): string {
  if (ABBR_OVERRIDES[tz]) return ABBR_OVERRIDES[tz];
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
      hour: "2-digit",
    }).formatToParts(ref);
    const v = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    // "GMT+9" のようなオフセット表記はラベルとして冗長なので地域名のみに任せる
    return /^GMT/i.test(v) ? "" : v;
  } catch {
    return "";
  }
}

/**
 * 「日本 (JST)」形式のラベルを返す。略称が取れない地域は地域名のみ。
 * ref はDST判定の基準日（そのセッションの startUtc を渡す）。
 */
export function tzLabel(tz: string, ref: Date): string {
  const region = tzRegion(tz);
  const abbr = tzAbbr(tz, ref);
  return abbr ? `${region} (${abbr})` : region;
}

/** 地域設定ピッカーの主要地域候補（IANA + 日本語ラベル）。検索は allTimeZones で全TZへ拡張。 */
export const TZ_OPTIONS: { iana: string; label: string }[] = [
  { iana: "Asia/Tokyo", label: "日本" },
  { iana: "Asia/Seoul", label: "韓国" },
  { iana: "Asia/Shanghai", label: "中国" },
  { iana: "Asia/Taipei", label: "台湾" },
  { iana: "Asia/Hong_Kong", label: "香港" },
  { iana: "Asia/Singapore", label: "シンガポール" },
  { iana: "Asia/Bangkok", label: "タイ" },
  { iana: "Asia/Jakarta", label: "インドネシア" },
  { iana: "Asia/Manila", label: "フィリピン" },
  { iana: "Asia/Kuala_Lumpur", label: "マレーシア" },
  { iana: "Asia/Kolkata", label: "インド" },
  { iana: "Asia/Dubai", label: "UAE" },
  { iana: "Europe/London", label: "イギリス" },
  { iana: "Europe/Paris", label: "フランス" },
  { iana: "Europe/Berlin", label: "ドイツ" },
  { iana: "Europe/Madrid", label: "スペイン" },
  { iana: "Europe/Rome", label: "イタリア" },
  { iana: "Europe/Amsterdam", label: "オランダ" },
  { iana: "Europe/Monaco", label: "モナコ" },
  { iana: "America/New_York", label: "アメリカ東部" },
  { iana: "America/Chicago", label: "アメリカ中部" },
  { iana: "America/Denver", label: "アメリカ山岳部" },
  { iana: "America/Los_Angeles", label: "アメリカ西部" },
  { iana: "America/Toronto", label: "カナダ東部" },
  { iana: "America/Sao_Paulo", label: "ブラジル" },
  { iana: "Australia/Sydney", label: "オーストラリア東部" },
];

/** 検索用の全IANA TZ。supportedValuesOf 非対応環境では主要候補にフォールバック。 */
export function allTimeZones(): string[] {
  try {
    const f = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] })
      .supportedValuesOf;
    if (typeof f === "function") return f("timeZone");
  } catch {
    /* 非対応環境は無視 */
  }
  return TZ_OPTIONS.map((o) => o.iana);
}
