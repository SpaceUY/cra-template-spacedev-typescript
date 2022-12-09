import { Form } from 'components/Form/Form';
import { Button, Card, NumberInput, Select, Text, TextInput } from 'design';
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
import { Align } from 'layout';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { intl } from 'utilities/i18n/intl.utility';
import * as Yup from 'yup';
import { CustomRadioButton } from './CustomRadioButton';
import { DateDisplay } from './DateDisplay';

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

const options = [1, 2, 3, 4].map((index) => ({
  label: intl.translate({ id: 'Option {index}' }, { index }),
  value: { index },
}));

const requiredStringValidation = Yup.string().required(
  intl.translate({ id: 'This field is required' }),
);

const requiredNumberValidation = Yup.number().required(
  intl.translate({ id: 'This field is required' }),
);

const requiredDateValidation = Yup.date().required(
  intl.translate({ id: 'This field is required' }),
);

const requiredBooleanValidation = Yup.boolean().required(
  intl.translate({ id: 'This field is required' }),
);

const requiredOptionValidation = Yup.object()
  .shape({
    label: Yup.string(),
    value: Yup.string(),
  })
  .nullable()
  .required(intl.translate({ id: 'This field is required' }));

const validationSchema = Yup.object({
  demoTextInput: requiredStringValidation,
  demoTextInputInvert: requiredStringValidation,
  demoNumberInput: requiredNumberValidation,
  demoNumberInputInvert: requiredNumberValidation,
  demoDateTimeInput: requiredDateValidation,
  demoDateInput: requiredDateValidation,
  demoTimeInput: requiredDateValidation,
  demoDateTimeInputInvert: Yup.date().required('This field is required'),
  demoDateInputInvert: requiredDateValidation,
  demoTimeInputInvert: requiredDateValidation,
  demoCheckbox: requiredBooleanValidation,
  demoCheckboxInvert: requiredBooleanValidation,
  demoRadioGroup: requiredOptionValidation,
  demoRadioGroupInvert: requiredOptionValidation,
  demoRadioGroupCustom: requiredOptionValidation,
  demoSelect: requiredOptionValidation,
  demoSelectInvert: requiredOptionValidation,
});

type FormValues = {
  demoTextInput: string;
  demoTextInputInvert: string;
  demoNumberInput: number | '';
  demoNumberInputInvert: number | '';
  demoDateTimeInput: Date | null;
  demoDateInput: Date | null;
  demoTimeInput: Date | null;
  demoDateTimeInputInvert: Date | null;
  demoDateInputInvert: Date | null;
  demoTimeInputInvert: Date | null;
  demoCheckbox: boolean;
  demoCheckboxInvert: boolean;
  demoRadioGroup: typeof options[0]['value'] | null;
  demoRadioGroupInvert: typeof options[0]['value'] | null;
  demoRadioGroupCustom: typeof options[0]['value'] | null;
  demoSelect: typeof options[0]['value'] | null;
  demoSelectInvert: typeof options[0]['value'] | null;
};

