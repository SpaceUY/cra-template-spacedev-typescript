import { useContext } from 'react';
import { Locale } from 'utilities/i18n/enums/locale.enum';
import { IntlContext } from 'utilities/i18n/intl.context';

export function useLocale(): Locale {
  const { locale } = useContext(IntlContext);

  return locale;
}
