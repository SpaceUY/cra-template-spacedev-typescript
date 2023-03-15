import { Form } from 'components/Form/Form';
import { Button, NumberInput } from 'design';
import { InlineCode } from 'design/InlineCode/InlineCode';
import { setCounterValueAction } from 'examples/global-state/actions';
import { isNumber } from 'helpers/nodash.helpers';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { intl } from 'utilities/i18n/intl.utility';
import * as Yup from 'yup';

type FormValues = {
  count: number;
};

const validationSchema = Yup.object({
  count: Yup.number().required(
    intl.translate({ id: 'This field is required' }),
  ),
});

const initialValues: FormValues = {
  count: 0,
};

export const GlobalCounterForm: FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = ({ count }: FormValues) => {
    if (isNumber(count)) {
      dispatch(setCounterValueAction(count));
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange }) => {
        return (
          <>
            <InlineCode>{'<GlobalCounterForm />'}</InlineCode>

            <br />
            <br />

            <NumberInput
              label={intl.translate({ id: 'Global Counter' })}
              value={values.count}
              onChange={handleChange}
              name="count"
              variant="outlined"
            />

            <br />
            <br />

            <Button type="submit">{intl.translate({ id: 'Submit' })}</Button>
          </>
        );
      }}
    </Form>
  );
};
