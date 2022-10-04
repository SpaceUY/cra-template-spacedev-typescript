import { FC } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.background.middle};
  border: 1px solid ${({ theme }) => theme.background.back};
  border-radius: ${({ theme }) => theme.borderRadius.small}rem;
  padding: 0.5rem;
`;

export const Well: FC<FcDefaultProps> = ({ children, ...rest }) => {
  return <StyledDiv {...rest}>{children}</StyledDiv>;
};
