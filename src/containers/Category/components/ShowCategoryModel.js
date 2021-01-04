import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosCloudUpload,
  IoIosTrash,
} from "react-icons/io";

const ShowCategories = (props) => {
  const {
    handleShow,
    updateCategory,
    deleteCategory,
    renderCategories,
    checked,
    expanded,
    setChecked,
    setExpanded,
  } = props;
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Category</h3>
            <div className="actionBtnContainer">
              <span>Actions : </span>
              <button onClick={handleShow}>
                <IoIosAdd /> <span>Add</span>
              </button>
              <button onClick={updateCategory}>
                <IoIosCloudUpload /> <span>Edit</span>
              </button>
              <button onClick={deleteCategory}>
                <IoIosTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <CheckboxTree
            nodes={renderCategories}
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
    </Container>
  );
};

export default ShowCategories;
