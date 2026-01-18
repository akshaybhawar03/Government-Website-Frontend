import { connectToDatabase } from "@/lib/mongoose";
import { Job } from "@/models/Job";

export async function markExpiredJobs(now: Date = new Date()) {
  await connectToDatabase();

  const result = await Job.updateMany(
    {
      isExpired: false,
      lastDate: { $type: "date", $lt: now },
    },
    {
      $set: { isExpired: true },
    }
  );

  return result.modifiedCount ?? 0;
}
