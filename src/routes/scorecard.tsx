import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import {
  LEAK_FIXES,
  MAX_SCORE,
  QUESTIONS,
  bandFor,
  topLeaks,
} from "@/lib/scorecard-questions";

const title = "Workflow Waste Scorecard — 15 questions, 3 minutes";
const description =
  "Answer 15 quick questions about how you work and get your workflow waste score, the hours you are losing each week, and the first three fixes to make.";

export const Route = createFileRoute("/scorecard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Scorecard,
});

const formSchema = z.object({
  name: z.string().trim().max(100, "Keep your name under 100 characters").optional(),
  email: z
    .string()
    .trim()
    .min(3, "Enter your email address")
    .max(255, "That email is too long")
    .email("Enter a valid email address"),
});

function Scorecard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const finished = step >= total;
  const score = answers.reduce(
    (sum, choice, i) => sum + (QUESTIONS[i]?.options[choice]?.weight ?? 0),
    0,
  );
  const percent = Math.round((score / MAX_SCORE) * 100);
  const band = bandFor(score);
  const leaks = topLeaks(answers);

  function choose(index: number) {
    const next = [...answers];
    next[step] = index;
    setAnswers(next);
    setStep(step + 1);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const parsed = formSchema.safeParse({ name: name || undefined, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }
    setSaving(true);
    const { error: insertError } = await supabase.from("scorecard_submissions").insert({
      email: parsed.data.email,
      name: parsed.data.name ?? null,
      answers: QUESTIONS.map((q, i) => ({
        id: q.id,
        dimension: q.dimension,
        choice: q.options[answers[i] ?? 0]?.label ?? null,
      })),
      score: percent,
      band: band.key,
    });
    setSaving(false);
    if (insertError) {
      setError("Something went wrong saving your results. Please try again.");
      return;
    }
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg font-bold tracking-tight text-ink">
            Workflow<span className="text-brand">Audit</span>
          </Link>
          <span className="text-sm text-muted-foreground">
            {finished ? "Your result" : `Question ${step + 1} of ${total}`}
          </span>
        </div>
        <div className="h-1 w-full bg-border">
          <div
            className="h-1 bg-brand transition-all duration-300"
            style={{ width: `${(Math.min(step, total) / total) * 100}%` }}
          />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        {!finished && <QuestionCard step={step} onChoose={choose} onBack={() => setStep(step - 1)} />}

        {finished && (
          <section className="space-y-10">
            <div className="rounded-xl border border-border bg-card p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                Workflow waste score
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-6xl font-bold leading-none text-ink">
                  {percent}
                </span>
                <span className="pb-1 text-lg text-muted-foreground">/ 100 waste</span>
              </div>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-border">
                <div className="h-2 rounded-full bg-brand" style={{ width: `${percent}%` }} />
              </div>
              <h1 className="mt-7 text-2xl font-bold text-ink md:text-3xl">{band.title}</h1>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
                {band.summary}
              </p>
              <p className="mt-5 border-l-2 border-brand pl-4 text-ink">
                Estimated time lost: <strong>{band.hoursLost}</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink">Your three biggest leaks</h2>
              <ol className="mt-5 space-y-4">
                {leaks.map((leak, i) => (
                  <li key={leak} className="rounded-lg border border-border bg-card px-6 py-5">
                    <span className="font-display text-sm font-bold text-brand">0{i + 1}</span>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{leak}</h3>
                    <p className="mt-2 text-[0.975rem] leading-relaxed text-muted-foreground">
                      {LEAK_FIXES[leak]}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {done ? (
              <div className="rounded-xl border border-brand bg-brand-soft p-8">
                <h2 className="text-xl font-bold text-ink">You are on the waiting list</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Your full breakdown and the personal productivity blueprint land in your inbox as
                  soon as the next audit slots open. Keep an eye out for an email from us.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 font-medium text-brand-foreground transition-colors hover:bg-brand-strong"
                >
                  Back to the site
                </Link>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="rounded-xl border border-border bg-card p-8 md:p-10"
              >
                <h2 className="text-xl font-bold text-ink">
                  Want the full breakdown and your blueprint?
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Join the waiting list and we will send your detailed report plus first access when
                  audit slots open.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-ink">First name (optional)</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      autoComplete="given-name"
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-ink outline-none focus-visible:border-brand"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Email address</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-ink outline-none focus-visible:border-brand"
                    />
                  </label>
                </div>
                {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 inline-flex rounded-lg bg-brand px-7 py-4 font-medium text-brand-foreground transition-colors hover:bg-brand-strong disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Join the waiting list"}
                </button>
                <p className="mt-4 text-sm text-muted-foreground">
                  No spam, no card, unsubscribe any time.
                </p>
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function QuestionCard({
  step,
  onChoose,
  onBack,
}: {
  step: number;
  onChoose: (index: number) => void;
  onBack: () => void;
}) {
  const question = QUESTIONS[step];
  if (!question) return null;

  return (
    <section>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
        {question.dimension}
      </p>
      <h1 className="mt-4 text-2xl font-bold leading-[1.2] text-ink md:text-4xl">
        {question.text}
      </h1>
      <div className="mt-9 grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onChoose(index)}
            className="rounded-lg border border-border bg-card px-6 py-5 text-left text-[1.05rem] text-ink transition-colors hover:border-brand hover:bg-brand-soft"
          >
            {option.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="mt-8 text-sm text-muted-foreground underline underline-offset-4"
        >
          Back
        </button>
      )}
    </section>
  );
}