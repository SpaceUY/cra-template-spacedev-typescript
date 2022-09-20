import { Align } from 'layout';
import { Locale } from 'utilities/i18n/enums/locale.enum';

import engFlag from './assets/eng-flag-circle.png';
import espFlag from './assets/esp-flag-circle.png';

const FLAGS: Record<Locale, string> = {
  [Locale.en]: engFlag,
  [Locale.es]: espFlag,
};

export const LanguageSelectorOption = ({
  label,
  value,
}: {
  label: string;
  value: Locale;
}): JSX.Element => {
  return (
    <Align v-center gap={0.5}>
      <img width="23" src={FLAGS[value]} alt="" />

      {label}
    </Align>
  );
};
