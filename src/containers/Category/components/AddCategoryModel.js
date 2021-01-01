import React from "react";

import Input from "../../../components/UI_Common/Input";
import Model from "../../../components/UI_Common/Model";

const AddCategoryModel = (props) => {
  const {
    show,
    handleClose,
    modelTitle,
    categoryName,
    setCategoryName,
    setParentCategoryId,
    parentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <Model show={show} handleClose={handleClose} modelTitle={modelTitle}>
      <Input
        value={categoryName}
        placeholder="Category Name"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <select
        className="form-control"
        value={parentCategoryId}
        onChange={(e) => setParentCategoryId(e.target.value)}
      >
        <option>Select Option</option>
        {categoryList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      <input type="file" name="categoryImage" onChange={handleCategoryImage} />
    </Model>
  );
};

export default AddCategoryModel;
