import { Form } from 'components/Form/Form';
import { toast } from 'components/Toast/Toast';
import { Button, Card, TextInput } from 'design';
import { AppRoute } from 'enums/app-route.enum';
import { getUserInfo, login } from 'examples/api/auth.api';
import { FormikHelpers } from 'formik';
import { setAuthTokenAction } from 'global-state/actions';
import { selectAuthToken } from 'global-state/selectors';
import { genericErrorHandler } from 'helpers/error.helpers';
import { isPath } from 'helpers/navigation.helpers';
import { Align } from 'layout';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FcDefaultProps } from 'types/fc-default-props';
import { intl } from 'utilities/i18n/intl.utility';
import { logger } from 'utilities/logger/Logger';
import * as Yup from 'yup';

const StyledAlign = styled(Align)`
  height: calc(100vh - 9rem);
  width: 100%;
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email(intl.translate({ id: 'Must be a valid email' }))
    .required(intl.translate({ id: 'Required field' })),
  password: Yup.string()
    .min(8, intl.translate({ id: 'Must be at least 8 charactes long' }))
    .required(intl.translate({ id: 'Required field' })),
});

type FormValues = {
  email: string;
  password: string;
};

export const Login: FC<FcDefaultProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    try {
      setIsLoading(true);

      const token = await login(values.email, values.password);

      dispatch(setAuthTokenAction(token));

      const userInfo = await getUserInfo();

      logger.info('User logged in', { userInfo });

      toast.success(
        intl.translate(
          { id: 'Welcome {userName}' },
          { userName: userInfo.name },
        ),
      );

      helpers.resetForm();
    } catch (error) {
      genericErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      const path = (location.state as { origin: unknown })?.origin;

      if (isPath(path)) {
        navigate(path);
      } else {
        navigate(AppRoute.HOME);
      }
    }
  }, [authToken, location.state, navigate]);

  return (
    <StyledAlign v-center h-center>
      <Card.Base>
        <Card.Heading>{intl.translate({ id: 'Login Example' })}</Card.Heading>

        <Form
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <>
              <Card.Body>
                <Align column gap={0.5}>
                  <TextInput
                    label={intl.translate({ id: 'Email Address' })}
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    helperText={intl.translate({ id: 'Any email will do' })}
                    variant="outlined"
                    fullWidth
                  />

                  <TextInput
                    label={intl.translate({ id: 'Password' })}
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                    helperText={intl.translate({
                      id: 'Any text with at least 8 characters will do',
                    })}
                    variant="outlined"
                    fullWidth
                  />
                </Align>
              </Card.Body>

              <Card.Footer>
                <Button type="submit" color="primary" disabled={isLoading}>
                  {intl.translate({ id: 'Login' })}
                </Button>
              </Card.Footer>
            </>
          )}
        </Form>
      </Card.Base>
    </StyledAlign>
  );
};
