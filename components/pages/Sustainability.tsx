"use client";

import Image from "next/image";
import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { DetailPage, Eyebrow, List, PageNav, SecHead } from "@/components/ui";
import { POLICIES, type Policy } from "@/lib/policies";

export default function Sustainability() {
  return (
    <section id="tog-hugjil">
      <div className="wrap">
        <SecHead
          eyebrow={{ mn: "Тогтвортой хөгжил", en: "Sustainability" }}
          title={{
            mn: "Хариуцлагатай, ил тод үйл ажиллагаа",
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
              <Image
                className="mark"
                src="/mark.png"
                alt=""
                width={158}
                height={158}
              />
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
