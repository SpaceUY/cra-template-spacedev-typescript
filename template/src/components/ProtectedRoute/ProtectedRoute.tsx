import { AppRoute } from 'enums/app-route.enum';
import { selectAuthToken } from 'examples/global-state/selectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FcDefaultProps } from 'types/fc-default-props';

export const ProtectedRoute: FC<FcDefaultProps> = ({ children }) => {
  const location = useLocation();
  const authToken = useSelector(selectAuthToken);

  if (!authToken) {
    const { pathname, hash, search } = location;

    return (
      <Navigate
        to={AppRoute.LOGIN}
        state={{ origin: { pathname, hash, search } }}
      />
    );
  }

  return <>{children}</>;
};
