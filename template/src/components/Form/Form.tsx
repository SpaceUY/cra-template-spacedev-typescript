import { FormikValues, useFormik } from 'formik';
import { ReactNode } from 'react';

type Props<T extends FormikValues> = {
  initialValues: T;
  validationSchema: Parameters<typeof useFormik>[0]['validationSchema'];
  onSubmit: Parameters<typeof useFormik<T>>[0]['onSubmit'];
  onReset?: Parameters<typeof useFormik<T>>[0]['onReset'];
  children: (formik: ReturnType<typeof useFormik<T>>) => ReactNode;
  enableReinitialize?: boolean;
};

export const Form = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  children,
  enableReinitialize = false,
}: Props<T>): JSX.Element => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize,
    onSubmit,
    onReset,
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {children(formik)}
    </form>
  );
};
