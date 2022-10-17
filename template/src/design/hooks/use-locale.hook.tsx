import { useContext } from 'react';
import { Locale } from 'utilities/i18n/enums/locale.enum';
import { IntlContext } from 'utilities/i18n/IntlContext';

export function useLocale(): Locale {
  const { locale } = useContext(IntlContext);

  return locale;
}
