import { Container } from "@/components/Container";

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-200/70 bg-linear-to-b from-white to-slate-50 py-10">
      <Container>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle ? <p className="max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p> : null}
        </div>
      </Container>
    </div>
  );
}
