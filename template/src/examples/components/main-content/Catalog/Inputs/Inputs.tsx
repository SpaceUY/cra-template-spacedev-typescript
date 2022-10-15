import { Card, NumberInput, Select, Text, TextInput } from 'design';
import { cardHeadingStyles } from 'design/Card/CardHeading';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { ColorProp } from 'design/types/color-prop';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { ColorSelector } from 'examples/components/ColorSelector/ColorSelector';
import { VariantSelector } from 'examples/components/VariantSelector/VariantSelector';
import { Align } from 'layout';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';

const StyledH2 = styled(Text.h2)`
  ${cardHeadingStyles}
`;

const cssInputWrapperBase = css`
  padding: 1rem;
  width: 100%;
  max-width: 500px;
`;

const StyledInputWrapperDiv = styled.div`
  ${cssInputWrapperBase}
`;

const StyledColoredInputWrapperDiv = styled.div`
  ${cssInputWrapperBase}
  background: linear-gradient(
    ${({ theme }) => theme.palette.primary.main},
    ${({ theme }) => theme.palette.secondary.main}
  );
  border-radius: ${({ theme }) => theme.borderRadius.medium}rem;
`;

const StyledAlign = styled(Align)`
  width: fit-content;
`;

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => ({
  label: intl.translate({ id: 'Option {index}' }, { index }),
  value: index,
}));

export const Inputs: FC = () => {
  const [value, setValue] = useState(options[0].value);
  const [color, setColor] = useState<ColorProp | undefined>();
  const [variant, setVariant] = useState<InputVariantProp>('default');
  const [text, setText] = useState('');
  const [number, setNumber] = useState<number | ''>('');

  return (
    <Card.Base>
      <Card.Heading>
        <Align v-center gap={1}>
          <StyledH2>{intl.translate({ id: 'Inputs' })}</StyledH2>

          <ColorSelector
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
          />

          <VariantSelector
            value={variant}
            onChange={(evt) => setVariant(evt.target.value)}
          />
        </Align>
      </Card.Heading>

      <Card.Body>
        <StyledAlign column gap={1}>
          <Text.p>
            {intl.translate({
              id: 'All inputs will return the same value type as they receive.',
            })}
          </Text.p>

          <Text.h3>TextInput</Text.h3>

          <Text.p>
            {intl.translate(
              {
                id: 'The <code><TextInput /></code> component will take any <code>string</code> value.',
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <TextInput
              label="<TextInput />"
              name="demo-text-input"
              value={text}
              onChange={(evt) => setText(evt.target.value)}
              color={color}
              variant={variant}
              placeholder={intl.translate({ id: 'Type something' })}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <Text.p>
            {intl.translate(
              {
                id: "The prop <code>invert</code> is usefull when the background is collored and doesn't react with the theme mode changes.",
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledColoredInputWrapperDiv>
            <TextInput
              label="<TextInput invert/>"
              name="demo-text-input"
              value={text}
              onChange={(evt) => setText(evt.target.value)}
              color={color}
              variant={variant}
              placeholder={intl.translate({ id: 'Type something' })}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.h3>NumberInput</Text.h3>

          <Text.p>
            {intl.translate(
              {
                id: "The <code><NumberInput /></code> component will take any <code>number</code> or <code>''</code> as its value.",
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <NumberInput
              label="<NumberInput />"
              name="demo-number-input"
              value={number}
              onChange={(evt) => setNumber(evt.target.value)}
              color={color}
              variant={variant}
              placeholder={intl.translate({ id: 'Type a number' })}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <NumberInput
              label="<NumberInput invert/>"
              name="demo-number-input"
              value={number}
              onChange={(evt) => setNumber(evt.target.value)}
              color={color}
              variant={variant}
              placeholder={intl.translate({ id: 'Type a number' })}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.h3>Select</Text.h3>

          <Text.p>
            {intl.translate(
              {
                id: "The <code><Select /></code> component will take any type as an option's type, and return the same value type.",
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <Select
              label="<Select />"
              name="demo-select"
              options={options}
              value={value}
              onChange={(evt) => setValue(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <Select
              label="<Select invert/>"
              name="demo-select"
              options={options}
              value={value}
              onChange={(evt) => setValue(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>
        </StyledAlign>
      </Card.Body>
    </Card.Base>
  );
};
