import axios from "../../helpers/axios";
import { categoryConstant, orderConstant, productConstant } from "../constant";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post("/initialData");

    if (res.status === 200) {
      const { categories, productes, orders } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });

      dispatch({
        type: productConstant.GET_ALL_PRODUCTS_SUCCESS,
        payload: { productes },
      });

      dispatch({
        type: orderConstant.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
