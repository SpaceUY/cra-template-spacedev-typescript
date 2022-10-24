import { createContext, ReactNode, useCallback, useState } from 'react';
import { Locale } from './enums/locale.enum';
import { getDefaultLocale } from './helpers';
import { intl } from './intl.utility';

const defaultLocale = getDefaultLocale();

export const IntlContext = createContext({
  locale: defaultLocale,
  setLocale: intl.setLocale,
});

type Props = {
  children: ReactNode;
};

export const IntlProvider = ({ children }: Props): JSX.Element => {
  const [locale, setLocale] = useState(defaultLocale);

  const setAndSyncLocale = useCallback((locale: Locale) => {
    intl.setLocale(locale);

    setLocale(locale);
  }, []);

  return (
    <IntlContext.Provider value={{ locale, setLocale: setAndSyncLocale }}>
      {children}
    </IntlContext.Provider>
  );
};
