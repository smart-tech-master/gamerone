import produce from 'immer';

import { MiscState, MiscActionTypes } from './types';

export const initState: MiscState = {};

export default function miscReducer(
  state = initState,
  action: MiscActionTypes,
) {
  return produce(state, () => {
    switch (action.type) {
      default:
        break;
    }
  });
}
