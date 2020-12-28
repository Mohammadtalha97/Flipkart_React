import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { addCategory, getAllCategory } from "../../redux/actions";

const Category = (props) => {
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleClose = () => {
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("parentId", parentCategoryId);
    formData.append("categoryImage", categoryImage);

    dispatch(addCategory(formData));
    // const cat = {
    //   categoryName,
    //   categoryImage,
    //   parentCategoryId,
    // };

    // console.log(cat);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let categoriesArray = [];
    for (let category of categories) {
      categoriesArray.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoriesArray;
  };

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };

  const handleCategoryImage = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  return (
    <Layout sidebar>
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
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Category;
