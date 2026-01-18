"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type MessageKind = "success" | "info";

type Flash = {
  kind: MessageKind;
  text: string;
};

export function FlashMessage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const msg = searchParams.get("msg");

  const flash = useMemo<Flash | null>(() => {
    if (msg === "account_created") return { kind: "success", text: "Account created successfully" };
    if (msg === "welcome") return { kind: "info", text: "Welcome back" };
    return null;
  }, [msg]);

  const [open, setOpen] = useState(true);

  if (!flash || !open) return null;

  const wrapperClass =
    flash.kind === "success"
      ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
      : "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900";

  function clear() {
    setOpen(false);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("msg");

    const next = newParams.toString();
    router.replace(next ? `${pathname}?${next}` : pathname);
  }

  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold">{flash.text}</div>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100"
          aria-label="Dismiss"
        >
          Close
        </button>
      </div>
    </div>
  );
}
