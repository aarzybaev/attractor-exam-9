import {Category, Transaction} from '../../types';
import React from 'react';
import dayjs from 'dayjs';

interface Props {
  item: Transaction;
  categories: Category[];
  onDelete: React.MouseEventHandler;
}
const TransactionsItem: React.FC<Props> = ({
  item,
  categories,
  onDelete
}) => {

  const getCategoryName = (id: string) => {
    const index = categories.findIndex(item => item.id === id);
    if (index !== -1) {
      return categories[index].name;
    }
  };

  const getCategoryType = (id: string) => {
    const index = categories.findIndex(item => item.id === id);
    if (index !== -1) {
      return categories[index].type;
    }
  };

  const styleColor = getCategoryType(item.category) === 'expense' ? {color: 'red'} : {color: 'green'};
  return (
    <div className="col-8 d-flex align-items-center mt-2 m-auto border border-light border-2 p-2">
      <span>{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
      <span className="ms-5">{getCategoryName(item.category)}</span>
      <span className="ms-auto me-5" style={styleColor}>
        {getCategoryType(item.category) === 'expense' ? "-" + item.amount : "+" + item.amount} KGS</span>
      <div>
        <button type="button" className="btn btn-warning btn-sm">Edit</button>
        <button type="button" className="btn btn-danger btn-sm ms-2" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TransactionsItem;