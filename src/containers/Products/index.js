import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

import Layout from "../../components/Layout";
import Input from "../../components/UI_Common/Input";
import Model from "../../components/UI_Common/Model";
import { addProduct } from "../../redux/actions/";
import { generatePublicURL } from "../../urlConfig";

const Product = (props) => {
  //userInput Field
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productPicture, setProductPicture] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);

  //store
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  //show productDetailmodel
  const [productDetailModel, setProductDetailModel] = useState(false);
  const [productDetail, setProductDetail] = useState(null);

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };
  const handleClose = () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("category", categoryId);

    for (let pic of productPicture) {
      formData.append("productPicture", pic);
    }

    dispatch(addProduct(formData));
    setShow(false);
  };
  const handleProductImage = (event) => {
    setProductPicture([...productPicture, event.target.files[0]]);
  };
  const handleShow = () => setShow(true);

  const renderProductTable = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => showProductDetailsModel(product)}
                  key={product._id}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModel = () => {
    return (
      <Model
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modelTitle={"Add New Product"}
      >
        <Input
          label="Name"
          value={productName}
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          label="Quanitity"
          value={quantity}
          placeholder="Quantity Name"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Category</label>
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Option</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPicture.length > 0
          ? productPicture.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductImage}
        />
      </Model>
    );
  };

  const handleCloseProductDetailsModel = () => {
    setProductDetailModel(false);
  };

  const showProductDetailsModel = (product) => {
    setProductDetail(product);
    setProductDetailModel(true);
  };

  const renderproductDetailModel = () => {
    //why null check..?
    if (productDetail == null) {
      return null;
    } else {
      return (
        <Model
          show={productDetailModel}
          handleClose={handleCloseProductDetailsModel}
          modelTitle={"Product Details"}
          size="lg"
        >
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value">{productDetail.name}</p>
            </Col>
            <Col md="6">
              <label className="key">Price</label>
              <p className="value">{productDetail.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className="key">Quanitity</label>
              <p className="value">{productDetail.quantity}</p>
            </Col>
            <Col md="6">
              <label className="key">Category</label>
              <p className="value">{productDetail.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className="key">Description</label>
              <p className="value">{productDetail.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Product Pictures</label>
              <div style={{ display: "flex" }}>
                {productDetail.productPictures.map((x) => (
                  <div className="productImageContainer">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img className="value" src={generatePublicURL(x.img)} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Model>
      );
    }
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}> Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProductTable()}</Col>
        </Row>
      </Container>
      {renderAddProductModel()}
      {renderproductDetailModel()}
    </Layout>
  );
};

export default Product;
