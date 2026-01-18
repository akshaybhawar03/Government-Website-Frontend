type Row = {
  label: string;
  value?: string | null;
};

export function KeyValueTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-slate-200/70 first:border-t-0">
              <td className="w-44 bg-slate-50 px-4 py-3 font-semibold text-slate-900 md:w-56">
                {row.label}
              </td>
              <td className="px-4 py-3 text-slate-800">{row.value && row.value.trim() ? row.value : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
