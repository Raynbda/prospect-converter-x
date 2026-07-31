import type { ReactNode } from "react";

export const SCORECARD_URL = "#scorecard";

export function Cta({
  label = "Start the free scorecard",
  size = "lg",
}: {
  label?: string;
  size?: "lg" | "md";
}) {
  return (
    <a
      href={SCORECARD_URL}
      className={`inline-flex items-center justify-center rounded-lg bg-brand font-medium text-brand-foreground shadow-[0_10px_30px_-12px_var(--brand)] transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
      }`}
    >
      {label}
    </a>
  );
}

export function CtaBadges() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
      {["Takes 3 minutes", "Completely free", "No card needed", "Instant results"].map((b) => (
        <li key={b} className="flex items-center gap-2">
          <span aria-hidden className="text-brand">
            ✓
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export function Section({
  children,
  tinted = false,
  id,
}: {
  children: ReactNode;
  tinted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={tinted ? "bg-surface" : "bg-background"}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-brand">{children}</p>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] text-ink md:text-[2.6rem]">
      {children}
    </h2>
  );
}