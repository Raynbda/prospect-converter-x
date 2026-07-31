import heroImage from "@/assets/waste-report.jpg";
import { Cta, CtaBadges } from "./shared";

export function Hero() {
  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Workflow<span className="text-brand">Audit</span>
        </span>
        <Cta label="Start the scorecard" size="md" />
      </nav>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-10 md:pb-28 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-accent-foreground">
            Free 15-question workflow scorecard
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] text-ink md:text-6xl">
            Are you ready to cut 10+ hours of wasted time out of your work week?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Answer 15 questions in 3 minutes and get a personalised breakdown of exactly where your
            workflow leaks time — plus the first three fixes to make, in the order to make them.
          </p>
          <div className="mt-9 flex flex-col gap-5">
            <div>
              <Cta />
            </div>
            <CtaBadges />
          </div>
          <p className="mt-8 border-l-2 border-brand pl-4 text-sm text-muted-foreground">
            Built by someone who has spent 3+ years producing YouTube videos entirely on Windows and
            tested 100+ productivity apps to find the handful that actually save time.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl bg-brand-soft"
          />
          <img
            src={heroImage}
            alt="Personalised workflow waste report showing a score gauge and hours saved before and after"
            width={1280}
            height={960}
            className="relative w-full rounded-xl border border-border shadow-[0_30px_70px_-40px_var(--ink)]"
          />
        </div>
      </div>
    </header>
  );
}