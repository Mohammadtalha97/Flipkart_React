import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Modal from "../../components/UI_Common/Model";
import Input from "../../components/UI_Common/Input";
import createCategoryList from "../../helpers/categoryList";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../redux/actions";

const NewPage = (props) => {
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const [createModel, setCreateModel] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategoryList(createCategoryList(category.categories));
  }, [category]);

  //Page
  useEffect(() => {
    if (!page.loading) {
      setCreateModel(false);
      setCategoryName("");
      setTitle("");
      setDesc("");
      setCategoryId("");
      setType("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);
  const handleBannerImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    // e.preventDefault();

    if (title === "") {
      alert("Title is required");
      setCreateModel(false);

      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category", categoryId);
    formData.append("type", type);
    banners.forEach((banner, index) => {
      formData.append("banners", banner);
    });

    products.forEach((product, index) => {
      formData.append("products", product);
    });

    dispatch(createPage(formData));
    // setCreateModel(false);
  };

  const onCategoryChange = (e) => {
    const userSelection = e.target.value;
    const category = categoryList.find((cat) => cat.value === userSelection);
    // setCategoryName(userSelection);
    setCategoryId(userSelection);
    setType(category.type);
  };

  const renderCreatePageModel = () => {
    return (
      <Modal
        show={createModel}
        modelTitle={"Create New"}
        handleClose={() => setCreateModel(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                placeholder="Select Category"
                options={categoryList}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Desc"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row>
                    <Col key={index}>{banner.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input
                type="file"
                name="banners"
                onChange={(e) => handleBannerImage(e)}
              />
            </Col>
          </Row>

          <Row>
            {products.length > 0
              ? products.map((product, index) => (
                  <Row>
                    <Col key={index}>{product.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <>
          <span>Creating Page....</span>
        </>
      ) : (
        <>
          {renderCreatePageModel()}
          <button onClick={() => setCreateModel(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};

export default NewPage;
