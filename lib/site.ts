/** The client trading portal every "log in" / "open account" call-to-action points at. */
export const TRADING_URL = "https://natsec.istock.mn/auth/login";

/**
 * The iOS app. There is no Android build yet, which is why the Google Play
 * tile in the footer stays a `PendingLink` rather than pointing somewhere.
 */
export const APP_STORE_URL = "https://apps.apple.com/mn/app/natsec/id1508977939";

export const CONTACT = {
  addressMn: "Монгол Улаанбаатар хот, Сүхбаатар дүүрэг, Eco Tower, 9 давхарт 904",
  addressEn:
    "Eco Tower, 9th floor, Room 904, Sukhbaatar District, Ulaanbaatar, Mongolia",
  /**
   * Split so each number can be its own `tel:` link — on a phone, a number you
   * cannot tap is a number you have to memorise and retype.
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
