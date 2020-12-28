import { authConstant } from "../constant";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticated: true,
        authenticating: false,
      };
      break;

    case authConstant.LOGIN_FAILUER:
      state = {
        authenticating: false,
        authenticated: false,
      };
      break;

    case authConstant.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authConstant.LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;

    case authConstant.LOGOUT_FAILUER:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
      break;
  }

  return state;
};
