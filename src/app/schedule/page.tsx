import { getSchedules } from "@/lib/schedules";
import ScheduleClient from "./ScheduleClient";

export const revalidate = 0;

export default async function SchedulePage() {
  const schedules = await getSchedules();

  return <ScheduleClient schedules={schedules} />;
}
