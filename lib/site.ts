/** The client trading portal every "log in" / "open account" call-to-action points at. */
export const TRADING_URL = "https://natsec.istock.mn/auth/login";

/**
 * The iOS app, and the only one. The footer used to carry a Google Play tile
 * beside it with nothing behind it; a store badge for an app that does not
 * exist is a promise, not a placeholder, so it is gone rather than pending.
 */
export const APP_STORE_URL =
  "https://apps.apple.com/mn/app/natsec/id1508977939";

/** The two social accounts the footer links out to. */
export const SOCIAL = {
  facebook: "https://www.facebook.com/natsecmongolia",
  linkedin: "https://www.linkedin.com/company/national-securities-sc/",
};

export const CONTACT = {
  addressMn:
    "Монгол Улаанбаатар хот, Сүхбаатар дүүрэг, Eco Tower, 9 давхарт 904",
  addressEn:
    "Eco Tower, 9th floor, Room 904, Sukhbaatar District, Ulaanbaatar, Mongolia",
  addressJa:
    "モンゴル ウランバートル市 スフバートル区 エコタワー 9階 904号室",
  /**
   * Split so each number can be its own `tel:` link — on a phone, a number you
   * cannot tap is a number you have to memorise and retype.
   *
   * NOTE: "7706 707" is seven digits; Mongolian landlines are eight. It is
   * reproduced exactly as supplied, but it looks like a typo worth checking.
   */
  phones: [
    { label: "7709 7070", dial: "+97677097070" },
    { label: "7706 7070", dial: "+97677067070" },
  ],
  email: "info@natsec.mn",
};

/** Trading (nominee) account funds are transferred to. */
export const BANK = {
  nameMn: "Худалдаа Хөгжлийн Банк",
  account: "MN360004000499307296",
  holder: "НАТСЭК",
};
