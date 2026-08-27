"use client";

import { Fragment } from "react";
import { T } from "@/components/lang";
import { Reveal } from "@/components/motion";
import { SecHead } from "@/components/ui";
import { CONTACT } from "@/lib/site";

export default function Contact() {
  return (
    <div className="band">
      <section id="holboo-barih" style={{ padding: "64px 0" }}>
        <div className="wrap">
          <SecHead
            eyebrow={{ mn: "Харилцагчийн туслах", en: "Customer Support" }}
            title={{ mn: "Холбоо барих", en: "Contact" }}
            style={{ marginBottom: 28 }}
          />
          <Reveal className="contact-card" delay={60}>
            <div className="contact-row">
              <b>
                <T mn="Хаяг" en="Address" />
              </b>
              <span>
                <T mn={CONTACT.addressMn} en={CONTACT.addressEn} />
              </span>
            </div>
            <div className="contact-row">
              <b>
                <T mn="Утас" en="Phone" />
              </b>
              {/* Tappable: on a phone an unlinked number has to be memorised
                  and retyped, which is where enquiries get lost. */}
              <span>
                {CONTACT.phones.map((phone, index) => (
                  <Fragment key={phone.dial}>
                    {index > 0 && ", "}
                    <a href={`tel:${phone.dial}`}>{phone.label}</a>
                  </Fragment>
                ))}
              </span>
            </div>
            <div className="contact-row">
              <b>
                <T mn="И-мэйл" en="Email" />
              </b>
              <span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
