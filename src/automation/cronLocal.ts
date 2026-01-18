import cron from "node-cron";
import { runDailyAutomation } from "@/automation/runDaily";

async function runOnce() {
  const result = await runDailyAutomation();
  // eslint-disable-next-line no-console
  console.log("[cron] daily run", result);
}

// Runs immediately and then schedules daily at 00:00 (server local time).
runOnce().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
});

cron.schedule("0 0 * * *", async () => {
  try {
    await runOnce();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[cron] failed", e);
  }
});