export const Inputs: FC = () => {
  const [color, setColor] = useState<ColorProp | undefined>();
  const [variant, setVariant] = useState<InputVariantProp>('default');

  const initialValues: FormValues = {
    demoTextInput: '',
    demoTextInputInvert: '',
    demoNumberInput: '',
    demoNumberInputInvert: '',
    demoDateTimeInput: new Date(),
    demoDateInput: null,
    demoTimeInput: null,
    demoDateTimeInputInvert: null,
    demoDateInputInvert: null,
    demoTimeInputInvert: null,
    demoCheckbox: false,
    demoCheckboxInvert: false,
    demoRadioGroup: null,
    demoRadioGroupInvert: null,
    demoRadioGroupCustom: null,
    demoSelect: null,
    demoSelectInvert: null,
  };

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

      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => {
          console.info(values);

          window.alert(intl.translate({ id: 'The form has been submitted' }));

          helpers.resetForm();
        }}
      >
        {({ values, errors, handleChange }) => {
          return (
            <>
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
                      name="demoTextInput"
                      value={values.demoTextInput}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      placeholder={intl.translate({ id: 'Type something' })}
                      error={errors.demoTextInput}
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
                      name="demoTextInputInvert"
                      value={values.demoTextInputInvert}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      placeholder={intl.translate({ id: 'Type something' })}
                      error={errors.demoTextInputInvert}
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
                      name="demoNumberInput"
                      value={values.demoNumberInput}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      placeholder={intl.translate({ id: 'Type a number' })}
                      error={errors.demoNumberInput}
                      fullWidth
                    />
                  </StyledInputWrapperDiv>

                  <StyledColoredInputWrapperDiv>
                    <NumberInput
                      label="<NumberInput invert/>"
                      name="demoNumberInputInvert"
                      value={values.demoNumberInputInvert}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      placeholder={intl.translate({ id: 'Type a number' })}
                      error={errors.demoNumberInputInvert}
                      fullWidth
                      invert
                    />
                  </StyledColoredInputWrapperDiv>

                  <Text.h3>DateTime</Text.h3>

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
                      name="demoDateTimeInput"
                      value={values.demoDateTimeInput}
                      error={errors.demoDateTimeInput}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                    />

                    <DateDisplay value={values.demoDateTimeInput} />

                    <DateInput
                      label="<DateInput />"
                      name="demoDateInput"
                      value={values.demoDateInput}
                      error={errors.demoDateInput}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                    />

                    <DateDisplay value={values.demoDateInput} />

                    <TimeInput
                      label="<TimeInput />"
                      name="demoTimeInput"
                      value={values.demoTimeInput}
                      error={errors.demoTimeInput}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                    />

                    <DateDisplay value={values.demoTimeInput} />
                  </StyledInputWrapperDiv>

                  <StyledColoredInputWrapperDiv>
                    <DateTimeInput
                      label="<DateTimeInput invert/>"
                      name="demoDateTimeInputInvert"
                      value={values.demoDateTimeInputInvert}
                      error={errors.demoDateTimeInputInvert}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                      invert
                    />

                    <DateDisplay
                      value={values.demoDateTimeInputInvert}
                      invert
                    />

                    <DateInput
                      label="<DateInput invert/>"
                      name="demoDateInputInvert"
                      value={values.demoDateInputInvert}
                      error={errors.demoDateInputInvert}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                      invert
                    />

                    <DateDisplay value={values.demoDateInputInvert} invert />

                    <TimeInput
                      label="<TimeInput invert/>"
                      name="demoTimeInputInvert"
                      value={values.demoTimeInputInvert}
                      error={errors.demoTimeInputInvert}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                      invert
                    />

                    <DateDisplay value={values.demoTimeInputInvert} invert />
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
                      name="demoCheckbox"
                      value={values.demoCheckbox}
                      error={errors.demoCheckbox}
                      onChange={handleChange}
                    />
                  </StyledInputWrapperDiv>

                  <StyledColoredInputWrapperDiv>
                    <Checkbox
                      label="<Checkbox invert/>"
                      name="demoCheckboxInvert"
                      value={values.demoCheckboxInvert}
                      error={errors.demoCheckboxInvert}
                      onChange={handleChange}
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
                      name="demoRadioGroup"
                      options={options}
                      value={values.demoRadioGroup}
                      error={errors.demoRadioGroup}
                      onChange={(evt) => {
                        console.log(evt);
                        handleChange(evt);
                      }}
                      color={color}
                      variant={variant}
                      fullWidth
                    />
                  </StyledInputWrapperDiv>

                  <StyledColoredInputWrapperDiv>
                    <RadioGroup
                      label="<RadioGroup invert/>"
                      name="demoRadioGroupInvert"
                      options={options}
                      value={values.demoRadioGroupInvert}
                      error={errors.demoRadioGroupInvert}
                      onChange={handleChange}
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
                    <RadioGroup
                      label="<RadioGroup custom/>"
                      name="demoRadioGroupCustom"
                      options={options}
                      value={values.demoRadioGroupCustom}
                      error={errors.demoRadioGroupCustom}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                    >
                      {({ label }, index, isChecked, isFocused, isDisabled) => (
                        <CustomRadioButton
                          label={label}
                          isChecked={isChecked}
                          isDisabled={isDisabled}
                          isFirst={index === 0}
                          isLast={index === options.length - 1}
                          isFocused={isFocused}
                        />
                      )}
                    </RadioGroup>
                  </StyledInputWrapperDiv>

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
                      name="demoSelect"
                      options={options}
                      value={values.demoSelect}
                      error={errors.demoSelect}
                      onChange={handleChange}
                      color={color}
                      variant={variant}
                      fullWidth
                    />
                  </StyledInputWrapperDiv>

                  <StyledColoredInputWrapperDiv>
                    <Select
                      label="<Select invert/>"
                      name="demoSelectInvert"
                      options={options}
                      value={values.demoSelectInvert}
                      error={errors.demoSelectInvert}
                      onChange={handleChange}
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

              <Card.Footer>
                <Button type="submit" variant="outlined">
                  {intl.translate({ id: 'Submit' })}
                </Button>
              </Card.Footer>
            </>
          );
        }}
      </Form>
    </Card.Base>
  );
};
