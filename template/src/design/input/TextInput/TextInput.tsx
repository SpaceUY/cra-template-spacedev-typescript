import {
  createTheme,
  TextField,
  ThemeProvider,
  useTheme as useMuiTheme,
} from '@mui/material';
import { mapVariantToMaterialInput } from 'design/Button/button.helpers';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { mapColorToMaterial } from 'design/helpers/theme.helpers';
import { isColor } from 'design/helpers/type.helpers';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext, useMemo } from 'react';
import { MuiTextFieldInvert } from '../MuiTextFieldInvert/MuiTextFieldInvert';

type Props = InputProps<string> & {
  type?: 'text' | 'password' | 'email';
};

export const TextInput = (props: Props): JSX.Element | null => {
  const {
    name,
    id,
    onChange = noop,
    label,
    value,
    type = 'text',
    disabled,
    required,
    helperText,
    error,
    fullWidth = false,
    size,
    invert = false,
    variant = 'default',
    placeholder,
    color,
  } = props;

  const { system } = useContext(DesignContext);
  const materialTheme = useMuiTheme();

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

  const customMuiTheme = useMemo(() => {
    if (isColor(color)) {
      return createTheme({
        palette: {
          primary: mapColorToMaterial(color),
        },
      });
    }

    return materialTheme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, materialTheme]);

  if (system === DesignSystem.MATERIAL_UI) {
    const MuiTextField = invert ? MuiTextFieldInvert : TextField;

    return (
      <ThemeProvider theme={customMuiTheme}>
        <MuiTextField
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
          variant={mapVariantToMaterialInput(variant)}
          placeholder={placeholder}
          color={isColor(color) ? 'primary' : color}
        />
      </ThemeProvider>
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
