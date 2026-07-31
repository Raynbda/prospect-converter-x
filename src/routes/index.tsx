import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/landing/Hero";
import { Blueprint, Measures, Problem, Steps, ValueProp } from "@/components/landing/Body";
import { About, Faq, FinalCta, Guarantee, Offer } from "@/components/landing/Close";

const title = "Cut 10+ Wasted Hours From Your Work Week";
const description =
  "Take the free 3-minute workflow scorecard: find out where your setup leaks time and get the first three fixes, tailored to the tools you already use.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Workflow audit and productivity system buildout",
          description,
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <ValueProp />
      <Problem />
      <Measures />
      <Blueprint />
      <Steps />
      <Offer />
      <About />
      <Guarantee />
      <Faq />
      <FinalCta />
    </main>
  );
}
