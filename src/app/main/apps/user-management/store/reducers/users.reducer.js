import * as actions from "../actions";

const initialState = {
  data: [],
  keyword: "",
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USERS: {
      return { ...state, data: action.payload };
    }
    case actions.SET_USER_SEARCH_TEXT: {
      return { ...state, keyword: action.payload };
    }
    default:
      return state;
  }
}
