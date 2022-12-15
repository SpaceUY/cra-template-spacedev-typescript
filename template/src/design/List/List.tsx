import { textBaseStyles } from 'design/Text';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const listBaseStyles = css`
  ${textBaseStyles}

  padding-left: 1rem;

  & li::marker {
    font-family: ${({ theme }) => theme.components.text.p.fontFamily};
  }
`;

const StyledUl = styled.ul`
  ${listBaseStyles}
  color: ${({ theme }) => theme.components.text.p.color.main}
`;

const StyledOl = styled.ol`
  ${listBaseStyles}
  color: ${({ theme }) => theme.components.text.p.color.main}
`;

type Props = FcDefaultProps & {
  ordered?: boolean;
};

export const List: FC<Props> = ({ children, ordered = false, ...rest }) => {
  if (ordered) {
    return <StyledOl {...rest}>{children}</StyledOl>;
  }

  return <StyledUl {...rest}>{children}</StyledUl>;
};
