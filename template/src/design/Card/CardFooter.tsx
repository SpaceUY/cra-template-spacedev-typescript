import { FC } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledCardFooterDiv = styled.div`
  padding: 0.5rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.palette.grey.light};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

type Props = FcDefaultProps & {
  component?: 'div' | 'span' | 'region' | 'article' | 'header' | 'footer';
};

export const CardFooter: FC<Props> = ({ children, component, ...rest }) => {
  return (
    <StyledCardFooterDiv as={component} {...rest}>
      {children}
    </StyledCardFooterDiv>
  );
};
