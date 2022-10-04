import styled from 'styled-components';
import { TextProps } from '../types/text-props';
import { baseStyles } from './text.styled';

export const Paragraph = styled.p<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.p.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.p.fontWeight};
  line-height: ${({ theme }) => theme.components.text.p.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.p.color[color]};

  font-family: ${({ theme }) => theme.components.text.p.fontFamily};
`;
