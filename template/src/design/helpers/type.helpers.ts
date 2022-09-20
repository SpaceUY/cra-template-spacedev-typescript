import { Color } from 'design/types/color';
import { isNil, isString } from 'helpers/nodash.helpers';

export function isColor(value?: unknown): value is Color {
  if (isNil(value) || isString(value)) {
    return false;
  }

  const valueAsColor = value as Color;

  const hasDark = 'dark' in valueAsColor && isString(valueAsColor.dark);

  const hasMain = 'main' in valueAsColor && isString(valueAsColor.main);

  const hasLight = 'light' in valueAsColor && isString(valueAsColor.light);

  const hasInvert = 'invert' in valueAsColor && isString(valueAsColor.invert);

  return hasDark && hasMain && hasLight && hasInvert;
}
