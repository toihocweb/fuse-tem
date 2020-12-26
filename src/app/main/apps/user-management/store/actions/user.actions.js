import axios from "axios";
import { FuseUtils } from "@fuse";
import { showMessage } from "app/store/actions/fuse";

export const SAVE_USER = "[USER MANAGEMENT] SAVE USER";
export const SAVE_ERROR = "[USER MANAGEMENT] SAVE ERROR";
export const GET_USER = "[USER MANAGEMENT] GET USER";

export const initNewUser = () => {
  const data = {
    uuid: FuseUtils.generateGUID(),
    from: "custom-db",
    password: "",
    role: "guest",
    data: {
      displayName: "",
      photoURL: "",
      email: "",
      settings: {},
      shortcuts: [],
    },
  };

  return {
    type: GET_USER,
    payload: data,
  };
};

export const saveUser = (data) => {
  const request = axios.post("/api/user/new", data);

  return (dispatch) => {
    request.then((response) => {
      if (response.data.error)
        return dispatch({
          type: SAVE_ERROR,
          payload: response.data.error,
        });
      else {
        dispatch(showMessage({ message: "User Saved" }));
        return dispatch({
          type: SAVE_USER,
          payload: response.data,
        });
      }
    });
  };
};
