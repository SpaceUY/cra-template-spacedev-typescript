import { ReactNode } from 'react';

export type FcDefaultProps = {
  id?: string;
  children?: ReactNode;
  className?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labeled-by'?: string;
};
