import { isColor } from 'design/helpers/type.helpers';
import { useTheme } from 'design/hooks/useTheme';
import { IconProps } from 'design/types/icon-props';
import { FC, useMemo } from 'react';

type Props = IconProps & {
  material?: JSX.Element;
  feather?: JSX.Element;
};

export const Icon: FC<Props> = ({
  material: materialIcon,
  feather: featherIcon,
  color,
  size,
  small = false,
  medium = true,
  large = false,
  className,
}) => {
  const theme = useTheme();

  const _size = useMemo(() => {
    switch (true) {
      case small:
        return theme.components.icon.size.small;
      case large:
        return theme.components.icon.size.large;
      case medium:
      default:
        return theme.components.icon.size.medium;
    }
  }, [small, large, medium, theme]);

  const _color = useMemo(() => {
    if (!color) {
      return color;
    }

    if (isColor(color)) {
      return color.main;
    }

    return theme.palette[color].main;
  }, [color, theme]);

  if (materialIcon) {
    return (
      <materialIcon.type
        {...materialIcon.props}
        htmlColor={_color}
        sx={{ fontSize: size ?? _size * theme.baseSize }}
        className={className}
      />
    );
  }

  if (featherIcon) {
    return (
      <featherIcon.type
        {...featherIcon.props}
        color={_color}
        size={size ?? _size * theme.baseSize}
        className={className}
      />
    );
  }

  return null;
};
