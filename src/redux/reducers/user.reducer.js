import { userConstant } from "../constant";

const initialState = {
  error: null,
  message: "",
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case userConstant.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;

    case userConstant.USER_REGISTER_FAILUER:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default userReducer;
