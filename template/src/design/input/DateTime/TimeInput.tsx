import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Locale as DateFnsLocale } from 'date-fns';
import * as locales from 'date-fns/locale';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { mapVariantToMaterialInput } from 'design/helpers/theme.helpers';
import { useLocale } from 'design/hooks/use-locale.hook';
import { MuiTextFieldInvert } from 'design/input/MuiTextFieldInvert/MuiTextFieldInvert';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { Align } from 'layout';
import { FC, useContext, useMemo } from 'react';

export const TimeInput: FC<InputProps<Date | null>> = ({
  label,
  name,
  value,
  onChange,
  fullWidth,
  variant,
  invert,
  ...rest
}) => {
  const { system } = useContext(DesignContext);
  const appLocale = useLocale();

  const locale: DateFnsLocale = useMemo(() => {
    // This is safe since we know our locales exist in date-fns locales
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (locales as any)[appLocale];
  }, [appLocale]);

  const handleChange = (value: Date | null) => {
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  if (system === DesignSystem.MATERIAL_UI) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <TimePicker
          label={label}
          value={value}
          onChange={handleChange}
          renderInput={(params) => {
            if (invert) {
              return (
                <MuiTextFieldInvert
                  {...params}
                  fullWidth={fullWidth}
                  variant={mapVariantToMaterialInput(variant)}
                />
              );
            }

            return (
              <TextField
                {...params}
                fullWidth={fullWidth}
                variant={mapVariantToMaterialInput(variant)}
              />
            );
          }}
          {...rest}
        />
      </LocalizationProvider>
    );
  }

  const { disabled, required, error, helperText } = rest;

  return (
    <Align column>
      <Text.label>
        <Text.p>{label}</Text.p>

        <input
          type="time"
          value={value?.toDateString()}
          onChange={(event) => handleChange(new Date(event.target.value))}
          disabled={disabled}
          required={required}
        />
      </Text.label>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
