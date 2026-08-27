"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { DetailPage, Eyebrow, List, PageNav, SecHead } from "@/components/ui";
import { POLICIES, type Policy } from "@/lib/policies";

/**
 * One drawn icon per policy.
 *
 * All three cards used to carry the same company mark as their "icon", which
 * told the reader nothing and made the three look interchangeable.
 */
const ICONS: Record<Policy["route"], React.ReactNode> = {
  "tog-hugjil-esg": (
    <>
      <path d="M12 21c0-6 3.5-10 8-11-.5 6-3.5 9.5-8 11z" />
      <path d="M12 21c0-4.5-2.6-7.6-6-8.5.4 4.6 2.6 7.2 6 8.5z" />
      <path d="M12 21v-4" />
    </>
  ),
  "tog-hugjil-privacy": (
    <>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
      <path d="M12 14v2" />
    </>
  ),
  "tog-hugjil-terms": (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
};

export default function Sustainability() {
  return (
    <section id="tog-hugjil">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Тогтвортой хөгжил", en: "Sustainability" }}
          title={{
            // Non-breaking space: "ил тод" is one idea ("transparent"), and
            // `text-wrap:balance` on headings was splitting it across the two
            // lines, leaving "ил" dangling at the end of the first. Glued, the
            // balance falls at the comma instead, which is where it belongs.
            mn: "Хариуцлагатай, ил\u00A0тод үйл ажиллагаа",
            en: "Responsible and transparent operations",
          }}
          lead={{
            mn: "Тогтвортой хөгжлийн бодлого, харилцагчийн мэдээллийн нууцлал, үйлчилгээний нөхцөлтэй холбоотой бодлогууд.",
            en: "Our policies on sustainable development, data privacy, and terms of service.",
          }}
        />
        <div className="policy-grid">
          {POLICIES.map((policy, index) => (
            <Reveal
              as="a"
              className="policy-card"
              href={`#${policy.route}`}
              key={policy.route}
              delay={index * 100}
            >
              <span className="mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {ICONS[policy.route]}
                </svg>
              </span>
              <h4>
                <T mn={policy.title.mn} en={policy.title.en} />
              </h4>
              <p>
                <T mn={policy.card.mn} en={policy.card.en} />
              </p>
              <span className="more">
                <T mn={policy.cta.mn} en={policy.cta.en} />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PolicyDetail({ policy }: { policy: Policy }) {
  const index = POLICIES.indexOf(policy);
  const prev = POLICIES[index - 1];
  const next = POLICIES[index + 1];

  return (
    <DetailPage
      back={{
        href: "#tog-hugjil",
        mn: "Тогтвортой хөгжил рүү буцах",
        en: "All policies",
      }}
    >
      <Eyebrow mn="Тогтвортой хөгжил" en="Sustainability" />
      <h2>
        <T mn={policy.title.mn} en={policy.title.en} />
      </h2>
      <p className="mp-lead">
        <T mn={policy.lead.mn} en={policy.lead.en} />
      </p>
      <List items={policy.points} />

      <PageNav
        prev={prev && { href: `#${prev.route}`, ...prev.title }}
        next={next && { href: `#${next.route}`, ...next.title }}
      />
    </DetailPage>
  );
}
