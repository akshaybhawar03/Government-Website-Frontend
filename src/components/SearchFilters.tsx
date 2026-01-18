import { Container } from "@/components/Container";

type SearchFiltersProps = {
  q?: string;
  state?: string;
  qualification?: string;
  department?: string;
  action: string;
};

export function SearchFilters({ q, state, qualification, department, action }: SearchFiltersProps) {
  return (
    <div className="border-y border-slate-200/70 bg-white/70 backdrop-blur">
      <Container>
        <form action={action} className="py-5">
          <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-900/5">
            <div className="grid gap-3 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-700">Search</label>
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search job title, department, state..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">State</label>
                <input
                  name="state"
                  defaultValue={state}
                  placeholder="e.g. Maharashtra"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Qualification</label>
                <input
                  name="qualification"
                  defaultValue={qualification}
                  placeholder="e.g. Graduate"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Department</label>
                <input
                  name="department"
                  defaultValue={department}
                  placeholder="e.g. SSC"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <div className="md:col-span-4">
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                >
                  Search Vacancies
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-600">
              Tip: Use Department for UPSC/SSC/Banking/Railway. Always verify details via official links.
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
}
