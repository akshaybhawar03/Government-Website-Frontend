import type { Browser } from "playwright";
import type { ScrapedJob } from "@/automation/scrapers/types";

const UPSC_BASE = "https://upsc.gov.in";

export async function scrapeUPSC(browser: Browser): Promise<ScrapedJob[]> {
  const page = await browser.newPage();

  try {
    await page.goto(UPSC_BASE, { waitUntil: "domcontentloaded", timeout: 45_000 });

    // TODO: Implement parsing logic for official UPSC advertisements/notifications.
    // Keep only official apply links and official PDF URLs.

    return [];
  } catch {
    return [];
  } finally {
    await page.close();
  }
}
