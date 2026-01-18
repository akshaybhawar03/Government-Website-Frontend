import { withBrowser } from "@/automation/scrapers/browser";
import { scrapeSSC } from "@/automation/scrapers/ssc";
import { scrapeUPSC } from "@/automation/scrapers/upsc";
import { scrapeRailway } from "@/automation/scrapers/railway";
import { scrapeStatePSCs } from "@/automation/scrapers/statePsc";
import type { ScrapedJob } from "@/automation/scrapers/types";
import { connectToDatabase } from "@/lib/mongoose";
import { Job } from "@/models/Job";
import { markExpiredJobs } from "@/lib/jobMaintenance";

function toDate(input?: string) {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

export type DailyRunResult = {
  inserted: number;
  duplicates: number;
  expiredMarked: number;
  totalScraped: number;
};

// Daily automation flow:
// 1) Scrape official sources (public data only)
// 2) Insert new jobs while avoiding duplicates
//    - de-dup is enforced by MongoDB unique index on source.url
// 3) Mark jobs as expired based on lastDate
export async function runDailyAutomation(): Promise<DailyRunResult> {
  await connectToDatabase();

  const allScraped: ScrapedJob[] = await withBrowser(async (browser) => {
    const [ssc, upsc, railway, statePsc] = await Promise.all([
      scrapeSSC(browser),
      scrapeUPSC(browser),
      scrapeRailway(browser),
      scrapeStatePSCs(browser),
    ]);

    return [...ssc, ...upsc, ...railway, ...statePsc];
  });

  let inserted = 0;
  let duplicates = 0;

  for (const s of allScraped) {
    try {
      await Job.create({
        type: s.type,
        title: s.title,
        department: s.department,
        state: s.state,
        qualification: s.qualification,
        eligibility: s.eligibility,
        ageLimit: s.ageLimit,
        vacancies: s.vacancies,
        salary: s.salary,
        fees: s.fees,
        startDate: toDate(s.startDate),
        lastDate: toDate(s.lastDate),
        selectionProcess: s.selectionProcess,
        applyLink: s.applyLink,
        notificationPDF: s.notificationPDF,
        source: { name: s.sourceName, url: s.sourceUrl },
        isExpired: false,
      });
      inserted += 1;
    } catch (e: any) {
      if (e?.code === 11000) {
        duplicates += 1;
        continue;
      }
      // If one record fails, continue with the rest.
    }
  }

  const expiredMarked = await markExpiredJobs(new Date());

  return {
    inserted,
    duplicates,
    expiredMarked,
    totalScraped: allScraped.length,
  };
}
