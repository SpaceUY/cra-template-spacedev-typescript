import { TextField } from '@mui/material';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext } from 'react';

type Props = InputProps<string> & { type: 'text' | 'password' | 'email' };

export const TextInput = (props: Props): JSX.Element | null => {
  const {
    name,
    id,
    onChange = noop,
    label,
    value,
    type,
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
          value: evt.target.value,
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
        type={type}
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
          type={type}
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
