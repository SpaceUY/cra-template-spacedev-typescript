import { DesignContext } from 'design/DesignContext';
import { Theme } from 'design/types/theme';
import { useContext } from 'react';

export function useTheme(): Theme {
  const { theme } = useContext(DesignContext);

  return theme;
}
