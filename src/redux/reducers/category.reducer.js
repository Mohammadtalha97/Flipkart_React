import { categoryConstant } from "../constant";

const intialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, stateCategory, newCategory) => {
  let myCategories = [];
  for (let cat of stateCategory) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: newCategory._id,
                    name: newCategory.name,
                    slug: newCategory.slug,
                    parentId: newCategory.parentId,
                    children: newCategory.children,
                  },
                ],
                newCategory
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
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
      };
      break;
    default:
      return state;
  }
  return state;
};

export default categoryReducer;
