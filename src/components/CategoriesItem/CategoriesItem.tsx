import React from 'react';
import {Category} from '../../types';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

interface Props {
  item: Category
  onRemove: React.MouseEventHandler;
  onEdit: React.MouseEventHandler;
  isDeleting: boolean | string;
}
const CategoriesItem: React.FC<Props> = ({
  item,
  onRemove,
  onEdit,
  isDeleting
}) => {

  const isLoading = isDeleting == item.id;

  return (
    <div className="d-flex justify-content-between col-8 m-auto mb-2 border border-light border-2 p-2">
      <span>{item.name}</span>
      <div>
        <span className="me-5 text-capitalize"
              style={item.type === "income"? {color: "green"} : {color: "red"} }>{item.type}</span>
        <button
          className="btn btn-warning btn-sm"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={onRemove}
          disabled={isLoading}
        >
          Delete
          {isLoading && <ButtonSpinner />}
        </button>
      </div>
    </div>
  );
};

export default CategoriesItem;