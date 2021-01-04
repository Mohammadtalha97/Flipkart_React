import { pageConstants } from "../constant";

const initialState = {
  error: null,
  loading: false,
  page: {},
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case pageConstants.CREATE_PAGE_FAILUER:
      state = {
        ...state,
        loading: false,
        error: action.type.error,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default pageReducer;
