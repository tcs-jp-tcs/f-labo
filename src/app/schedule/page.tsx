import {
  getSchedules,
  selectWeekendItems,
  scheduleItemToWeekendBroadcast,
} from "@/lib/schedules";
import ScheduleClient from "./ScheduleClient";

export const revalidate = 0;

export default async function SchedulePage() {
  const schedules = await getSchedules();
  // 「今週末の放送予定」も schedules の is_weekend を単一ソースに（旧 weekend_broadcasts 廃止）。
  const broadcasts = selectWeekendItems(schedules).map(
    scheduleItemToWeekendBroadcast,
  );

  return <ScheduleClient schedules={schedules} broadcasts={broadcasts} />;
}
