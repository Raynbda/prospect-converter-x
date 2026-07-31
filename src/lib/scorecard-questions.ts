export type Question = {
  id: string;
  dimension: string;
  text: string;
  options: { label: string; weight: 0 | 1 | 2 | 3 }[];
};

const freq = (a: string, b: string, c: string, d: string): Question["options"] => [
  { label: a, weight: 0 },
  { label: b, weight: 1 },
  { label: c, weight: 2 },
  { label: d, weight: 3 },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    dimension: "Time allocation",
    text: "In a typical work day, how many hours of genuine, uninterrupted deep work do you get?",
    options: freq("3 or more hours", "About 2 hours", "About 1 hour", "Almost none"),
  },
  {
    id: "q2",
    dimension: "Time allocation",
    text: "Do you know where your hours actually went at the end of a work day?",
    options: freq(
      "Yes, I track it",
      "Roughly, from memory",
      "Only the big blocks",
      "No idea where the day went",
    ),
  },
  {
    id: "q3",
    dimension: "Time allocation",
    text: "How often does a task take far longer than you expected?",
    options: freq("Rarely", "Sometimes", "Most weeks", "Every single project"),
  },
  {
    id: "q4",
    dimension: "Task types",
    text: "How much of your week is spent on small recurring admin you have done a hundred times?",
    options: freq("Under 10%", "About 20%", "About 35%", "Half my week or more"),
  },
  {
    id: "q5",
    dimension: "Task types",
    text: "Do you batch similar tasks together, or handle them as they arrive?",
    options: freq(
      "Batched into set blocks",
      "Batched when I remember",
      "Mostly as they arrive",
      "Purely reactive",
    ),
  },
  {
    id: "q6",
    dimension: "Task types",
    text: "How many steps of your typical project are automated, templated or scripted?",
    options: freq("Most of them", "A few key ones", "One or two", "None at all"),
  },
  {
    id: "q7",
    dimension: "Decision load",
    text: "When you sit down to work, do you already know exactly what to do first?",
    options: freq(
      "Always, it is planned the night before",
      "Usually",
      "I decide in the moment",
      "I lose 20+ minutes deciding",
    ),
  },
  {
    id: "q8",
    dimension: "Decision load",
    text: "How often do you re-prioritise or switch tasks mid-flow?",
    options: freq("Rarely", "Once or twice a day", "Several times a day", "Constantly"),
  },
  {
    id: "q9",
    dimension: "Decision load",
    text: "Do you have a written system for capturing ideas, links and references?",
    options: freq(
      "Yes, and I review it weekly",
      "Yes, but I rarely revisit it",
      "Scattered across apps",
      "No system at all",
    ),
  },
  {
    id: "q10",
    dimension: "Environment friction",
    text: "How long does it take you to find a file you made two days ago?",
    options: freq("Seconds", "Under a minute", "A few minutes", "I often give up and redo it"),
  },
  {
    id: "q11",
    dimension: "Environment friction",
    text: "How many browser tabs and apps are open right now?",
    options: freq("Only what I need", "Under 10", "10 to 25", "More than I can count"),
  },
  {
    id: "q12",
    dimension: "Environment friction",
    text: "How often do notifications pull you out of focused work?",
    options: freq(
      "Never, everything is muted",
      "Occasionally",
      "Several times an hour",
      "Nonstop",
    ),
  },
  {
    id: "q13",
    dimension: "Energy",
    text: "Do you schedule your hardest work in your sharpest hours?",
    options: freq(
      "Yes, deliberately",
      "Sometimes by accident",
      "Rarely",
      "I have never thought about it",
    ),
  },
  {
    id: "q14",
    dimension: "Energy",
    text: "How do you feel at the end of a typical work day?",
    options: freq(
      "Satisfied, the important work got done",
      "Productive but scattered",
      "Busy with nothing to show",
      "Drained and behind",
    ),
  },
  {
    id: "q15",
    dimension: "Energy",
    text: "If you cut the waste, how many hours a week would you get back?",
    options: freq("Under 2", "2 to 5", "5 to 10", "More than 10"),
  },
];

export const MAX_SCORE = QUESTIONS.length * 3;

export type Band = {
  key: string;
  title: string;
  summary: string;
  hoursLost: string;
};

export function bandFor(score: number): Band {
  const pct = (score / MAX_SCORE) * 100;
  if (pct < 25)
    return {
      key: "dialled-in",
      title: "Dialled in",
      summary:
        "Your setup is already working for you. The remaining gains are in automation and sharper energy scheduling rather than firefighting.",
      hoursLost: "2-3 hours a week",
    };
  if (pct < 50)
    return {
      key: "leaky",
      title: "Leaky but liveable",
      summary:
        "You have good instincts and no system holding them up. Most of your loss comes from context switching and decisions you make from scratch every day.",
      hoursLost: "4-7 hours a week",
    };
  if (pct < 75)
    return {
      key: "overloaded",
      title: "Overloaded",
      summary:
        "Friction is now the main cost of your work. Files, tabs, notifications and repeated setup steps are eating the hours you should be spending on output.",
      hoursLost: "8-12 hours a week",
    };
  return {
    key: "firefighting",
    title: "Firefighting",
    summary:
      "You are not slow — you are working without a system at all. Almost every dimension we measure is leaking time, and the fixes compound fast.",
    hoursLost: "12+ hours a week",
  };
}

export function topLeaks(answers: number[]): string[] {
  const totals = new Map<string, number>();
  QUESTIONS.forEach((q, i) => {
    const w = q.options[answers[i] ?? 0]?.weight ?? 0;
    totals.set(q.dimension, (totals.get(q.dimension) ?? 0) + w);
  });
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([d]) => d);
}

export const LEAK_FIXES: Record<string, string> = {
  "Time allocation":
    "Block one protected 90-minute deep work window tomorrow and log where the rest of the day actually goes.",
  "Task types":
    "Pick the single task you repeat most and turn it into a template, script or shortcut this week.",
  "Decision load":
    "End each day by writing the first task for tomorrow, so you never start by deciding.",
  "Environment friction":
    "Rebuild one folder structure and one desktop layout so nothing takes more than 10 seconds to find.",
  Energy: "Move your hardest task into your two sharpest hours and push admin into the flat ones.",
};