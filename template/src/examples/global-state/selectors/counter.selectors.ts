import { CounterState } from 'examples/global-state/reducers/counter.reducer';

export const selectGlobalCount = (state: { counter: CounterState }) =>
  state.counter.count;
