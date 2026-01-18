import type { Browser } from "playwright";
import type { ScrapedJob } from "@/automation/scrapers/types";

// State PSC websites differ per state. Use placeholders and configure per-state as needed.
const EXAMPLE_STATE_PSC_URLS = [
  "https://mpsc.gov.in",
  "https://www.tnpsc.gov.in",
];

export async function scrapeStatePSCs(browser: Browser): Promise<ScrapedJob[]> {
  const out: ScrapedJob[] = [];

  for (const url of EXAMPLE_STATE_PSC_URLS) {
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });

      // TODO: Implement per-state extraction logic.
      // Ensure:
      // - sourceUrl is the official notice page
      // - applyLink is an official application link
      // - avoid any paid/republished content
    } catch {
      // ignore failures per source
    } finally {
      await page.close();
    }
  }

  return out;
}
