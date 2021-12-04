import { REGISTER_OWN_PETS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_OWN_PETS:
        return payload;
    default:
      return state;
  }
}
