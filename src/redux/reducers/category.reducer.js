import { categoryConstant } from "../constant";

const intialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, stateCategory, newCategory) => {
  let myCategories = [];

  //if category is new without any  parent
  if (parentId === undefined) {
    return [
      ...stateCategory,
      {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        type: newCategory.type,
        children: [],
      },
    ];
  }

  for (let cat of stateCategory) {
    if (cat._id === parentId) {
      const newCat = {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        parentId: newCategory.parentId,
        type: newCategory.type,
        children: [],
      };

      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0 ? [...cat.children, newCat] : [newCat],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, newCategory)
          : [],
      });
    }
  }

  return myCategories;
};

const categoryReducer = (state = intialState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
      break;
    case categoryConstant.GET_ALL_CATEGORIES_FAILUER:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        loading: false,
        categories: updatedCategories,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_FAILUER:
      state = {
        ...intialState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstant.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstant.UPDATE_CATEGORY_FAILUER:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstant.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstant.DELETE_CATEGORY_FAILUER:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default categoryReducer;
