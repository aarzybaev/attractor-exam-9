import CategoriesItem from '../components/CategoriesItem/CategoriesItem';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {useCallback, useEffect} from 'react';
import {selectCategories} from '../store/categoriesSlice';
import {fetchAllCategories} from '../store/categoriesThunks';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchCategories = useCallback(async ()=> {
    await dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);
  console.log(categories);
  return (
    <div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Categories</h5>
          <button type="button" className="btn btn-primary btn-sm">Add</button>
        </div>
      {categories.map(item => (
        <CategoriesItem
          key={item.id}
          type={item.type}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default Categories;