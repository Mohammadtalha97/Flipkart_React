import axiosInstance from "../../helpers/axios";
import axios from "../../helpers/axios";
import { categoryConstant } from "../constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstant.GET_ALL_CATEGORIES_REQUEST,
    });

    const res = await axios.get(`category/getcategory`);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: categoryList,
        },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_FAILUER,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstant.ADD_NEW_CATEGORY_REQUEST,
    });
    const res = await axios.post("/category/create", form);
    if (res.status === 201) {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstant.ADD_NEW_CATEGORY_FAILUER,
        payload: res.data.error,
      });
    }
  };
};
