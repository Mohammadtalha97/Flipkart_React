import axios from "../../helpers/axios";
import { authConstant } from "../constant";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstant.LOGIN_REQUEST,
    });

    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstant.LOGIN_FAILUER,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILUER,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstant.LOGOUT_REQUEST,
    });
    const res = await axios.post("/admin/signout");

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstant.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstant.LOGOUT_FAILUER,
        payload: { error: res.data.error },
      });
    }

    //we have to destroy TOKEN
  };
};
