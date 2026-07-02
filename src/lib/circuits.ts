import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Circuit, CircuitSummary, CircuitWinner } from "@/lib/data";

/**
 * Supabase circuits / circuit_winners テーブルからサーキット図鑑を取得するデータアクセス層。
 * Server Component から直接 await して使う（anon key・読み取り専用）。
 * reviews.ts / schedules.ts と同じパターン。
 *
 * circuits カラム: slug, name_ja, name_en, gp_name_en, country, flag,
 *   length_km, laps, race_distance_km, corners, direction, first_gp,
 *   top_speed_kmh, top_speed_note, avg_speed_kmh, elevation_m,
 *   record_quali_time/driver/team/year, record_race_time/driver/team/year,
 *   character_ja, character_en, map_embed_key, created_at, updated_at
 * circuit_winners カラム: id, circuit_slug, year, driver, team
 */

/** DB の circuits 行 */
type CircuitRow = {
  slug: string;
  name_ja: string;
  name_en: string;
  gp_name_en: string;
  country: string;
  flag: string;
  length_km: number | null;
  laps: number | null;
  race_distance_km: number | null;
  corners: number | null;
  direction: string | null;
  first_gp: number | null;
  top_speed_kmh: number | null;
  top_speed_note: string | null;
  avg_speed_kmh: number | null;
  elevation_m: number | null;
  record_quali_time: string | null;
  record_quali_driver: string | null;
  record_quali_team: string | null;
  record_quali_year: number | null;
  record_race_time: string | null;
  record_race_driver: string | null;
  record_race_team: string | null;
  record_race_year: number | null;
  character_ja: string | null;
  character_en: string | null;
  map_embed_key: string | null;
};

/** DB の circuit_winners 行 */
type WinnerRow = {
  year: number;
  driver: string;
  team: string;
};

const CIRCUIT_COLUMNS =
  "slug, name_ja, name_en, gp_name_en, country, flag, length_km, laps, race_distance_km, corners, direction, first_gp, top_speed_kmh, top_speed_note, avg_speed_kmh, elevation_m, record_quali_time, record_quali_driver, record_quali_team, record_quali_year, record_race_time, record_race_driver, record_race_team, record_race_year, character_ja, character_en, map_embed_key";

/** null → undefined 変換ヘルパ（Circuit 型は optional） */
function nn<T>(v: T | null): T | undefined {
  return v ?? undefined;
}

/** DB 行 → Circuit 型に変換（winners は別引数で合成） */
function toCircuit(row: CircuitRow, winners: CircuitWinner[]): Circuit {
  return {
    slug: row.slug,
    nameJa: row.name_ja,
    nameEn: row.name_en,
    gpNameEn: row.gp_name_en,
    country: row.country,
    flag: row.flag,
    lengthKm: nn(row.length_km),
    laps: nn(row.laps),
    raceDistanceKm: nn(row.race_distance_km),
    corners: nn(row.corners),
    direction: nn(row.direction),
    firstGp: nn(row.first_gp),
    topSpeedKmh: nn(row.top_speed_kmh),
    topSpeedNote: nn(row.top_speed_note),
    avgSpeedKmh: nn(row.avg_speed_kmh),
    elevationM: nn(row.elevation_m),
    recordQualiTime: nn(row.record_quali_time),
    recordQualiDriver: nn(row.record_quali_driver),
    recordQualiTeam: nn(row.record_quali_team),
    recordQualiYear: nn(row.record_quali_year),
    recordRaceTime: nn(row.record_race_time),
    recordRaceDriver: nn(row.record_race_driver),
    recordRaceTeam: nn(row.record_race_team),
    recordRaceYear: nn(row.record_race_year),
    characterJa: nn(row.character_ja),
    characterEn: nn(row.character_en),
    mapEmbedKey: nn(row.map_embed_key),
    winners,
  };
}

/** 図鑑一覧を取得（name_ja 昇順・軽量サマリ） */
export const getCircuits = cache(async (): Promise<CircuitSummary[]> => {
  const { data, error } = await supabase
    .from("circuits")
    .select("slug, name_ja, name_en, gp_name_en, country, flag, length_km, corners, first_gp")
    .order("name_ja", { ascending: true });

  if (error) {
    console.error("[circuits] fetch failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => {
    const r = row as Pick<
      CircuitRow,
      "slug" | "name_ja" | "name_en" | "gp_name_en" | "country" | "flag" | "length_km" | "corners" | "first_gp"
    >;
    return {
      slug: r.slug,
      nameJa: r.name_ja,
      nameEn: r.name_en,
      gpNameEn: r.gp_name_en,
      country: r.country,
      flag: r.flag,
      lengthKm: nn(r.length_km),
      corners: nn(r.corners),
      firstGp: nn(r.first_gp),
    };
  });
});

/** slug 指定でサーキット1件を取得（歴代ウィナー込み・無ければ null） */
export const getCircuitBySlug = cache(
  async (slug: string): Promise<Circuit | null> => {
    if (!slug) return null;

    const { data: circuitData, error: circuitError } = await supabase
      .from("circuits")
      .select(CIRCUIT_COLUMNS)
      .eq("slug", slug)
      .maybeSingle();

    if (circuitError) {
      console.error("[circuits] getCircuitBySlug failed:", circuitError.message);
      return null;
    }
    if (!circuitData) return null;

    const { data: winnerData, error: winnerError } = await supabase
      .from("circuit_winners")
      .select("year, driver, team")
      .eq("circuit_slug", slug)
      .order("year", { ascending: false });

    if (winnerError) {
      console.error("[circuits] winners fetch failed:", winnerError.message);
    }

    const winners: CircuitWinner[] = (winnerData ?? []).map((w) => {
      const r = w as WinnerRow;
      return { year: r.year, driver: r.driver, team: r.team };
    });

    return toCircuit(circuitData as CircuitRow, winners);
  },
);
