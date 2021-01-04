const createCategoryList = (categories, option = []) => {
  for (let category of categories) {
    option.push({
      id: category._id,
      value: category._id,
      name: category.name,
      parentId: category.parentId,
      type: category.type,
    });
    if (category.children.length > 0) {
      createCategoryList(category.children, option);
    }
  }
  return option;
};

export default createCategoryList;
