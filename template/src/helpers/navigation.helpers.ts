import { Path } from 'react-router-dom';
import { isNil } from './nodash.helpers';

export function isPath(value?: unknown): value is Path {
  if (isNil(value)) {
    return false;
  }

  const path = value as Path;

  const hasPathname = 'pathname' in path && typeof path.pathname === 'string';
  const hasSearch = 'search' in path && typeof path.search === 'string';
  const hasHash = 'hash' in path && typeof path.hash === 'string';

  return hasPathname && hasSearch && hasHash;
}
