import { Cta, CtaBadges, Eyebrow, H2, Section } from "./shared";

const tiers = [
  {
    price: "$150",
    name: "Screen recording review",
    body: "You send recordings of one full project. I map your time in 15-minute increments and come back with a written report split into tweaks to apply, apps to install, shortcuts to use and tools to try.",
  },
  {
    price: "$250",
    name: "1:1 implementation call",
    body: "The review, plus a live call where I design your experiments, build your templates and walk you through executing the plan step by step on your own machine.",
    featured: true,
  },
  {
    price: "$779",
    name: "Done for you",
    body: "I build the system with you: SOPs, file structure, Notion rebuild, keyboard shortcut sheets, AutoHotkey and PowerShell automations, app presets, delivered as short phased steps over three weeks.",
  },
];

const proof = [
  "3+ years producing YouTube videos entirely on a Windows machine",
  "100+ productivity apps and tools used, broken and replaced in real work",
  "A workflow built from scratch, not copied from a listicle",
  "Deep in the Windows tooling space: I know what is possible and what is a dead end",
];

const faqs = [
  {
    q: "What exactly do I need to record?",
    a: "One real project from the first click to the final deliverable. Include the parts where you get distracted and check social media — hide private information, but leave the mess in. That is where the diagnosis lives.",
  },
  {
    q: "What happens to my recordings?",
    a: "They are used only to build your report and are never shared or published. Blur or skip anything sensitive before you send it.",
  },
  {
    q: "Does this only work on Windows?",
    a: "The workflow, batching and file-system work applies anywhere. The deepest wins — scripts, system tweaks, app bundles — are Windows-specific, so Windows users get the most out of it.",
  },
  {
    q: "What happens after the scorecard?",
    a: "You get your score and your top leaks immediately. If the results suggest I can genuinely save you serious time, you will get an invitation to the recording review. If they do not, I will tell you that instead.",
  },
];

export function Offer() {
  return (
    <Section>
      <Eyebrow>After the scorecard</Eyebrow>
      <H2>Three ways to go from knowing your leaks to actually closing them</H2>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-xl border p-7 ${
              t.featured ? "border-brand bg-brand-soft" : "border-border bg-card"
            }`}
          >
            <span className="font-display text-3xl font-bold text-ink">{t.price}</span>
            <h3 className="mt-2 text-lg font-semibold text-ink">{t.name}</h3>
            <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
              {t.body}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">Starts with the free scorecard</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section tinted>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Who built this</Eyebrow>
          <H2>I have spent three years obsessing over making one Windows machine fast</H2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Everything here comes out of my own work: making videos on Windows, testing every tool
            in the space, and combining features across apps into a workflow nobody handed me. What
            you are buying is judgment and integration — not more options.
          </p>
        </div>
        <ul className="space-y-4">
          {proof.map((p) => (
            <li key={p} className="flex gap-4 border-b border-border pb-4 text-ink">
              <span aria-hidden className="text-brand">
                ▪
              </span>
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Guarantee() {
  return (
    <Section>
      <div className="rounded-2xl border-2 border-brand bg-brand-soft px-8 py-14 text-center md:px-16">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-ink md:text-[2.5rem]">
          If you are not visibly faster at your work, you get every dollar back
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We measure the same things before and after: how long the task took and how many times you
          switched contexts. If those numbers do not move, you do not pay.
        </p>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section tinted>
      <Eyebrow>Questions</Eyebrow>
      <H2>The things people ask before they hit start</H2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-border bg-card p-7">
            <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <>
      <Section>
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.12] text-ink md:text-5xl">
            Find out how many hours a week your setup is costing you
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Fifteen questions. Three minutes. A score and your first three fixes on the spot.
          </p>
          <div className="mt-9">
            <Cta />
          </div>
          <div className="mt-6 justify-center">
            <CtaBadges />
          </div>
        </div>
      </Section>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span className="font-display font-bold text-ink">WorkflowAudit</span>
          <span>Workflow audits and done-for-you productivity systems.</span>
        </div>
      </footer>
    </>
  );
}