import "./style.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import {
  addCategory,
  deleteCategories as deleteAction,
  updateCategories,
} from "../../redux/actions";
import AddCategoryModel from "./components/AddCategoryModel";
import DeleteCategoryModel from "./components/DeleteCategoryModel";
import ShowCategories from "./components/ShowCategoryModel";
import UpdatedCategoriesModel from "./components/UpdateCategoriesModel";

const Category = (props) => {
  const category = useSelector((state) => state.category);

  const [show, setShow] = useState(false);

  //CheckboxTree hold's ID of category
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  //Array Of Checked, Expanded With {name, value, parentId}
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  //Edit CategoryModel
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);

  //Delete CategoryModel
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const handleAddFormData = () => {
    // if()
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("parentId", parentCategoryId);
    formData.append("categoryImage", categoryImage);

    dispatch(addCategory(formData));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //created array for CheckboxTree
  const renderCategories = (categories) => {
    let categoriesArray = [];
    for (let category of categories) {
      categoriesArray.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categoriesArray;
  };

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({
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

  const handleCategoryImage = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  //On Edit Click
  const updateCategory = () => {
    updateCheckedAndExpandCategories();
    setUpdateCategoryModel(true);
  };

  const updateCheckedAndExpandCategories = () => {
    const categories = createCategoryList(category.categories);
    const chArray = [];
    const exArray = [];

    //Checked
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const categoryMatchedFromChecked = categories.find(
          (cat, _index) => cat.value === categoryId
        );
        category && chArray.push(categoryMatchedFromChecked);
      });
    setCheckedArray(chArray);

    //Expanded
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const categoryMatchedFromExpanded = categories.find(
          (cat, _index) => cat.value === categoryId
        );
        category && exArray.push(categoryMatchedFromExpanded);
      });
    setExpandedArray(exArray);
  };

  //On Delete Click
  const deleteCategory = () => {
    updateCheckedAndExpandCategories();
    setDeleteCategoryModel(true);
  };

  //Edit Logic
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index
          ? {
              ...item,
              [key]: value,
            }
          : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index
          ? {
              ...item,
              [key]: value,
            }
          : item
      );
      setExpandedArray(updatedExpandedArray);
    } else {
    }
  };

  //UpdateData handle
  const updateCategoriesForm = () => {
    const formData = new FormData();

    checkedArray.forEach((item, index) => {
      formData.append("_id", item.value);
      formData.append("name", item.name);
      formData.append("parentId", item.parentId ? item.parentId : "");
      formData.append("type", item.type);
    });

    expandedArray.forEach((item, index) => {
      formData.append("_id", item.value);
      formData.append("name", item.name);
      formData.append("parentId", item.parentId ? item.parentId : "");
      formData.append("type", item.type);
    });

    dispatch(updateCategories(formData));
    setUpdateCategoryModel(false);
  };

  //delete category data
  const deleteCategoryData = () => {
    const checkedIdsArray = checkedArray.map((item) => ({ _id: item.value }));

    if (checkedIdsArray.length > 0) {
      dispatch(deleteAction(checkedIdsArray));
      setDeleteCategoryModel(false);
    }
  };

  const categoryList = createCategoryList(category.categories);
  return (
    <Layout sidebar>
      {/* Show Categories */}
      <ShowCategories
        handleShow={handleShow}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
        renderCategories={renderCategories(category.categories)}
        checked={checked}
        expanded={expanded}
        setChecked={setChecked}
        setExpanded={setExpanded}
      />
      {/* Add Categories */}
      <AddCategoryModel
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        onSubmit={handleAddFormData}
        modelTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        setParentCategoryId={setParentCategoryId}
        parentCategoryId={parentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      {/* Edit Categories */}
      <UpdatedCategoriesModel
        show={updateCategoryModel}
        handleClose={() => setUpdateCategoryModel(false)}
        onSubmit={updateCategoriesForm}
        modelTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      {/* Delete Categories */}
      <DeleteCategoryModel
        deleteCategoryModel={deleteCategoryModel}
        setDeleteCategoryModel={setDeleteCategoryModel}
        deleteCategoryData={deleteCategoryData}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
};

export default Category;
