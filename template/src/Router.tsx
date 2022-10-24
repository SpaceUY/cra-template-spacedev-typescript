import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';
import { Text } from 'design';
import { AppRoute } from 'enums/app-route.enum';
import Blockchain from 'examples/components/main-content/Blockchain/Blockchain';
import { Catalog } from 'examples/components/main-content/Catalog/Catalog';
import { Home } from 'examples/components/main-content/Home/Home';
import { Login } from 'examples/components/main-content/Login/Login';
import { State } from 'examples/components/main-content/State/State';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { intl } from 'utilities/i18n/intl.utility';

export const Router: FC = () => {
  return (
    <Routes>
      <Route
        path={AppRoute.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={AppRoute.BLOCKCHAIN}
        element={
        <ProtectedRoute>
          <Blockchain />
        </ProtectedRoute>
        }
      />
      <Route
        path={AppRoute.CATALOG}
        element={
          <ProtectedRoute>
            <Catalog />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.STATE}
        element={
          <ProtectedRoute>
            <State />
          </ProtectedRoute>
        }
      />

      <Route path={AppRoute.LOGIN} element={<Login />} />

      <Route
        path="*"
        element={
          <>
            <Text.h2>{intl.translate({ id: 'Error 404' })}</Text.h2>

            <Text.p>
              {intl.translate(
                {
                  id: "We couldn't find what you were looking for. If you whish you can <a>Go Home</a>",
                },
                {
                  a: (label) => <a href={AppRoute.HOME}>{label}</a>,
                },
              )}
            </Text.p>
          </>
        }
      />
    </Routes>
  );
};
