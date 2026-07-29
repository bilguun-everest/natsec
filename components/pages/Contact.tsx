"use client";

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
              <span>{CONTACT.phone}</span>
            </div>
            <div className="contact-row">
              <b>
                <T mn="И-мэйл" en="Email" />
              </b>
              <span>{CONTACT.email}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
