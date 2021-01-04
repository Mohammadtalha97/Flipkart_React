import { authReducer } from "./auth.reducers";
import userReducer from "./user.reducer";
import productReducer from "./product.reducer";

import categoryReducer from "./category.reducer";

import orderReducer from "./orders.reducer";
import pageReducer from "./page.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
  page: pageReducer,
});

export default rootReducer;
