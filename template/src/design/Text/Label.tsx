import styled from 'styled-components';
import { TextProps } from '../types/text-props';
import { baseStyles } from './text.styled';

export const Label = styled.label<TextProps>`
  ${baseStyles}
  font-size: ${({ theme }) => theme.components.text.label.fontSize}rem;
  font-weight: ${({ theme }) => theme.components.text.label.fontWeight};
  line-height: ${({ theme }) => theme.components.text.label.lineHeight};
  color: ${({ theme, color = 'main' }) =>
    color === 'inherit' ? 'inherit' : theme.components.text.label.color[color]};
`;
