import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectTransactions} from '../store/transactionsSlice';
import React, {useCallback, useEffect, useState} from 'react';
import {createTransaction, fetchAllTransactions, removeTransaction} from '../store/transactionsThunks';
import {selectCategories} from '../store/categoriesSlice';
import {fetchAllCategories} from '../store/categoriesThunks';
import TransactionsItem from '../components/TransactionsItem/TransactionsItem';
import Modal from '../components/Modal/Modal';
import {ApiTransactionForm, Category} from '../types';

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [transactionForm, setTransactionForm] =
    useState<ApiTransactionForm>({
      type: '',
      amount: 0,
      categoryName: '',
      createdAt: ''
  });

  const [categoryList, setCategoryList] = useState<Category[]>([]);


  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);

  const fetchTransactions = useCallback( async () => {
    await dispatch(fetchAllCategories());
    await dispatch(fetchAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  const getTotal = () => {
    return transactions.reduce((acc, curr) => {
      const index = categories.findIndex(item => item.id === curr.category);
      if (index !== -1) {
        if (categories[index].type === 'expense') {
          acc = acc - curr.amount;
        } else {
          acc = acc + curr.amount;
        }
      }
      return acc;

    }, 0);
  };

  const cancel = () => setShowModal(false);
  const addHandler = async () => {
    const index = categories.findIndex(item => item.name === transactionForm.categoryName);
    if (index !== -1) {
      const catID = categories[index].id;

      await dispatch(createTransaction({
        amount: transactionForm.amount,
        category: catID,
        createdAt: new Date().toISOString()
      }));
      await fetchTransactions();
    }
    setTransactionForm({
      type: '',
      amount: 0,
      categoryName: '',
      createdAt: ''
    });

    cancel();

  };

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
    if (e.target.name === 'type') {
      const newCategoryList = categories.filter(item => item.type === e.target.value);
      setCategoryList(newCategoryList);
    }
    setTransactionForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  };

  const deleteHandle = async (id: string) => {
    await dispatch(removeTransaction(id));
    await fetchTransactions();
  };

  const modal = (
    <Modal
      show={showModal}
      title="Add Expense/Income"
      onClose={cancel}
    >
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type" name="type"
            defaultValue={transactionForm.type}
            onChange={changeForm}
          >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category</label>
          <select
            className="form-select"
            id="categoryName"
            name="categoryName"
            defaultValue={transactionForm.categoryName}
            onChange={changeForm}
          >
            <option value="">Select category</option>
            {categoryList.map(item => (
              <option key={Math.random()} value={item.name} className="text-capitalize">{item.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            value={transactionForm.amount}
            onChange={changeForm}
          />
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="btn btn-danger"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={addHandler}
        >
          Add
        </button>
      </div>
    </Modal>);


  return (
    <div>
      <div className="d-flex justify-content-between mt-3">
        <div className="col fw-bold mt-3" style={getTotal() > 0 ? {color: 'green'} : {color: 'red'}}>
          <span className="border border-light border-2 p-3">Total: {getTotal()} KGS</span>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>Add</button>
      </div>


      {transactions.map(item => (
        <TransactionsItem
          key={item.id}
          item={item}
          categories={categories}
          onDelete={() => deleteHandle(item.id)}
        />
      ))}
      {modal}
    </div>
  );
};

export default Transactions;