import { Radio } from '@mui/material';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { noop } from 'helpers/nodash.helpers';
import { Align } from 'layout';
import { ChangeEvent, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';
import { v4 as uuidv4 } from 'uuid';

const StyledTextP = styled(Text.p)`
  margin-bottom: 0.5rem;
`;

type Props<T> = Omit<FcDefaultProps, 'children'> &
  InputProps<T> & {
    options: {
      label: string;
      value: T;
    }[];
    children?: JSX.Element[];
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
    size,
    variant = 'default',
    invert,
    row,
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

  if (system === DesignSystem.MATERIAL_UI) {
    if (invert) {
      return (
        <Align column>
          <Text.label>
            <StyledTextP color="invert">{label}</StyledTextP>

            <Align column>
              {options.map((opt, i) => {
                return (
                  <Align key={i} gap={0.5} v-center>
                    <Radio
                      name={name}
                      value={i}
                      id={id}
                      onChange={handleChange}
                      disabled={disabled}
                      checked={opt.value === value}
                      sx={{
                        color: theme.components.text.p.color.invert,
                        '&.Mui-checked': {
                          color: theme.components.text.p.color.invert,
                        },
                      }}
                    />

                    <Text.label htmlFor={id} color="invert">
                      <strong>{opt.label}</strong>
                    </Text.label>
                  </Align>
                );
              })}
            </Align>
          </Text.label>

          <StatusText error={error} helperText={helperText} />
        </Align>
      );
    }
    return (
      <Align column>
        <span>
          <StyledTextP>{label}</StyledTextP>

          <Align column>
            {options.map((opt, i) => {
              return (
                <Align key={i} gap={0.5} v-center>
                  <Radio
                    name={name}
                    value={i}
                    id={id}
                    onChange={handleChange}
                    disabled={disabled}
                    checked={opt.value === value}
                  />

                  <Text.label htmlFor={id}>
                    <strong>{opt.label}</strong>
                  </Text.label>
                </Align>
              );
            })}
          </Align>
        </span>

        <StatusText error={error} helperText={helperText} />
      </Align>
    );
  }

  return (
    <Align column>
      <Text.label>
        <StyledTextP>{label}</StyledTextP>

        <Align column>
          {options.map((opt, i) => {
            return (
              <Align key={id} gap={0.5} v-center>
                <input
                  type="radio"
                  name={name}
                  value={i}
                  id={id}
                  onChange={handleChange}
                  disabled={disabled}
                  checked={opt.value === value}
                />

                <Text.label htmlFor={id}>{opt.label}</Text.label>
              </Align>
            );
          })}
        </Align>
      </Text.label>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
