import axios from "axios";

export const GET_USERS = "[USER MANAGEMENT] GET USERS";
export const SET_USER_SEARCH_TEXT = "[USER MANAGEMENT] SET USER SEARCH TEXT";

export const getUsers = () => {
  const request = axios.get("/api/user/all");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USERS,
        payload: response.data,
      })
    );
};

export const setUserSearchText = (text) => {
  return {
    type: SET_USER_SEARCH_TEXT,
    payload: text,
  };
};
