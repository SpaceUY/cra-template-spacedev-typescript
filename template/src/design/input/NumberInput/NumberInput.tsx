import { TextField } from '@mui/material';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext } from 'react';
import { StatusText } from '../StatusText/StatusText';

export const NumberInput = (props: InputProps<number>): JSX.Element | null => {
  const {
    name,
    id,
    onChange = noop,
    label,
    value,
    disabled,
    required,
    helperText,
    error,
    fullWidth = false,
    size,
  } = props;

  const { system } = useContext(DesignContext);

  const handleChange = useCallback(
    (
      evt: ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      onChange({
        target: {
          name,
          value: Number(evt.target.value),
        },
      });
    },
    [name, onChange],
  );

  if (system === DesignSystem.MATERIAL_UI) {
    return (
      <TextField
        id={id}
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        helperText={error ? error.toString() : helperText}
        error={!!error}
        fullWidth={fullWidth}
        size={size}
      />
    );
  }

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
