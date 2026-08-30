import Link from "next/link";
import type { Audience } from "@/lib/audience";

/**
 * AUDIENCE — フォロワーの内訳（snapshot_date 時点の断面）。
 * 期間フィルターではなくスナップショット日で切り替える。日付が2件以上あれば
 * 見出し横に切替リンクが出る（現状は1件なので日付表示のみ）。
 */
const num = (value: number): string => value.toLocaleString("en-US");
const pct = (value: number): string => `${(value * 100).toFixed(1)}%`;

/** YYYY-MM-DD → YYYY.MM.DD */
const dotted = (date: string): string => date.replaceAll("-", ".");

/** KPIカード左端のアクセント色をプラットフォームごとに分ける */
const PLATFORM_ACCENT: Record<string, string> = {
  instagram: "var(--ig)",
  youtube: "var(--yt)",
};

const accent = (platform: string): React.CSSProperties =>
  ({ "--accent": PLATFORM_ACCENT[platform] ?? "var(--tie)" }) as React.CSSProperties;

function SnapshotPicker({
  audience,
  range,
}: {
  audience: Audience;
  range: string;
}) {
  if (audience.availableDates.length <= 1) {
    return (
      <span className="aud-date">
        {audience.snapshotDate ? dotted(audience.snapshotDate) : "—"} 時点
      </span>
    );
  }
  return (
    <span className="aud-dates">
      {audience.availableDates.map((date) => (
        <Link
          key={date}
          href={`/admin?range=${range}&snapshot=${date}`}
          className={date === audience.snapshotDate ? "on" : ""}
        >
          {dotted(date)}
        </Link>
      ))}
    </span>
  );
}

export default function AudienceSection({
  audience,
  range,
}: {
  audience: Audience;
  range: string;
}) {
  const hasAnything =
    audience.topCountries.length > 0 ||
    audience.ageGender.length > 0 ||
    audience.followers.length > 0;

  if (!hasAnything) {
    return <div className="empty">データなし</div>;
  }

  const countryMax = Math.max(1, ...audience.topCountries.map((c) => c.followers));
  const ageMax = Math.max(1, ...audience.ageGender.map((a) => a.total));

  return (
    <>
      <div className="aud-hd">
        <SnapshotPicker audience={audience} range={range} />
      </div>

      {audience.followers.length > 0 && (
        <div className="aud-kpis">
          {audience.followers.map((follower) => (
            <div className="kpi" key={follower.platform} style={accent(follower.platform)}>
              <div className="kpi-lbl">{follower.label} Followers</div>
              <div className="kpi-val">{num(follower.followers)}</div>
              <div className="kpi-sub">
                {audience.followerDate ? `${dotted(audience.followerDate)} 時点` : "—"}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="aud">
        <div className="aud-panel">
          <h3>国・地域 TOP10</h3>
          {audience.topCountries.length === 0 ? (
            <div className="empty">データなし</div>
          ) : (
            <>
              {audience.topCountries.map((country) => (
                <div className="ct-row" key={country.code}>
                  <span className="ct-name">
                    {country.name}
                    <small>{country.code}</small>
                  </span>
                  <span className="ct-val">
                    {num(country.followers)} ／ {pct(country.share)}
                  </span>
                  <span className="ct-track">
                    <span
                      className="ct-fill"
                      style={{ width: `${(country.followers / countryMax) * 100}%` }}
                    />
                  </span>
                </div>
              ))}
              <p className="aud-note">
                {audience.otherCountries
                  ? `その他 ${audience.otherCountries.count} カ国 ${num(audience.otherCountries.followers)} 人／全 ${audience.countryCount} カ国 合計 ${num(audience.countryTotal)} 人`
                  : `全 ${audience.countryCount} カ国 合計 ${num(audience.countryTotal)} 人`}
              </p>
            </>
          )}
        </div>

        <div className="aud-panel">
          <h3>年齢・性別</h3>
          {audience.ageGender.length === 0 ? (
            <div className="empty">データなし</div>
          ) : (
            <>
              <div className="legend ag-legend">
                <span>
                  <i className="sw" style={{ background: "var(--ig)" }} />
                  男性
                </span>
                <span>
                  <i className="sw" style={{ background: "var(--yt)" }} />
                  女性
                </span>
                <span>
                  <i className="sw" style={{ background: "var(--tie)" }} />
                  不明
                </span>
              </div>
              {audience.ageGender.map((row) => (
                <div className="ag-row" key={row.ageBracket}>
                  <span className="ag-name">{row.ageBracket}</span>
                  <span className="ag-track">
                    <span
                      className="ag-seg male"
                      style={{ width: `${(row.male / ageMax) * 100}%` }}
                      title={`男性 ${num(row.male)}`}
                    />
                    <span
                      className="ag-seg female"
                      style={{ width: `${(row.female / ageMax) * 100}%` }}
                      title={`女性 ${num(row.female)}`}
                    />
                    <span
                      className="ag-seg unknown"
                      style={{ width: `${(row.unknown / ageMax) * 100}%` }}
                      title={`不明 ${num(row.unknown)}`}
                    />
                  </span>
                  <span className="ag-val">{num(row.total)}</span>
                </div>
              ))}
              <p className="aud-note">合計 {num(audience.ageGenderTotal)} 人</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
