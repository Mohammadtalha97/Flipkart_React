import Model from "../../../components/UI_Common/Model";

const DeleteCategoryModel = (props) => {
  const {
    deleteCategoryModel,
    setDeleteCategoryModel,
    deleteCategoryData,
    expandedArray,
    checkedArray,
  } = props;
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
export default DeleteCategoryModel;
