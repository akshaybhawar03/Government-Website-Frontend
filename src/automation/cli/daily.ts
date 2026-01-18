import { runDailyAutomation } from "@/automation/runDaily";

async function main() {
  const result = await runDailyAutomation();
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ ok: true, ...result }, null, 2));
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exitCode = 1;
});
