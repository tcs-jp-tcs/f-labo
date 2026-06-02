import { getSchedules } from "@/lib/schedules";
import { getThisWeekendBroadcasts } from "@/lib/broadcasts";
import ScheduleClient from "./ScheduleClient";

export const revalidate = 0;

export default async function SchedulePage() {
  const [schedules, broadcasts] = await Promise.all([
    getSchedules(),
    getThisWeekendBroadcasts(),
  ]);

  return <ScheduleClient schedules={schedules} broadcasts={broadcasts} />;
}
