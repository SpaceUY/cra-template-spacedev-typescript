import { useTheme } from 'design/hooks/use-theme';
import { Color } from 'design/types/color';
import { getRandomInt } from 'helpers/math.helpers';
import { noop } from 'helpers/nodash.helpers';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

type ScopedState = {
  providerName: string;
  level: number;
  color: Color;
  randomizeColor: () => void;
};

// We need to provide these initial values in order to not have to make them optionals
const initialState: ScopedState = {
  providerName: '',
  level: 0,
  color: {} as Color,
  randomizeColor: noop,
};

export const ScopedStateContext = createContext<ScopedState>(initialState);

export const ScopedStateProvider: FC<{
  children: ReactNode;
  value: Omit<ScopedState, 'randomizeColor'>;
}> = ({ children, value }) => {
  const theme = useTheme();

  const paletteColors = useMemo(
    () => Object.values(theme.palette),
    [theme.palette],
  );

  const [state, setState] = useState(value);

  const randomizeColor = useCallback(() => {
    const index = getRandomInt(0, paletteColors.length - 1);
    console.log('index', index);

    setState((state) => ({
      ...state,
      color: paletteColors[index],
    }));
  }, [paletteColors]);

  return (
    <ScopedStateContext.Provider value={{ ...state, randomizeColor }}>
      {children}
    </ScopedStateContext.Provider>
  );
};
