import { StorageItem } from 'enums/storage-item.enum';
import { storage } from 'helpers/storage.helpers';
import { Locale } from './enums/locale.enum';

export function generalizeLocale(value: string): Locale {
  return value.slice(0, 2) as Locale;
}

export function setDefaultLocale(locale: Locale): void {
  storage.local.set(StorageItem.LOCALE, locale);
}

export function getDefaultLocale(): Locale {
  const storedLocale = storage.local.get<Locale>(StorageItem.LOCALE);

  if (storedLocale) {
    return storedLocale;
  }

  const locale = generalizeLocale(navigator.language);

  storage.local.set(StorageItem.LOCALE, locale);

  return locale;
}
