import { createIntl, createIntlCache, IntlShape } from "react-intl";

import en from "./en.json";
import es from "./es.json";
import { Locale } from "./enums/locale.enum";

const messages: Record<Locale, Record<string, string>> = {
  en: en as Record<string, string>,
  es: es as Record<string, string>,
};

const cache = createIntlCache();

class Intl {
  private intl: IntlShape;

  constructor(locale: string, messages: Record<string, string>) {
    this.intl = createIntl(
      {
        locale,
        messages,
        defaultLocale: navigator.language,
      },
      cache
    );
  }

  setLocale(locale: Locale): void {
    this.intl = createIntl(
      {
        locale,
        messages: messages[locale],
        defaultLocale: navigator.language,
      },
      cache
    );
  }

  translate(...args: Parameters<typeof this.intl.formatMessage>) {
    this.intl.formatMessage(...args);
  }
}

function generalizeLocale(value: string): Locale {
  return value.slice(0, 2) as Locale;
}

const defaultLocale = generalizeLocale(navigator.language);

const intl = new Intl(defaultLocale, messages[defaultLocale]);

export { intl };
