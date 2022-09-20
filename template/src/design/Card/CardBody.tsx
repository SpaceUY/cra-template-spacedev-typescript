import { FC } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledCardBodyDiv = styled.div`
  padding: 1rem;
`;

type Props = FcDefaultProps & {
  component?: 'div' | 'span' | 'region' | 'article' | 'header' | 'footer';
};

export const CardBody: FC<Props> = ({ children, component }) => {
  return <StyledCardBodyDiv as={component}>{children}</StyledCardBodyDiv>;
};
