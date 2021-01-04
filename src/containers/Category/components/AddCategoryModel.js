import React from "react";

import Input from "../../../components/UI_Common/Input";
import Model from "../../../components/UI_Common/Model";
import { Col, Row } from "react-bootstrap";

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
    onSubmit,
  } = props;
  return (
    <Model
      onSubmit={onSubmit}
      show={show}
      handleClose={handleClose}
      modelTitle={modelTitle}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
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
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </Model>
  );
};

export default AddCategoryModel;
