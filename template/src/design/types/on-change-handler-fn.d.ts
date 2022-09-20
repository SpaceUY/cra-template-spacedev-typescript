import { InputChangeEvent } from './input-change-event';

export type OnChangeHandlerFn<T> = (event: InputChangeEvent<T>) => void;
