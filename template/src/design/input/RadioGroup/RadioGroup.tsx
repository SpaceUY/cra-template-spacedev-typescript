import { Radio } from '@mui/material';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { isColor } from 'design/helpers/type.helpers';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';
import { v4 as uuidv4 } from 'uuid';
import { RadioGroupCustomOption } from './RadioGroupCustomOption';

const StyledTextP = styled(Text.p)`
  margin-bottom: 0.5rem;
`;

const StyledSpan = styled.span<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'initial')};
`;

type Props<T> = Omit<FcDefaultProps, 'children'> &
  InputProps<T> & {
    options: {
      label: string;
      value: T;
    }[];
    children?: (
      option: {
        label: string;
        value: T;
      },
      index: number,
      isChecked: boolean,
      isFocused: boolean,
      isDisabled?: boolean,
    ) => JSX.Element;
    row?: boolean;
  };

export const RadioGroup = <T,>(props: Props<T>): JSX.Element => {
  const {
    name,
    id = uuidv4(),
    options,
    onChange = noop,
    label,
    value,
    children,
    disabled,
    required,
    helperText,
    error,
    fullWidth = false,
    color,
    invert,
  } = props;

  const { system, theme } = useContext(DesignContext);

  const handleChange = useCallback(
    (
      evt: ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      // this is safe because we set the value to a number internally
      const opt = options[evt.target.value as unknown as number];

      onChange({
        target: {
          name,
          value: opt.value,
        },
      });
    },
    [name, onChange, options],
  );

  const _color = useMemo(() => {
    if (color) {
      if (isColor(color)) {
        return color[invert ? 'invert' : 'main'];
      }

      return theme.palette[color][invert ? 'invert' : 'main'];
    }

    return theme.palette.primary[invert ? 'invert' : 'main'];
  }, [color, invert, theme.palette]);

  if (children) {
    return (
      <Align column id={id}>
        <StyledSpan fullWidth={fullWidth}>
          <StyledTextP color={invert ? 'invert' : undefined}>
            {label}
            {required ?? ' *'}
          </StyledTextP>

          <Align column>
            {options.map((opt, i) => {
              const _id = `${name}-${i}`;

              return (
                <RadioGroupCustomOption
                  key={_id}
                  id={_id}
                  option={opt}
                  name={name}
                  onChange={handleChange}
                  isDisabled={disabled}
                  isChecked={opt.value === value}
                  index={i}
                >
                  {children}
                </RadioGroupCustomOption>
              );
            })}
          </Align>
        </StyledSpan>

        <StatusText error={error} helperText={helperText} />
      </Align>
    );
  }

  if (system === DesignSystem.MATERIAL_UI) {
    return (
      <Align column id={id}>
        <StyledSpan fullWidth={fullWidth}>
          <StyledTextP color={invert ? 'invert' : undefined}>
            {label}
            {required ?? ' *'}
          </StyledTextP>

          <Align column>
            {options.map((opt, i) => {
              const _id = `${name}-${i}`;

              return (
                <Align key={i} gap={0.5} v-center>
                  <Radio
                    name={name}
                    value={i}
                    id={_id}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={opt.value === value}
                    sx={{
                      color: _color,
                      '&.Mui-checked': {
                        color: _color,
                      },
                    }}
                  />

                  <Text.label
                    htmlFor={_id}
                    color={invert ? 'invert' : undefined}
                  >
                    <strong>{opt.label}</strong>
                  </Text.label>
                </Align>
              );
            })}
          </Align>
        </StyledSpan>

        <StatusText error={error} helperText={helperText} />
      </Align>
    );
  }

  return (
    <Align column>
      <StyledSpan fullWidth={fullWidth}>
        <StyledTextP>
          {label}
          {required ?? ' *'}
        </StyledTextP>

        <Align column>
          {options.map((opt, i) => {
            const _id = `${name}-${i}`;

            return (
              <Align key={i} gap={0.5} v-center>
                <input
                  type="radio"
                  name={name}
                  value={i}
                  id={_id}
                  onChange={handleChange}
                  disabled={disabled}
                  checked={opt.value === value}
                />

                <Text.label htmlFor={_id}>{opt.label}</Text.label>
              </Align>
            );
          })}
        </Align>
      </StyledSpan>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
