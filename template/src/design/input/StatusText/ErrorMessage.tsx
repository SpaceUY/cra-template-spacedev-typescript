import { Text } from 'design/Text';
import { FC } from 'react';
import styled from 'styled-components';

const StyledErrorP = styled(Text.p)`
  color: ${({ theme }) => theme.palette.error.main};
`;

export const ErrorMessage: FC<{ children: string }> = ({ children }) => {
  return (
    <StyledErrorP>
      <small>{children}</small>
    </StyledErrorP>
  );
};
