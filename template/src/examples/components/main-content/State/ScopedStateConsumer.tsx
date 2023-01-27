import { Button, Text, Well } from 'design';
import { useTheme } from 'design/hooks/use-theme';
import { Color } from 'design/types/color';
import { rgba } from 'helpers/color.helpers';
import { FC, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { ScopedStateContext } from './ScopedStateProvider';

const StyledWell = styled(Well)<{ $color: Color }>`
  margin-top: 1rem;
  background-color: ${({ $color }) => rgba($color.main, 0.5)};
  padding: 1rem;
`;

export const ScopedStateConsumer: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  const { providerName, level, color, randomizeColor } =
    useContext(ScopedStateContext);

  return (
    <StyledWell $color={color}>
      <Text.p>
        {level} - {providerName}
      </Text.p>

      <br />

      <Button
        onClick={randomizeColor}
        variant="filled"
        color={theme.palette.grey}
        small
      >
        Set Random Color
      </Button>

      {children}
    </StyledWell>
  );
};
