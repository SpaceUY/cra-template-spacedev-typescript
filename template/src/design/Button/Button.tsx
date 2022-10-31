import { createTheme, ThemeProvider } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import {
  mapColorToMaterial,
  mapSizeToMaterial,
  mapVariantToMaterialButton,
} from 'design/helpers/theme.helpers';
import { isColor } from 'design/helpers/type.helpers';
import { ButtonProps } from 'design/types/button-props';
import { Color } from 'design/types/color';
import { FC, useContext, useMemo } from 'react';

const MuiColorButton: FC<Omit<ButtonProps, 'color'> & { color: Color }> = ({
  children,
  onClick,
  className,
  variant,
  color,
  fullWidth,
  disabled,
  type,
  small,
  medium,
  large,
}) => {
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: mapColorToMaterial(color),
      },
    });
    // only update if the main color changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color.main]);

  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        variant={mapVariantToMaterialButton(variant)}
        onClick={onClick}
        className={className}
        fullWidth={fullWidth}
        disabled={disabled}
        color="primary"
        type={type}
        size={mapSizeToMaterial(small, medium, large)}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'default',
  color,
  fullWidth = false,
  disabled = false,
  type,
  small,
  medium,
  large,
}) => {
  const { system } = useContext(DesignContext);

  if (system === DesignSystem.MATERIAL_UI) {
    if (isColor(color)) {
      return (
        <MuiColorButton
          variant={variant}
          onClick={onClick}
          className={className}
          fullWidth={fullWidth}
          disabled={disabled}
          type={type}
          color={color}
          small={small}
          medium={medium}
          large={large}
        >
          {children}
        </MuiColorButton>
      );
    }

    return (
      <MuiButton
        variant={mapVariantToMaterialButton(variant)}
        onClick={onClick}
        className={className}
        fullWidth={fullWidth}
        disabled={disabled}
        color={color}
        type={type}
        size={mapSizeToMaterial(small, medium, large)}
      >
        {children}
      </MuiButton>
    );
  }

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};
