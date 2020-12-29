import axios from "../../helpers/axios";
import { productConstant } from "../constant";

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.ADD_NEW_PRODUCT_REQUEST,
    });
    const res = await axios.post("product/create", form);

    if (res.status === 201) {
      dispatch({
        type: productConstant.ADD_NEW_PRODUCT_SUCCESS,
      });
    } else {
      dispatch({
        type: productConstant.ADD_NEW_PRODUCT_FAILUER,
      });
    }
  };
};
