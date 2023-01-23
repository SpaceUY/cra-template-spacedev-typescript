/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { StatusText } from 'design/input/StatusText/StatusText';
import { TextInput } from 'design/input/TextInput/TextInput';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext } from 'react';

export const NumberInput = (props: InputProps<number | ''>): JSX.Element => {
  const { onChange = noop, name, ...rest } = props;

  const { system } = useContext(DesignContext);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const { value } = evt.target;

      onChange({
        target: {
          name,
          value: value === '' ? value : Number(value),
        },
      });
    },
    [name, onChange],
  );

  if (system === DesignSystem.MATERIAL_UI) {
    return (
      <TextInput
        // This is safe since the return will have a target prop
        // @ts-ignore
        onChange={handleChange}
        name={name}
        {...rest}
        // This is safe since number is actually a valid type
        // @ts-ignore
        type="number"
      />
    );
  }

  const { label, value, disabled, required, error, helperText } = rest;

  return (
    <Align column>
      <Text.label>
        <Text.p>{label}</Text.p>

        <input
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
        />
      </Text.label>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
