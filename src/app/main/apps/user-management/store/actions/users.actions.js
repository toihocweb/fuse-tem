import axios from "axios";

export const GET_USERS = "[USER MANAGEMENT] GET USERS";
export const SET_USER_SEARCH_TEXT = "[USER MANAGEMENT] SET USER SEARCH TEXT";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const getUsers = () => {
  const request = axios({ baseURL, url: "/user", method: "GET" });

  return (dispatch) =>
    request.then((response) => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    });
};

export const setUserSearchText = (text) => {
  return {
    type: SET_USER_SEARCH_TEXT,
    payload: text,
  };
};
