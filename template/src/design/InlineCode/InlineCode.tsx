import { FC } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledCode = styled.code`
  font-weight: 100;
  padding: 0 0.25rem;
  background-color: ${({ theme }) => theme.background.middle};
  border: 1px solid ${({ theme }) => theme.background.back};
  border-radius: ${({ theme }) => theme.borderRadius.small}rem;
  color: ${({ theme }) => theme.palette.primary.main};
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

export const InlineCode: FC<FcDefaultProps> = ({ children, ...rest }) => {
  return (
    <StyledCode {...rest}>
      <small>{children}</small>
    </StyledCode>
  );
};
