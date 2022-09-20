import { Select } from 'design';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { OnChangeHandlerFn } from 'design/types/on-change-handler-fn';
import { FC } from 'react';
import { intl } from 'utilities/i18n/intl.utility';

const options: {
  label: string;
  value: InputVariantProp;
}[] = [
  { label: 'Default', value: 'default' },
  { label: 'Outlined', value: 'outlined' },
  { label: 'Filled', value: 'filled' },
];

type Props = {
  value: InputVariantProp;
  onChange: OnChangeHandlerFn<InputVariantProp>;
};

export const VariantSelector: FC<Props> = ({ value, onChange }) => {
  return (
    <Select
      label={intl.translate({ id: 'Variant' })}
      name="variant"
      value={value}
      options={options}
      onChange={onChange}
      size="small"
      variant="outlined"
    />
  );
};
