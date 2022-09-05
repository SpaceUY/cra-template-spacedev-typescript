export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function noop(): void {
  // no-op function
}

export function isNil(value: unknown): value is undefined | null {
  if (typeof value === 'undefined') {
    return true;
  }

  return value === null;
}
