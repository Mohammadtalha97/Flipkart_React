import axios from "../../helpers/axios";

import { userConstant } from "../constant";

export const registration = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.USER_REGISTER_REQUEST,
    });

    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    console.log(res);

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstant.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstant.USER_REGISTER_FAILUER,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
