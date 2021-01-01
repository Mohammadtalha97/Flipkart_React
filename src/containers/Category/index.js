import "react-checkbox-tree/lib/react-checkbox-tree.css";

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckbox,
  IoIosCheckboxOutline,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/UI_Common/Input";
import Model from "../../components/UI_Common/Model";
import {
  addCategory,
  deleteCategories as deleteAction,
  getAllCategory,
  updateCategories,
} from "../../redux/actions";

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

  const handleClose = () => {
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

    dispatch(updateCategories(formData)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategoryModel(false);
  };

  //Render Edit Model
  const renderUpdatedCategoriesModel = () => {
    return (
      <Model
        show={updateCategoryModel}
        handleClose={updateCategoriesForm}
        modelTitle={"Update Categories"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select Option</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* Checked */}
        <h6>Checked Categories</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select Option</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* <input
        type="file"
        name="categoryImage"
        onChange={handleCategoryImage}
      /> */}
      </Model>
    );
  };
  //Render Add Model
  const renderAddCategoryModel = () => {
    return (
      <Model
        show={show}
        handleClose={handleClose}
        modelTitle={"Add New Category"}
      >
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
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Model>
    );
  };
  //Render Show Categories
  const renderShowCategories = () => {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}> Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={updateCategory}>Edit</button>
            <button onClick={deleteCategory}>Delete</button>
          </Col>
        </Row>
      </Container>
    );
  };

  //delete category data
  const deleteCategoryData = () => {
    const checkedIdsArray = checkedArray.map((item) => ({ _id: item.value }));
    const expandedIdsArray = expandedArray.map((item) => ({ _id: item.value }));

    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    dispatch(deleteAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setDeleteCategoryModel(false);
      }
    });
  };
  //Render Delete Model
  const renderDeleteCategoryModel = () => {
    return (
      <Model
        show={deleteCategoryModel}
        modelTitle="Confirm"
        handleClose={() => setDeleteCategoryModel(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("No button click");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategoryData,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}

        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Model>
    );
  };

  return (
    <Layout sidebar>
      {/* Show Categories */}
      {renderShowCategories()}
      {/* Add Categories */}
      {renderAddCategoryModel()}
      {/* Edit Categories */}
      {renderUpdatedCategoriesModel()}
      {/* Delete Categories */}
      {renderDeleteCategoryModel()}
    </Layout>
  );
};

export default Category;
