import { productConstant } from "../constant";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstant.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.productes,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default productReducer;
