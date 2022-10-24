import { Locale } from "utilities/i18n/enums/locale.enum";

export const supportedLanguages = Object.values(Locale);

export const defaultLocale = process.env
  .REACT_APP_LOCALE && supportedLanguages.includes(process.env
    .REACT_APP_LOCALE as Locale)
  ? process.env.REACT_APP_LOCALE
  : Object.values(Locale)[0];