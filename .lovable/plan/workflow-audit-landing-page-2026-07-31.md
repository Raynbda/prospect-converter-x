# Workflow Audit Landing Page

A single high-converting landing page whose one job is to get visitors to start a free "Workflow Waste Scorecard" — the quiz-first lead magnet from the Priestley system, styled with the Hormozi above-the-fold rules.

## The page, top to bottom

**1. Above the fold (80% of the effort goes here)**
- Readiness hook headline: "Are you ready to cut 10+ hours of wasted time out of your work week?"
- Subheadline that removes effort and names the mechanism: answer 15 questions in 3 minutes, get a personalised breakdown of where your workflow leaks time and exactly what to fix first.
- One CTA button: "Start the free scorecard". Under it, risk-reduction badges: 3 minutes, free, no card, instant results.
- Hero visual: a clean dashboard-style "waste report" mockup showing the dream outcome (before/after hours), generated as an image asset.
- Inline credibility line: 3+ years building on Windows, 100+ tools tested.

**2. Value proposition** — take the scorecard so we can measure and improve three things: time lost to context switching, friction in your file and tool setup, and repetitive work that should be automated.

**3. The problem** — a short "sound familiar?" block naming the real frustrations: scattered files, tab overload, notification interrupts, redoing the same steps every project, no system for saved information.

**4. What the scorecard measures** — 5 dimensions from your audit layer: time allocation, task types and frequency, decision load, environment friction, energy peaks and troughs.

**5. What you get back** — the personal productivity blueprint: deep-work schedule, batching plan, automation shortcuts, focus environment setup, weekly review checklist. Framed as concrete deliverables, not features.

**6. How it works — three steps only**: take the scorecard, send a recording of one real project, get your tailored game plan.

**7. Offer stack** — three tiers presented plainly: recording review ($150), 1:1 implementation call ($250), done-for-you buildout ($779). Each links back to the scorecard as the entry point rather than a separate checkout.

**8. Credibility / about** — your YouTube background, why you're the person to do this, the scope of the Windows and tooling space you've covered. No invented testimonials or logo walls.

**9. Guarantee** — visibly faster or your money back, given its own section with weight.

**10. FAQ** — what a recording needs to include, privacy, whether it works on Mac, what happens after the scorecard.

**11. Final CTA** — repeat of the hero CTA with the same badges. Minimal footer.

## Design

- White background, blue accent system, high contrast dark text.
- Space Grotesk for headings, DM Sans for body.
- Every section headline states its point on its own (Hormozi rule) — no "How it works" or "What our customers say" placeholders.
- Restrained motion, generous whitespace, no gradient-purple SaaS look.

## Technical notes

- Rewrites `src/routes/index.tsx` as the landing page, built from focused components under `src/components/landing/`.
- Design tokens (blue accent scale, radii, shadows) added to `src/styles.css` as semantic oklch variables; fonts loaded via a `<link>` in `src/routes/__root.tsx`.
- Route-level `head()` with a unique title, description, and og/twitter tags.
- Hero and section imagery generated as assets in `src/assets/`.
- CTA buttons are anchors pointing to a placeholder scorecard destination for now — no backend, no quiz engine, no database in this pass. The scorecard itself can be built next as its own route if you want it hosted here rather than on ScoreApp.
