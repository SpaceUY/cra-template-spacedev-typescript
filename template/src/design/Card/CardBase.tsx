import { FC } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';

const StyledDefaultCardWrapperArticle = styled.article`
  background-color: ${({ theme }) => theme.background.front};
  border-radius: ${({ theme }) => theme.borderRadius.medium}rem;
  overflow: hidden;
`;

type Props = FcDefaultProps & {
  variant?: 'outlined' | 'contained' | 'default';
  component?: 'div' | 'span' | 'region' | 'article' | 'header' | 'footer';
};

export const CardBase: FC<Props> = ({
  children,
  component,
  variant = 'default',
  ...rest
}) => {
  if (variant === 'default') {
    return (
      <StyledDefaultCardWrapperArticle as={component} {...rest}>
        {children}
      </StyledDefaultCardWrapperArticle>
    );
  }

  return null;
};
