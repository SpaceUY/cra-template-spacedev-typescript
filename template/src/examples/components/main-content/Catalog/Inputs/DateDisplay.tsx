import { Text } from 'design';
import { DateFormat, formatDate } from 'helpers/date.helpers';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

export const DateDisplay: FC<{ value: Date | null; invert?: boolean }> = ({
  value,
  invert = false,
}): JSX.Element => {
  if (value) {
    return (
      <Text.p color={invert ? 'invert' : 'main'}>
        <small>
          {formatDate(value, DateFormat.combinationOfLocalizadDateAndTime)}
        </small>
      </Text.p>
    );
  } else {
    return (
      <Text.p color={invert ? 'invert' : 'main'}>
        <small>{intl.translate({ id: 'No date selected' })}</small>
      </Text.p>
    );
  }
};
