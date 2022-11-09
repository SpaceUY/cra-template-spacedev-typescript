import { Card, NumberInput, Select, Text, TextInput } from 'design';
import { cardHeadingStyles } from 'design/Card/CardHeading';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { Checkbox } from 'design/input/Checkbox/Checkbox';
import { DateInput } from 'design/input/DateTime/DateInput';
import { DateTimeInput } from 'design/input/DateTime/DateTimeInput';
import { TimeInput } from 'design/input/DateTime/TimeInput';
import { RadioGroup } from 'design/input/RadioGroup/RadioGroup';
import { ColorProp } from 'design/types/color-prop';
import { InputVariantProp } from 'design/types/input-variant-prop';
import { ColorSelector } from 'examples/components/ColorSelector/ColorSelector';
import { LanguageSelector } from 'examples/components/LanguageSelector/LanguageSelector';
import { VariantSelector } from 'examples/components/VariantSelector/VariantSelector';
import { DateFormat, formatDate } from 'helpers/date.helpers';
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const options = [1, 2, 3].map((index) => ({
  label: intl.translate({ id: 'Option {index}' }, { index }),
  value: { index },
}));

export const Inputs: FC = () => {
  const [option, setOption] = useState(options[0].value);
  const [color, setColor] = useState<ColorProp | undefined>();
  const [variant, setVariant] = useState<InputVariantProp>('default');
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [number, setNumber] = useState<number | ''>('');
  const [checkboxBoolean, setCheckboxBoolean] = useState(false);

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
              name="demo-text-input-invert"
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
              name="demo-number-input-invert"
              value={number}
              onChange={(evt) => setNumber(evt.target.value)}
              color={color}
              variant={variant}
              placeholder={intl.translate({ id: 'Type a number' })}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.h3>
            DateTime{' '}
            {date ? (
              <small>
                {formatDate(date, DateFormat.combinationOfLocalizadDateAndTime)}
              </small>
            ) : (
              <small> - {intl.translate({ id: 'No date selected' })}</small>
            )}
          </Text.h3>

          <Text.p>
            {intl.translate({
              id: 'The date display above is localized and will react to the locale being updated on the app.',
            })}
          </Text.p>

          <Text.p>
            {intl.translate(
              {
                id: 'The <code><DateTimeInput /></code>, <code><DateInput /></code> and <code><TimeInput /></code> components will take any <code>Date</code> as their value.',
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <DateTimeInput
              label="<DateTimeInput />"
              name="demo-date-time-input"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />

            <DateInput
              label="<DateInput />"
              name="demo-date-input"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />

            <TimeInput
              label="<TimeInput />"
              name="demo-time-input"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <DateTimeInput
              label="<DateTimeInput invert/>"
              name="demo-date-time-input-invert"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
              invert
            />

            <DateInput
              label="<DateInput invert/>"
              name="demo-date-input-invert"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
              invert
            />

            <TimeInput
              label="<TimeInput invert/>"
              name="demo-time-input-invert"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.h3>Checkbox</Text.h3>

          <Text.p>
            {intl.translate(
              {
                id: 'The <code><Checkbox /></code> component allows for the selection of a simple boolean value.',
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <Checkbox
              label="<Checkbox />"
              name="demo-checkbox"
              value={checkboxBoolean}
              onChange={(evt) => setCheckboxBoolean(evt.target.value)}
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <Checkbox
              label="<Checkbox invert/>"
              name="demo-checkbox-invert"
              value={checkboxBoolean}
              onChange={(evt) => setCheckboxBoolean(evt.target.value)}
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.h3>RadioGroup</Text.h3>

          <Text.p>
            {intl.translate(
              {
                id: "The <code><RadioGroup /></code> component will take any type as an option's type, and return the same value type.",
              },
              {
                code: (label) => <InlineCode>{label}</InlineCode>,
              },
            )}
          </Text.p>

          <StyledInputWrapperDiv>
            <RadioGroup
              label="<RadioGroup />"
              name="demo-radio-group"
              options={options}
              value={option}
              onChange={(evt) => setOption(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <RadioGroup
              label="<RadioGroup invert/>"
              name="demo-radio-group-invert"
              options={options}
              value={option}
              onChange={(evt) => setOption(evt.target.value)}
              color={color}
              variant={variant}
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
              value={option}
              onChange={(evt) => setOption(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
            />
          </StyledInputWrapperDiv>

          <StyledColoredInputWrapperDiv>
            <Select
              label="<Select invert/>"
              name="demo-select-invert"
              options={options}
              value={option}
              onChange={(evt) => setOption(evt.target.value)}
              color={color}
              variant={variant}
              fullWidth
              invert
            />
          </StyledColoredInputWrapperDiv>

          <Text.p>
            {intl.translate({
              id: 'Custom Example',
            })}
          </Text.p>

          <StyledInputWrapperDiv>
            <LanguageSelector variant={variant} fullWidth />
          </StyledInputWrapperDiv>
        </StyledAlign>
      </Card.Body>
    </Card.Base>
  );
};
