import CategoriesItem from '../components/CategoriesItem/CategoriesItem';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {
  selectCategories, selectCategory,
  selectCreateCategoryLoading,
  selectDeleteCategoryLoading,
  selectFetchAllCategoriesLoading,
  selectUpdateCategoryLoading
} from '../store/categoriesSlice';
import {
  createCategory,
  fetchAllCategories,
  fetchOneCategory,
  removeCategory,
  updateCategory
} from '../store/categoriesThunks';
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal/Modal';
import ButtonSpinner from '../components/ButtonSpinner/ButtonSpinner';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
    const [categoryForm, setCategoryForm] = useState({
      name: '',
      type: 'income'
    });

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategory);
  const isLoading = useAppSelector(selectFetchAllCategoriesLoading);
  const isCreating = useAppSelector(selectCreateCategoryLoading);
  const isDeleting = useAppSelector(selectDeleteCategoryLoading);
  const isUpdateLoading = useAppSelector(selectUpdateCategoryLoading);

  const fetchCategories = useCallback(async ()=> {
    await dispatch(fetchAllCategories());
  }, [dispatch]);

  const fetchCategory = useCallback(async (id: string) => {
    await dispatch(fetchOneCategory(id));
  }, [dispatch]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const onRemove = async (id: string) => {
    await dispatch(removeCategory(id));
    await fetchCategories();
  };

  const onEdit =  async (id: string) => {
    await fetchCategory(id);
    if (category) {
      setCategoryForm({
        name: category.name,
        type: category.type
      });
      setShowModal(true);
    }

  };

  const addCategory = async () => {
    if (categoryForm.name.trim()) {
      await dispatch(createCategory(categoryForm));
      await fetchCategories();
      cancel();
      setCategoryForm({
        name: '',
        type: 'income'
      });
    } else {
      window.alert('White space is not restricted');
    }
  };

  const cancel = () => setShowModal(false);

  const changeForm = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setCategoryForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const editeCategory = async (id: string) => {
    await dispatch(updateCategory({catID: id, apiCategory: categoryForm}));
    await fetchCategories();
    cancel();
    setCategoryForm({
      name: '',
      type: 'income'
    });
  };

  const modal = (
    <Modal
      show={showModal}
      title={category ? 'Edit':'Add'}
      onClose={cancel}
    >
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Category name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={categoryForm.name}
            onChange={changeForm}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Category type</label>
          <select
            className="form-select"
            id="type" name="type"
            defaultValue={categoryForm.type}
            onChange={changeForm}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
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
          onClick={() => category ? editeCategory(category.id) : addCategory() }
          disabled={isCreating || isUpdateLoading}
        >
          {category ? 'Edit': 'Add' }
          {isCreating && <ButtonSpinner /> || isUpdateLoading && <ButtonSpinner />}
        </button>
      </div>
    </Modal>
  );



  return isLoading ? <Spinner/> : (
    <div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Categories</h5>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        </div>
      {categories.map(item => (
        <CategoriesItem
          key={item.id}
          item={item}
          onRemove={() => onRemove(item.id)}
          onEdit={() => onEdit(item.id)}
          isDeleting={isDeleting}
        />
      ))}

      {modal}

    </div>

  );
};

export default Categories;