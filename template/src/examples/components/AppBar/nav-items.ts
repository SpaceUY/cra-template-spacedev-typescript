import { AppRoute } from 'enums/app-route.enum';
import { intl } from 'utilities/i18n/intl.utility';

export const navItems = [
  {
    label: intl.translate({ id: 'Home' }),
    to: AppRoute.HOME,
  },
  {
    label: intl.translate({ id: 'Catalog' }),
    to: AppRoute.CATALOG,
  },
  {
    label: intl.translate({ id: 'State' }),
    to: AppRoute.STATE,
  },
  {
    label: intl.translate({ id: 'Blockchain' }),
    to: AppRoute.BLOCKCHAIN,
  },
];
