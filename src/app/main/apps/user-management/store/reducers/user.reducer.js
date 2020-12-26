import * as actions from "../actions";

const initialState = {
  data: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET: {
      return { ...initialState };
    }
    case actions.GET_USER: {
      return { ...state, data: action.payload, error: null };
    }
    case actions.SAVE_USER: {
      return { ...state, data: action.payload, error: null };
    }
    case actions.SAVE_ERROR: {
      return { ...state, error: action.payload, data: null };
    }
    default: {
      return state;
    }
  }
}
