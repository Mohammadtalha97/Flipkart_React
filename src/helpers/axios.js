import axios from "axios";

import { api } from "../urlConfig";
import store from "../redux/store";
import { authConstant } from "../redux/constant";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    authorization: token ? `Bearer ${token}` : ``,
  },
});

axiosInstance.interceptors.request.use((req) => {
  //insted of old localStorage token we use new token
  //new token at the time of login
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500) {
      localStorage.clear();
      store.dispatch({
        type: authConstant.LOGOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

//can not import outside from src in create-react-app
//do eject and remove ModuleScopePlugin from webpack configuration file.
