import { Text } from 'design/Text';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  position: absolute;
  display: block;
  height: 0;
  width: 0;
  opacity: 0;
`;

type Props<T> = {
  option: {
    label: string;
    value: T;
  };
  name: string;
  children: (
    option: {
      label: string;
      value: T;
    },
    index: number,
    isChecked: boolean,
    isFocused: boolean,
    isDisabled?: boolean,
  ) => JSX.Element;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isChecked: boolean;
  index: number;
};

export const RadioGroupCustomOption = <T,>({
  children,
  name,
  option,
  id,
  onChange,
  isDisabled,
  isChecked,
  index,
}: Props<T>): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <StyledSpan>
      <StyledInput
        type="radio"
        name={name}
        value={index}
        id={id}
        onChange={onChange}
        disabled={isDisabled}
        checked={isChecked}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Text.label htmlFor={id}>
        {children(option, index, isChecked, isFocused, isDisabled)}
      </Text.label>
    </StyledSpan>
  );
};
