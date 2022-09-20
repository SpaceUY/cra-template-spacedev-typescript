import styled from 'styled-components';
import { TextProps } from '../types/text-props';
import { baseStyles } from './text.styled';

export const H1 = styled.h1<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h1.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h1.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h1.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h1.color[color]};
`;

export const H2 = styled.h2<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h2.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h2.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h2.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h2.color[color]};
`;

export const H3 = styled.h3<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h3.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h3.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h3.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h3.color[color]};
`;

export const H4 = styled.h4<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h4.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h4.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h4.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h3.color[color]};
`;

export const H5 = styled.h5<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h5.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h5.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h5.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h3.color[color]};
`;

export const H6 = styled.h6<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.h6.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.h6.fontWeight};
  line-height: ${({ theme }) => theme.components.text.h6.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.h3.color[color]};
`;
