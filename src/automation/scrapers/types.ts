export type ScrapedJobType = "job" | "result" | "admit-card";

export type ScrapedJob = {
  type: ScrapedJobType;
  title: string;
  department: string;
  state: string;
  qualification: string;
  eligibility?: string;
  ageLimit?: string;
  vacancies?: string;
  salary?: string;
  fees?: string;
  startDate?: string;
  lastDate?: string;
  selectionProcess?: string;
  applyLink: string;
  notificationPDF?: string;
  sourceName: string;
  sourceUrl: string;
};
