import { format as dateFnsFormat, Locale as DateFnsLocale } from 'date-fns';
import * as locales from 'date-fns/locale';
import { Locale } from 'utilities/i18n/enums/locale.enum';
import { intl } from 'utilities/i18n/intl.utility';

/**
 * To extend take a look at https://date-fns.org/v2.0.0-alpha.25/docs/format
 */
export enum DateFormat {
  longLocalizedDate = 'P', // MM/DD/YYYY in en, DD/MM/YYYY in es
  longLocalizedTime = 'p',
  combinationOfLocalizadDateAndTime = 'Pp',
}

export function mapAppLocaleToFns(locale: Locale): DateFnsLocale {
  return (locales as any)[locale];
}

export function formatDate(
  date: Date,
  format = DateFormat.longLocalizedDate,
): string {
  return dateFnsFormat(date, format, {
    locale: mapAppLocaleToFns(intl.getLocale()),
  });
}
