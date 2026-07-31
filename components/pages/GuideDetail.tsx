"use client";

import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import {
  CopyButton,
  DetailPage,
  Eyebrow,
  PageNav,
  StepDots,
} from "@/components/ui";
import { GUIDES, GUIDE_ROUTES, type Guide } from "@/lib/guides";
import { BANK } from "@/lib/site";

export default function GuideDetail({ guide }: { guide: Guide }) {
  const index = GUIDES.indexOf(guide);
  const prev = GUIDES[index - 1];
  const next = GUIDES[index + 1];

  return (
    <DetailPage
      back={{ href: "#zaavar", mn: "Бүх зааврууд руу буцах", en: "All guides" }}
    >
      <StepDots steps={GUIDE_ROUTES} active={guide.route} />
      <Eyebrow mn="Хэрхэн эхлэх" en="Getting Started" />
      <h2>
        <T mn={guide.title.mn} en={guide.title.en} />
      </h2>
      <p className="mp-lead">
        <T mn={guide.lead.mn} en={guide.lead.en} />
      </p>

      {guide.bank && <BankBox />}

      {guide.steps && (
        <div className="guide-steps">
          {guide.steps.map((step, position) => (
            <Reveal
              className="gstep"
              key={step.title.mn}
              delay={position * 80}
            >
              <div className="gnum">{position + 1}</div>
              <div className="gbody">
                <h5>
                  <T mn={step.title.mn} en={step.title.en} />
                </h5>
                <p>
                  <T mn={step.body.mn} en={step.body.en} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {guide.note && (
        <p className="mp-note">
          <T mn={guide.note.mn} en={guide.note.en} />
        </p>
      )}

      <PageNav
        prev={prev && { href: `#${prev.route}`, ...prev.title }}
        next={next && { href: `#${next.route}`, ...next.title }}
      />
    </DetailPage>
  );
}

/** Trading (nominee) account details, each row copyable. */
function BankBox() {
  return (
    <>
      <div className="bank-box">
        <div className="row">
          <b>
            <T mn="Банкны нэр" en="Bank" />
          </b>
          <span>{BANK.nameMn}</span>
          <CopyButton text={BANK.nameMn} />
        </div>
        <div className="row">
          <b>
            <T mn="Дансны нэр" en="Account name" />
          </b>
          <span>{BANK.holder}</span>
          <CopyButton text={BANK.holder} />
        </div>
        <div className="row">
          <b>
            <T mn="Дансны дугаар" en="Account number" />
          </b>
          <span>{BANK.account}</span>
          <CopyButton text={BANK.account} />
        </div>
        <div className="row">
          <b>
            <T mn="Гүйлгээний утга" en="Transfer note" />
          </b>
          <span>
            <T mn="Регистрийн дугаар" en="Your registration number" />
          </span>
        </div>
      </div>
      <CopyButton
        className="more"
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          marginTop: 4,
        }}
        text={`${BANK.nameMn} / ${BANK.holder} / ${BANK.account}`}
      >
        <T mn="Бүх мэдээллийг хуулах ⧉" en="Copy all account details ⧉" />
      </CopyButton>
    </>
  );
}
