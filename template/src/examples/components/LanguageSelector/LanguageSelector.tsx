import { Select } from 'design';
import { useContext } from 'react';
import { Locale } from 'utilities/i18n/enums/locale.enum';
import { IntlContext } from 'utilities/i18n/intl.context';
import { intl } from 'utilities/i18n/intl.utility';
import { LanguageSelectorOption as Option } from './LanguageSelectorOption';

const OPTIONS = [
  { label: 'English', value: Locale.en },
  { label: 'Español', value: Locale.es },
];

export const LanguageSelector = (): JSX.Element => {
  const { locale, setLocale } = useContext(IntlContext);

  return (
    <Select
      name="locale"
      id="locale-select"
      value={locale}
      options={OPTIONS}
      onChange={(evt) => setLocale(evt.target.value)}
      label={intl.translate({ id: 'Language' })}
      variant="outlined"
    >
      {OPTIONS.map((opt) => (
        <Option key={opt.label} label={opt.label} value={opt.value} />
      ))}
    </Select>
  );
};
