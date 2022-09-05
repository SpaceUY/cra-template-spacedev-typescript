import { createIntl, createIntlCache, IntlShape } from 'react-intl';

import { ReactNode } from 'react';
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
  private intl: IntlShape;

  constructor(locale: string, messages: Record<string, string>) {
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

  translate(...args: Parameters<typeof this.intl.formatMessage>): ReactNode {
    return this.intl.formatMessage(...args);
  }
}

const defaultLocale = getDefaultLocale();

const intl = new Intl(defaultLocale, messages[defaultLocale]);

export { intl };
