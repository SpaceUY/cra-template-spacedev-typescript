import MuiCheckbox from '@mui/material/Checkbox';
import { DesignContext } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { StatusText } from 'design/input/StatusText/StatusText';
import { Text } from 'design/Text';
import { InputProps } from 'design/types/input-props';
import { Align } from 'layout';
import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = InputProps<boolean> & {
  indeterminate?: boolean;
};

export const Checkbox: FC<Props> = ({
  label,
  id = uuidv4(),
  name,
  value,
  onChange,
  disabled,
  required,
  error,
  helperText,
  className,
  invert,
  indeterminate,
}) => {
  const { system, theme } = useContext(DesignContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const labelId = `label-${id}`;

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      onChange({
        target: {
          name,
          value: evt.target.checked,
        },
      });
    },
    [name, onChange],
  );

  const refCallback = useCallback(
    (node: HTMLInputElement) => {
      inputRef.current = node;

      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    },
    [indeterminate],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  if (system === DesignSystem.MATERIAL_UI) {
    if (invert) {
      return (
        <Align column>
          <Align v-center component="label">
            <MuiCheckbox
              id={id}
              name={name}
              checked={value}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              className={className}
              aria-labelledby={labelId}
              indeterminate={indeterminate}
              sx={{
                color: theme.components.text.p.color.invert,
                '&.Mui-checked': {
                  color: theme.components.text.p.color.invert,
                },
              }}
            />

            <Text.p id={labelId} color="invert">
              {label}
            </Text.p>
          </Align>

          <StatusText error={error} helperText={helperText} />
        </Align>
      );
    }

    return (
      <Align column>
        <Align v-center component="label">
          <MuiCheckbox
            id={id}
            name={name}
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={className}
            aria-labelledby={labelId}
            indeterminate={indeterminate}
          />

          <Text.p id={labelId}>{label}</Text.p>
        </Align>

        <StatusText error={error} helperText={helperText} />
      </Align>
    );
  }

  return (
    <Align column>
      <Align v-center gap={0.5} component="label">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={className}
          aria-labelledby={labelId}
          ref={refCallback}
        />

        <Text.p id={labelId}>{label}</Text.p>
      </Align>

      <StatusText error={error} helperText={helperText} />
    </Align>
  );
};
