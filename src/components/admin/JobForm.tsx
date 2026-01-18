"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type JobType = "job" | "result" | "admit-card";

export type JobFormValue = {
  type: JobType;
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
  isExpired?: boolean;
};

function clean(v?: string) {
  return (v ?? "").trim();
}

export function JobForm({
  mode,
  id,
  initial,
}: {
  mode: "create" | "edit";
  id?: string;
  initial?: Partial<JobFormValue>;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaults = useMemo<JobFormValue>(
    () => ({
      type: (initial?.type as JobType) ?? "job",
      title: clean(initial?.title),
      department: clean(initial?.department),
      state: clean(initial?.state),
      qualification: clean(initial?.qualification),
      eligibility: clean(initial?.eligibility),
      ageLimit: clean(initial?.ageLimit),
      vacancies: clean(initial?.vacancies),
      salary: clean(initial?.salary),
      fees: clean(initial?.fees),
      startDate: clean(initial?.startDate),
      lastDate: clean(initial?.lastDate),
      selectionProcess: clean(initial?.selectionProcess),
      applyLink: clean(initial?.applyLink),
      notificationPDF: clean(initial?.notificationPDF),
      sourceName: clean(initial?.sourceName) || "Official Source",
      sourceUrl: clean(initial?.sourceUrl),
      isExpired: Boolean(initial?.isExpired ?? false),
    }),
    [initial]
  );

  const [value, setValue] = useState<JobFormValue>(defaults);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: any = {
      type: value.type,
      title: value.title,
      department: value.department,
      state: value.state,
      qualification: value.qualification,
      eligibility: value.eligibility || undefined,
      ageLimit: value.ageLimit || undefined,
      vacancies: value.vacancies || undefined,
      salary: value.salary || undefined,
      fees: value.fees || undefined,
      startDate: value.startDate || undefined,
      lastDate: value.lastDate || undefined,
      selectionProcess: value.selectionProcess || undefined,
      applyLink: value.applyLink,
      notificationPDF: value.notificationPDF || undefined,
      source: {
        name: value.sourceName,
        url: value.sourceUrl,
      },
      isExpired: value.isExpired,
    };

    const url = mode === "create" ? "/api/admin/jobs" : `/api/admin/jobs/${id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setSaving(false);
      setError(data?.error || "Failed to save");
      return;
    }

    if (mode === "create") {
      router.push(`/jobs/${data.slug}`);
    } else {
      router.push("/admin/jobs");
    }

    router.refresh();
  }

  return (
    <form onSubmit={submit} className="border border-zinc-200 bg-white p-4">
      {error ? <div className="mb-3 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Type</span>
          <select
            value={value.type}
            onChange={(e) => setValue((v) => ({ ...v, type: e.target.value as JobType }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
          >
            <option value="job">Job</option>
            <option value="result">Result</option>
            <option value="admit-card">Admit Card</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Title</span>
          <input
            required
            value={value.title}
            onChange={(e) => setValue((v) => ({ ...v, title: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. SSC CGL 2026"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Department</span>
          <input
            required
            value={value.department}
            onChange={(e) => setValue((v) => ({ ...v, department: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. SSC"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">State</span>
          <input
            required
            value={value.state}
            onChange={(e) => setValue((v) => ({ ...v, state: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. All India / Maharashtra"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Qualification</span>
          <input
            required
            value={value.qualification}
            onChange={(e) => setValue((v) => ({ ...v, qualification: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. Graduate"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Eligibility</span>
          <input
            value={value.eligibility}
            onChange={(e) => setValue((v) => ({ ...v, eligibility: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. Any Graduate with ..."
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Age Limit</span>
          <input
            value={value.ageLimit}
            onChange={(e) => setValue((v) => ({ ...v, ageLimit: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. 18-27 years"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Vacancies</span>
          <input
            value={value.vacancies}
            onChange={(e) => setValue((v) => ({ ...v, vacancies: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. 5000"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Salary</span>
          <input
            value={value.salary}
            onChange={(e) => setValue((v) => ({ ...v, salary: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. Level-6"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Application Fee</span>
          <input
            value={value.fees}
            onChange={(e) => setValue((v) => ({ ...v, fees: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. General: 100, SC/ST: 0"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Start Date</span>
          <input
            type="date"
            value={value.startDate}
            onChange={(e) => setValue((v) => ({ ...v, startDate: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Last Date</span>
          <input
            type="date"
            value={value.lastDate}
            onChange={(e) => setValue((v) => ({ ...v, lastDate: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
          />
        </label>

        <label className="text-sm md:col-span-2">
          <span className="block font-semibold text-zinc-900">Selection Process</span>
          <input
            value={value.selectionProcess}
            onChange={(e) => setValue((v) => ({ ...v, selectionProcess: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. CBT + Interview"
          />
        </label>

        <label className="text-sm md:col-span-2">
          <span className="block font-semibold text-zinc-900">Official Apply Link</span>
          <input
            required
            type="url"
            value={value.applyLink}
            onChange={(e) => setValue((v) => ({ ...v, applyLink: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="https://..."
          />
        </label>

        <label className="text-sm md:col-span-2">
          <span className="block font-semibold text-zinc-900">Notification PDF (optional)</span>
          <input
            type="url"
            value={value.notificationPDF}
            onChange={(e) => setValue((v) => ({ ...v, notificationPDF: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="https://..."
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Source Name</span>
          <input
            required
            value={value.sourceName}
            onChange={(e) => setValue((v) => ({ ...v, sourceName: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="e.g. SSC"
          />
        </label>

        <label className="text-sm">
          <span className="block font-semibold text-zinc-900">Source URL</span>
          <input
            required
            type="url"
            value={value.sourceUrl}
            onChange={(e) => setValue((v) => ({ ...v, sourceUrl: e.target.value }))}
            className="mt-1 h-10 w-full border border-zinc-300 px-3"
            placeholder="https://official-site/..."
          />
        </label>

        {mode === "edit" ? (
          <label className="text-sm md:col-span-2">
            <span className="block font-semibold text-zinc-900">Status</span>
            <select
              value={value.isExpired ? "expired" : "active"}
              onChange={(e) => setValue((v) => ({ ...v, isExpired: e.target.value === "expired" }))}
              className="mt-1 h-10 w-full border border-zinc-300 px-3"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </label>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center justify-center bg-zinc-900 px-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() => router.back()}
          className="inline-flex h-10 items-center justify-center border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
