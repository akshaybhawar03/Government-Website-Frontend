import Link from "next/link";

function buildHref(basePath: string, query: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v && v.trim()) params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  query: Record<string, string | undefined>;
};

export function Pagination({ basePath, page, totalPages, query }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-900/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-700">
        Page <span className="font-extrabold text-slate-900">{page}</span> of{" "}
        <span className="font-extrabold text-slate-900">{totalPages}</span>
      </div>
      <div className="flex gap-2">
        {prevPage ? (
          <Link
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
            href={buildHref(basePath, { ...query, page: String(prevPage) })}
          >
            Prev
          </Link>
        ) : (
          <span className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-400">
            Prev
          </span>
        )}
        {nextPage ? (
          <Link
            className="inline-flex h-10 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            href={buildHref(basePath, { ...query, page: String(nextPage) })}
          >
            Next
          </Link>
        ) : (
          <span className="inline-flex h-10 items-center justify-center rounded-xl bg-orange-200 px-4 text-sm font-bold text-white/80">
            Next
          </span>
        )}
      </div>
    </div>
  );
}
