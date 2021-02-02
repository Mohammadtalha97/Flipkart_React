import { orderConstant } from "../constant/index.js";

const initialSatatus = {
  orders: [],
};

const orderReducer = (state = initialSatatus, action) => {
  switch (action.type) {
    case orderConstant.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
    default:
      break;
  }
  return state;
};

export default orderReducer;
