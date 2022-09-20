import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledContainerDiv = styled.div<{
  $direction: string;
  $justify: string;
  $align: string;
  $gap?: number;
}>`
  min-height: 100%;
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  box-sizing: border-box;
  gap: ${({ $gap }) => $gap}rem;
`;

type Props = FcDefaultProps & {
  column?: boolean;
  style?: React.CSSProperties;
  gap?: number;
  component?:
    | 'div'
    | 'span'
    | 'section'
    | 'article'
    | 'header'
    | 'footer'
    | 'main'
    | 'aside';
  ['v-start']?: boolean;
  ['v-end']?: boolean;
  ['v-center']?: boolean;
  ['v-between']?: boolean;
  ['v-around']?: boolean;
  ['v-stretch']?: boolean;
  ['h-start']?: boolean;
  ['h-end']?: boolean;
  ['h-center']?: boolean;
  ['h-between']?: boolean;
  ['h-around']?: boolean;
  ['h-stretch']?: boolean;
};

export const Align: FC<Props> = ({
  children,
  className,
  style,
  gap,
  component = 'div',
  column = false,
  ...rest
}) => {
  const [h, v] = useMemo(() => {
    const entries = Object.entries(rest);

    let hKey: string | null = null;
    let vKey: string | null = null;

    for (const [key, value] of entries) {
      switch (key) {
        case 'v-start':
          vKey = value ? 'flex-start' : null;
          break;
        case 'v-end':
          vKey = value ? 'flex-end' : null;
          break;
        case 'v-center':
          vKey = value ? 'center' : null;
          break;
        case 'v-between':
          vKey = value ? 'space-between' : null;
          break;
        case 'v-around':
          vKey = value ? 'space-around' : null;
          break;
        case 'v-stretch':
          vKey = value ? 'stretch' : null;
          break;
        case 'h-start':
          hKey = value ? 'flex-start' : null;
          break;
        case 'h-end':
          hKey = value ? 'flex-end' : null;
          break;
        case 'h-center':
          hKey = value ? 'center' : null;
          break;
        case 'h-between':
          hKey = value ? 'space-between' : null;
          break;
        case 'h-around':
          hKey = value ? 'space-around' : null;
          break;
        case 'h-stretch':
          hKey = value ? 'stretch' : null;
          break;
        default:
          break;
      }

      if (hKey && vKey) {
        break;
      }
    }

    return [hKey ?? 'start', vKey ?? 'start'];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const direction = column ? 'column' : 'row';

  const [justify, align] = !column ? [h, v] : [v, h];

  return (
    <StyledContainerDiv
      $direction={direction}
      $justify={justify}
      $align={align}
      $gap={gap}
      as={component}
      className={className}
      style={style}
    >
      {children}
    </StyledContainerDiv>
  );
};
