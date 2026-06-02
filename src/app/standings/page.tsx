import { getStandings } from "@/lib/standings";
import StandingsClient from "./StandingsClient";

export const revalidate = 0;

export default async function StandingsPage() {
  const standings = await getStandings();
  return <StandingsClient standings={standings} />;
}
