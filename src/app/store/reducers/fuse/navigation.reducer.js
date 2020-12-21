import * as Actions from "../../actions/fuse/index";
import navigationConfig from "app/fuse-configs/navigationConfig";

const initialState = navigationConfig.slice(0, 1);

const navigation = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NAVIGATION: {
      return [...state];
    }
    case Actions.SET_NAVIGATION: {
      return [...action.navigation];
    }
    case Actions.RESET_NAVIGATION: {
      return [...initialState];
    }
    default: {
      return state;
    }
  }
};

export default navigation;
