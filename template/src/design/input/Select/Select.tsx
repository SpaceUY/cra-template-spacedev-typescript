import {
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import {
  mapColorToMaterial,
  mapVariantToMaterialInput,
} from 'design/helpers/theme.helpers';
import { isColor } from 'design/helpers/type.helpers';
import { MuiTextFieldInvert } from 'design/input/MuiTextFieldInvert/MuiTextFieldInvert';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext, useMemo } from 'react';
import { FcDefaultProps } from 'types/fc-default-props';

type Props<T> = Omit<FcDefaultProps, 'children'> &
  InputProps<T> & {
    options: {
      label: string;
      value: T;
    }[];
    children?: JSX.Element[];
  };

export const Select = <T,>(props: Props<T>): JSX.Element => {
  const {
    name,
    id,
    options,
    onChange = noop,
    label,
    value,
    children,
    disabled,
    required,
    helperText,
    error,
    fullWidth = false,
    color,
    size,
    variant = 'default',
    invert,
  } = props;

  const materialTheme = useTheme();

  const { system } = useContext(DesignContext);

  const handleChange = useCallback(
    (
      evt: ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      // this is safe because we set the value to a number internally
      const opt = options[evt.target.value as unknown as number];

      onChange({
        target: {
          name,
          value: opt.value,
        },
      });
    },
    [name, onChange, options],
  );

  const _value = useMemo(() => {
    let index = 0;

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.value === value) {
        index = i;
        break;
      }
    }

    return index;
  }, [options, value]);

  const theme = useMemo(() => {
    if (isColor(color)) {
      return createTheme({
        palette: {
          primary: mapColorToMaterial(color),
        },
      });
    }

    return materialTheme;
  }, [color, materialTheme]);

  if (system === DesignSystem.MATERIAL_UI) {
    const MuiTextField = invert ? MuiTextFieldInvert : TextField;

    return (
      <ThemeProvider theme={theme}>
        <MuiTextField
          id={id}
          name={name}
          label={label}
          value={_value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          helperText={error ? error.toString() : helperText}
          error={!!error}
          fullWidth={fullWidth}
          color={isColor(color) ? 'primary' : color}
          size={size}
          variant={mapVariantToMaterialInput(variant)}
          select
        >
          {options.map((opt, i) => (
            <MenuItem key={i} value={i}>
              {children ? children[i] : opt.label}
            </MenuItem>
          ))}
        </MuiTextField>
      </ThemeProvider>
    );
  }

  return (
    <Align column>
      <Text.label>
        <div>{label}</div>

        <select
          name={name}
          id={id}
          onChange={handleChange}
          value={_value}
          disabled={disabled}
          required={required}
        >
          {options.map((opt, i) => (
            <option key={i} value={i}>
              {opt.label}
            </option>
          ))}
        </select>
      </Text.label>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
