import { z } from "zod";

function emptyToUndefined(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function normalizeUrl(value: unknown) {
  const maybe = emptyToUndefined(value);
  if (typeof maybe !== "string") return maybe;

  try {
    new URL(maybe);
    return maybe;
  } catch {
    // If user provided a host like "my-app.vercel.app", treat it as https.
    try {
      const withScheme = `https://${maybe}`;
      new URL(withScheme);
      return withScheme;
    } catch {
      return maybe;
    }
  }
}

const envSchema = z.object({
  BACKEND_URL: z.preprocess(emptyToUndefined, z.string().url().optional()).default("http://localhost:4000"),
  NEXT_PUBLIC_SITE_NAME: z.string().optional().default("Indian Government Jobs Portal"),
  NEXT_PUBLIC_SITE_URL: z.preprocess(normalizeUrl, z.string().url().optional()).default("http://localhost:3000"),
  NEXT_PUBLIC_CONTACT_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
