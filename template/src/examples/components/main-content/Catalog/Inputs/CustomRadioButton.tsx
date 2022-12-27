import { Text } from 'design';
import { rgba } from 'helpers/color.helpers';
import { FC } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span<{
  $isFirst: boolean;
  $isLast: boolean;
  $isFocused: boolean;
}>`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => rgba(theme.palette.grey.light, 0.5)};
  border-left: 1px solid ${({ theme }) => theme.palette.grey.light};
  border-right: 1px solid ${({ theme }) => theme.palette.grey.light};
  border-bottom: ${({ $isLast, theme }) => {
    switch (true) {
      case $isLast:
        return `1px solid ${theme.palette.grey.light}`;
      default:
        return 'none';
    }
  }};
  border-top: ${({ $isFirst, theme }) => {
    switch (true) {
      case $isFirst:
        return `1px solid ${theme.palette.grey.light}`;
      default:
        return 'none';
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: ${({ $isFirst, $isLast, theme }) => {
    const br = theme.borderRadius.medium;

    switch (true) {
      case $isFirst:
        return `${br}rem ${br}rem 0 0`;
      case $isLast:
        return `0 0 ${br}rem ${br}rem`;
      default:
        return 0;
    }
  }};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => rgba(theme.palette.grey.light, 0.25)};
  }
  outline: ${({ $isFocused, theme }) =>
    $isFocused ? `4px solid ${theme.palette.grey.light}` : ''};
`;

type Props = {
  label: string;
  isFirst: boolean;
  isLast: boolean;
  isDisabled?: boolean;
  isChecked: boolean;
  isFocused: boolean;
};

export const CustomRadioButton: FC<Props> = ({
  label,
  isFirst,
  isLast,
  isChecked,
  isDisabled,
  isFocused,
}) => {
  return (
    <StyledSpan $isFirst={isFirst} $isLast={isLast} $isFocused={isFocused}>
      <Text.p color={isDisabled ? 'light' : 'main'}>
        {isChecked ? '✔️' : '❌'} {label}
      </Text.p>
    </StyledSpan>
  );
};
