import axios from "axios";
import jwtDecode from "jwt-decode";
import FuseUtils from "@fuse/FuseUtils";
import history from "@history";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    if (!access_token) {
      history.push({
        pathname: "/login",
      });
      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios({
        baseURL,
        url: "/auth/register",
        method: "POST",
        data,
        auth: {
          username: process.env.REACT_APP_BASICAUTH_USER,
          password: process.env.REACT_APP_BASICAUTH_PASSWORD,
        },
      })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          }
        })
        .catch((err) => reject(err.response.data.error));

      // axios.post("/api/auth/register", data).then((response) => {
      //   if (response.data.user) {
      //     this.setSession(response.data.access_token);
      //     resolve(response.data.user);
      //   } else {
      //     reject(response.data.error);
      //   }
      // });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios({
        baseURL,
        url: "/auth/login",
        method: "POST",
        data: { email, password },
        auth: {
          username: process.env.REACT_APP_BASICAUTH_USER,
          password: process.env.REACT_APP_BASICAUTH_PASSWORD,
        },
      })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          }
        })
        .catch((err) => reject(err.response.data.error));
      // axios
      //   .get("/api/auth", {
      //     data: {
      //       email,
      //       password,
      //     },
      //   })
      //   .then((response) => {
      //     if (response.data.user) {
      //       this.setSession(response.data.access_token);
      //       resolve(response.data.user);
      //     } else {
      //       reject(response.data.error);
      //     }
      //   });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios({
        baseURL,
        url: "/auth/current",
        method: "GET",
        headers: { Authorization: "Bearer " + this.getAccessToken() },
      })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          }
        })
        .catch((err) => {
          reject(err.response.data.error);
          history.push({
            pathname: "/login",
          });
        });
      // axios
      //   .get("/api/auth/access-token", {
      //     data: {
      //       access_token: this.getAccessToken(),
      //     },
      //   })
      //   .then((response) => {
      //     if (response.data.user) {
      //       this.setSession(response.data.access_token);
      //       resolve(response.data.user);
      //     } else {
      //       reject(response.data.error);
      //     }
      //   });
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user: user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    history.push({
      pathname: "/login",
    });
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;
