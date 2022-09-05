type TargetStorage = typeof window.localStorage | typeof window.sessionStorage;

function get<T = unknown>(targetStorage: TargetStorage, key: string): T | null;
function get<T = unknown>(
  targetStorage: TargetStorage,
  key: string,
  defaultValue: T,
): T;
function get<T = unknown>(
  targetStorage: TargetStorage,
  key: string,
  defaultValue?: T,
): unknown {
  try {
    const stored = targetStorage.getItem(key);

    if (stored === null) {
      return defaultValue ?? null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.warn(error);

    return defaultValue ?? null;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Serializable = number | string | boolean | Object | Array<unknown> | null;

function set(
  targetStorage: TargetStorage,
  key: string,
  value: Serializable,
): void {
  targetStorage.setItem(key, JSON.stringify(value));
}

function remove(targetStorage: TargetStorage, key: string): void {
  targetStorage.removeItem(key);
}

function clear(targetStorage: TargetStorage): void {
  targetStorage.clear();
}

function localGet<T = unknown>(key: string): T | null;
function localGet<T = unknown>(key: string, defaultValue: T): T;
function localGet<T = unknown>(key: string, defaultValue?: T): any {
  return get(window.localStorage, key, defaultValue);
}

function sessionGet<T = unknown>(key: string): T | null;
function sessionGet<T = unknown>(key: string, defaultValue: T): T;
function sessionGet<T = unknown>(key: string, defaultValue?: T): any {
  return get(window.sessionStorage, key, defaultValue);
}

export const storage = {
  local: {
    get: localGet,

    set: (key: string, value: Serializable) =>
      set(window.localStorage, key, value),

    remove: (key: string) => remove(window.localStorage, key),

    clear: () => clear(window.localStorage),
  },
  session: {
    get: sessionGet,

    set: (key: string, value: Serializable) =>
      set(window.sessionStorage, key, value),

    remove: (key: string) => remove(window.sessionStorage, key),

    clear: () => clear(window.sessionStorage),
  },
};
