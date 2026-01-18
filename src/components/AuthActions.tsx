"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type MeResponse =
  | { authenticated: false }
  | {
      authenticated: true;
      user: {
        sub: string;
        name?: string;
        email: string;
        role: "user" | "admin";
      };
    };

export function AuthActions({ variant, onNavigate }: { variant: "desktop" | "mobile"; onNavigate?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [me, setMe] = useState<MeResponse | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: MeResponse) => {
        if (!alive) return;
        setMe(data);
      })
      .catch(() => {
        if (!alive) return;
        setMe({ authenticated: false });
      });

    return () => {
      alive = false;
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!menuOpen) return;
      const el = menuRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setMenuOpen(false);
    }

    function onDocKeyDown(e: KeyboardEvent) {
      if (!menuOpen) return;
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [menuOpen]);

  const isAuthed = me?.authenticated === true;
  const role = isAuthed ? me.user.role : null;

  const initials = useMemo(() => {
    if (!isAuthed) return "";
    const raw = (me.user.name || "").trim();
    const fromEmail = me.user.email?.split("@")[0]?.trim() || "";
    const base = raw || fromEmail;
    if (!base) return "";
    const parts = base.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase();
    }
    const word = parts[0];
    return (word.slice(0, 2) || "").toUpperCase();
  }, [isAuthed, me]);

  const cls = useMemo(() => {
    if (variant === "desktop") {
      return {
        wrap: "hidden items-center gap-2 md:flex",
        primary:
          "inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800",
        secondary:
          "inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50",
      };
    }

    return {
      wrap: "grid gap-2",
      primary:
        "inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800",
      secondary:
        "inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50",
    };
  }, [variant]);

  function onMenuNavigate() {
    setMenuOpen(false);
    onNavigate?.();
  }

  async function logout() {
    setLoggingOut(true);
    setMenuOpen(false);
    setMe({ authenticated: false });
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    onNavigate?.();
    router.refresh();
    router.push("/");
    setLoggingOut(false);
  }

  if (me === null) {
    return <div className={cls.wrap} />;
  }

  if (!isAuthed) {
    return (
      <div className={cls.wrap}>
        <Link href="/login" onClick={onNavigate} className={cls.secondary}>
          Login
        </Link>
        <Link href="/register" onClick={onNavigate} className={cls.primary}>
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className={cls.wrap}>
      {role === "admin" ? (
        <Link href="/admin" onClick={onNavigate} className={cls.secondary}>
          Admin
        </Link>
      ) : null}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          disabled={loggingOut}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className={
            variant === "desktop"
              ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
              : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
          }
        >
          {loggingOut ? "..." : initials || "U"}
        </button>

        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1 text-sm text-slate-800 shadow-sm"
          >
            <Link
              href="/saved-jobs"
              role="menuitem"
              onClick={onMenuNavigate}
              className="block w-full rounded-xl px-3 py-2 text-left font-semibold text-slate-800 hover:bg-slate-50"
            >
              Saved Jobs
            </Link>
            <Link
              href="/job-alerts"
              role="menuitem"
              onClick={onMenuNavigate}
              className="block w-full rounded-xl px-3 py-2 text-left font-semibold text-slate-800 hover:bg-slate-50"
            >
              Job Alerts
            </Link>
            <Link
              href="/application-guide"
              role="menuitem"
              onClick={onMenuNavigate}
              className="block w-full rounded-xl px-3 py-2 text-left font-semibold text-slate-800 hover:bg-slate-50"
            >
              Application Guide
            </Link>
            <div className="my-1 h-px bg-slate-200" />
            <button
              type="button"
              disabled
              role="menuitem"
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-semibold text-slate-400"
            >
              Profile
              <span className="text-[10px] font-bold">Soon</span>
            </button>
            <button
              type="button"
              disabled
              role="menuitem"
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-semibold text-slate-400"
            >
              Settings
              <span className="text-[10px] font-bold">Soon</span>
            </button>
            <div className="my-1 h-px bg-slate-200" />
            <button
              type="button"
              role="menuitem"
              onClick={logout}
              disabled={loggingOut}
              className="w-full rounded-xl px-3 py-2 text-left font-bold text-slate-900 hover:bg-slate-50"
            >
              {loggingOut ? "Please wait..." : "Logout"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
