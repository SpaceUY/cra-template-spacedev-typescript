import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { mapVariantToMaterialInput } from 'design/Button/button.helpers';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { useLocale } from 'design/hooks/use-locale.hook';
import { MuiTextFieldInvert } from 'design/input/MuiTextFieldInvert/MuiTextFieldInvert';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { mapAppLocaleToFns } from 'helpers/date.helpers';
import { Align } from 'layout';
import { FC, useContext, useMemo } from 'react';

export const DateInput: FC<InputProps<Date | null>> = ({
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

  const locale = useMemo(() => {
    return mapAppLocaleToFns(appLocale);
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
        <DesktopDatePicker
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
          type="date"
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
