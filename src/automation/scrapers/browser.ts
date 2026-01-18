import { chromium, type Browser } from "playwright";

export async function withBrowser<T>(fn: (browser: Browser) => Promise<T>) {
  const browser = await chromium.launch({ headless: true });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}
