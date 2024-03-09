import React from 'react';

interface Props {
  type: string;
  name: string;
}
const CategoriesItem: React.FC<Props> = ({
  type,
  name
}) => {

  return (
    <div className="d-flex justify-content-between col-8 m-auto mb-2 border border-light border-2 p-2">
      <span>{name}</span>
      <div>
        <span className="me-5 text-capitalize" style={type === "income"? {color: "green"} : {color: "red"} }>{type}</span>
        <button className="btn btn-warning btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm ms-2">Delete</button>
      </div>
    </div>
  );
};

export default CategoriesItem;