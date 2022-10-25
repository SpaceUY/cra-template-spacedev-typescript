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
  private static localeFallback = Locale.en;
  private static supportedLanguages = Object.values(Locale);

  private locale: Locale;
  private intl: IntlShape;

  constructor(locale: Locale) {
    this.locale = this.getSafeLocale(locale);

    this.intl = createIntl(
      {
        locale: this.locale,
        messages: messages[this.locale] ?? messages[Intl.localeFallback],
        defaultLocale: Intl.localeFallback,
      },
      cache,
    );
  }

  setLocale(locale: Locale): void {
    this.locale = this.getSafeLocale(locale);

    this.intl = createIntl(
      {
        locale: this.locale,
        messages: messages[this.locale] ?? messages[Intl.localeFallback],
        defaultLocale: Intl.localeFallback,
      },
      cache,
    );

    setDefaultLocale(locale);
  }

  getLocale(): Locale {
    return this.locale;
  }

  private getSafeLocale(locale: Locale): Locale {
    return Intl.supportedLanguages.includes(locale)
      ? locale
      : Intl.localeFallback;
  }

  translate(...args: Parameters<typeof this.intl.formatMessage>): string {
    return this.intl.formatMessage(...args) as string;
  }
}

const defaultLocale = getDefaultLocale();

const intl = new Intl(defaultLocale);

export { intl };
