import { Select } from 'design';
import { Color } from 'design/types/color';
import { ColorProp } from 'design/types/color-prop';
import { OnChangeHandlerFn } from 'design/types/on-change-handler-fn';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

const options: {
  label: string;
  value: ColorProp | undefined;
}[] = [
  { label: 'Default', value: undefined },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Success', value: 'success' },
  {
    label: 'Custom Yellow',
    value: {
      main: '#FFB003',
      dark: '#FFB003',
      light: '#FFB003',
      invert: '#fff',
    } as Color,
  },
];

type Props = {
  value: ColorProp | undefined;
  onChange: OnChangeHandlerFn<ColorProp | undefined>;
};

export const ColorSelector: FC<Props> = ({ value, onChange }) => {
  return (
    <Select
      label={intl.translate({ id: 'Color' })}
      name="color"
      value={value}
      options={options}
      onChange={onChange}
      size="small"
      variant="outlined"
    />
  );
};
