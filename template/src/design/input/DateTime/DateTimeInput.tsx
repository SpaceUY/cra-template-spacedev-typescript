import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Locale as DateFnsLocale } from 'date-fns';
import * as locales from 'date-fns/locale';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { mapVariantToMaterialInput } from 'design/helpers/theme.helpers';
import { useLocale } from 'design/hooks/use-locale.hook';
import { MuiTextFieldInvert } from 'design/input/MuiTextFieldInvert/MuiTextFieldInvert';
import { InputProps } from 'design/types/input-props';
import { FC, useContext, useMemo } from 'react';

export const DateTimeInput: FC<InputProps<Date | null>> = ({
  label,
  name,
  value,
  onChange,
  fullWidth,
  variant = 'default',
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
        <DateTimePicker
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

  // there is no native component for date time input
  return null;
};
