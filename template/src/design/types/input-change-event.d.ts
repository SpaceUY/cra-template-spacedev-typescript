export type InputChangeEvent<T = unknown> = {
  target: {
    value: T;
    name: string;
  };
};
