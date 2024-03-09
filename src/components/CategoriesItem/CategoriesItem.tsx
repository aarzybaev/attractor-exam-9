import React from 'react';

interface Props {
  type: string;
  name: string;
  onRemove: React.MouseEventHandler;
  onEdit: React.MouseEventHandler;
}
const CategoriesItem: React.FC<Props> = ({
  type,
  name,
  onRemove,
  onEdit
}) => {

  return (
    <div className="d-flex justify-content-between col-8 m-auto mb-2 border border-light border-2 p-2">
      <span>{name}</span>
      <div>
        <span className="me-5 text-capitalize" style={type === "income"? {color: "green"} : {color: "red"} }>{type}</span>
        <button
          className="btn btn-warning btn-sm"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={onRemove}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoriesItem;