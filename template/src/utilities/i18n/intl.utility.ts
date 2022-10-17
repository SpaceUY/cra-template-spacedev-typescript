import { createIntl, createIntlCache, IntlShape } from 'react-intl';

import en from './en.json';
import { Locale } from './enums/locale.enum';
import es from './es.json';
import { getDefaultLocale, setDefaultLocale } from './helpers';

const messages: Record<Locale, Record<string, string>> = {
  en: en as Record<string, string>,
  es: es as Record<string, string>,
};

const cache = createIntlCache();

class Intl {
  private locale: Locale;
  private intl: IntlShape;

  constructor(locale: Locale, messages: Record<string, string>) {
    this.locale = locale;

    this.intl = createIntl(
      {
        locale,
        messages,
        defaultLocale: navigator.language,
      },
      cache,
    );
  }

  setLocale(locale: Locale): void {
    this.locale = locale;

    this.intl = createIntl(
      {
        locale,
        messages: messages[locale],
        defaultLocale: navigator.language,
      },
      cache,
    );

    setDefaultLocale(locale);
  }

  getLocale(): Locale {
    return this.locale;
  }

  translate(...args: Parameters<typeof this.intl.formatMessage>): string {
    return this.intl.formatMessage(...args) as string;
  }
}

const defaultLocale = getDefaultLocale();

const intl = new Intl(defaultLocale, messages[defaultLocale]);

export { intl };
