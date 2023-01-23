import { Text } from 'design';
import { selectGlobalCount } from 'examples/global-state/selectors';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledTextP = styled(Text.p)`
  font-size: 2rem;
  transform-origin: center;
  transition: transform 100ms ease-out;
  width: fit-content;

  &.animate {
    transform: scale(1.5);
  }
`;

export const GlobalCounterDisplay: FC = () => {
  const globalCount = useSelector(selectGlobalCount);
  const [value, setValue] = useState(globalCount);
  const [didValueCahnge, seTdidValueCahnge] = useState(false);

  useEffect(() => {
    if (globalCount !== value) {
      seTdidValueCahnge(true);

      setTimeout(() => {
        seTdidValueCahnge(false);
      }, 150);
    }

    setValue(globalCount);
  }, [globalCount, value]);

  return (
    <StyledTextP className={didValueCahnge ? 'animate' : undefined}>
      <strong>{value.toLocaleString('es-UY')}</strong>
    </StyledTextP>
  );
};
