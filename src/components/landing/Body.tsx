import { Eyebrow, H2, Section } from "./shared";

const pillars = [
  {
    title: "Time lost to context switching",
    body: "Every jump between apps, tabs and half-finished tasks costs you minutes you never see on a clock. We count them.",
  },
  {
    title: "Friction in your file and tool setup",
    body: "Scattered folders, unnamed exports, a Notion that has become a junk drawer. We map where you hesitate.",
  },
  {
    title: "Repetitive work that should be automated",
    body: "The same clicks, the same exports, the same setup every project. We find what a script or template can absorb.",
  },
];

const frustrations = [
  "You finish a project and cannot find the file you made two days ago",
  "You have 40 tabs open and none of them are the one you need",
  "You redo the same setup steps at the start of every single project",
  "Notifications pull you out of the only two good focus hours you get",
  "You save great ideas and articles and never act on a single one",
  "You know your tools can do more, you just never found out what",
];

const dimensions = [
  {
    n: "01",
    title: "Where your hours actually go",
    body: "Deep work versus shallow work, mapped in 15-minute increments across one real project.",
  },
  {
    n: "02",
    title: "Which task types eat you alive",
    body: "Small recurring admin, medium editing and research, and the focus-heavy work that pays.",
  },
  {
    n: "03",
    title: "How heavy your decision load is",
    body: "How often you pause, hesitate or re-pick priorities instead of executing on autopilot.",
  },
  {
    n: "04",
    title: "How much friction your setup creates",
    body: "Desktop chaos, unclear folder paths, open windows, and the multi-app shuffle between them.",
  },
  {
    n: "05",
    title: "When your energy peaks and crashes",
    body: "So the hard work lands in your sharpest hours and the busywork lands in the flat ones.",
  },
];

const blueprint = [
  "A daily schedule laid out by task type, not by wishful thinking",
  "Your deep work block and your batched shallow block, with exact times",
  "The automations, scripts and shortcuts worth building for your specific tools",
  "A focus environment setup: what to open, what to close, what to mute",
  "A weekly review checklist so the system survives past week one",
  "Templates and checklists for the deliverables you repeat most",
];

const steps = [
  {
    n: "1",
    title: "Take the 3-minute scorecard",
    body: "Fifteen questions about how you actually work. You get your score and your top leaks immediately.",
  },
  {
    n: "2",
    title: "Send one real project recording",
    body: "Start to finish, one video, one album, one report. Distractions included — that is the useful part.",
  },
  {
    n: "3",
    title: "Get your game plan on a call",
    body: "A step-by-step plan tailored to your workflow and the exact tools you already use.",
  },
];

export function ValueProp() {
  return (
    <Section tinted>
      <Eyebrow>Why take it</Eyebrow>
      <H2>The scorecard measures and improves three things that decide your output</H2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-7">
            <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Problem() {
  return (
    <Section>
      <Eyebrow>Sound familiar</Eyebrow>
      <H2>You are not slow. Your setup is quietly stealing an hour a day from you.</H2>
      <ul className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
        {frustrations.map((f) => (
          <li key={f} className="flex gap-3 border-b border-border pb-5 text-muted-foreground">
            <span aria-hidden className="mt-0.5 text-brand">
              →
            </span>
            <span className="text-[1.05rem] leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Measures() {
  return (
    <Section tinted>
      <Eyebrow>The audit</Eyebrow>
      <H2>Five dimensions of your work, measured instead of guessed</H2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((d) => (
          <div key={d.n} className="bg-card p-7">
            <span className="font-display text-sm font-bold text-brand">{d.n}</span>
            <h3 className="mt-3 text-lg font-semibold text-ink">{d.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{d.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Blueprint() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <Eyebrow>What you get back</Eyebrow>
          <H2>You walk away with a personal productivity blueprint, not a list of tips</H2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            One document that tells you what to do, when to do it, and how to set your machine up so
            the day runs itself.
          </p>
        </div>
        <ul className="space-y-4">
          {blueprint.map((b) => (
            <li
              key={b}
              className="flex gap-4 rounded-lg border border-border bg-card px-6 py-5 text-[1.02rem] leading-relaxed text-ink"
            >
              <span aria-hidden className="text-brand">
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Steps() {
  return (
    <Section tinted>
      <Eyebrow>How it works</Eyebrow>
      <H2>Three steps, and the first one takes three minutes</H2>
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="rounded-xl border border-border bg-card p-7">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-brand-foreground">
              {s.n}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-[0.975rem] leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}