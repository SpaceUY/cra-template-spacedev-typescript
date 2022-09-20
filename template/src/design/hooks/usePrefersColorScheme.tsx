import { ThemeMode } from 'design/enums/theme-mode.enum';
import { useEffect, useState } from 'react';

export function usePrefersColorScheme(
  defaultThemeMode: ThemeMode = ThemeMode.LIGHT,
) {
  const [mode, setMode] = useState<ThemeMode>(defaultThemeMode);

  useEffect(() => {
    const handleChange = (evt: MediaQueryListEvent) => {
      setMode(evt.matches ? ThemeMode.DARK : ThemeMode.LIGHT);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleChange);
    };
  }, []);

  return mode;
}
