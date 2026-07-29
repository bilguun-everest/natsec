"use client";

import { T, Tg } from "@/components/lang";

export default function UtilityBar() {
  return (
    <div className="util">
      <div className="wrap">
        <div className="util-l">
          <a href="#">
            <span className="live-dot" />
            <T mn="МХБ ТОП-20: 45,182.6" en="MSE TOP-20: 45,182.6" />{" "}
            <span style={{ color: "#4FD497" }}>+0.84%</span>
          </a>
          <a href="#">
            <T mn="Ханш: USD 3,412" en="Rate: USD 3,412" />
            <Tg />
          </a>
        </div>
        <div className="util-r">
          <a href="#tog-hugjil">
            <T mn="Тогтвортой хөгжил, бодлого" en="Sustainability policy" />
          </a>
          <a href="#holboo-barih">
            <T mn="Холбоо барих" en="Contact" />
          </a>
        </div>
      </div>
    </div>
  );
}
