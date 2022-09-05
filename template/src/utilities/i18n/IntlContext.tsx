import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { Locale } from './enums/locale.enum';
import { getDefaultLocale } from './helpers';
import { intl } from './intl.utility';

const defaultLocale = getDefaultLocale();

export const IntlContext = createContext({
  locale: defaultLocale,
  setLocale: intl.setLocale,
});

export const IntlProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale);

  const updateLocale = useCallback((locale: Locale) => {
    intl.setLocale(locale);

    setLocale(locale);
  }, []);

  return (
    <IntlContext.Provider value={{ locale, setLocale: updateLocale }}>
      {children}
    </IntlContext.Provider>
  );
};
