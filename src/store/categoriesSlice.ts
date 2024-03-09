import {Category} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, fetchAllCategories, removeCategory} from './categoriesThunks';
import {RootState} from '../app/store';

interface CategoriesState {
  categoryItems: Category[];
  fetchAllCategoriesLoading: boolean;
  createCategoryLoading: boolean;
  deleteCategoryLoading: boolean | string;

}

const initialState: CategoriesState = {
  categoryItems: [],
  fetchAllCategoriesLoading: false,
  createCategoryLoading: false,
  deleteCategoryLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.fetchAllCategoriesLoading = true;
    }).addCase(fetchAllCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchAllCategoriesLoading = false;
      state.categoryItems = categories;
    }).addCase(fetchAllCategories.rejected, (state) => {
      state.fetchAllCategoriesLoading = false;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.createCategoryLoading = true;
    }).addCase(createCategory.fulfilled, (state) => {
      state.createCategoryLoading = false;
    }).addCase(createCategory.rejected, (state) => {
      state.createCategoryLoading = false;
    });

    builder.addCase(removeCategory.pending, (state, {meta: {arg: catID}}) => {
      state.deleteCategoryLoading = catID;
    }).addCase(removeCategory.fulfilled, (state) => {
      state.deleteCategoryLoading = false;
    }).addCase(removeCategory.rejected, (state) => {
      state.deleteCategoryLoading = false;
    });
  }
});


export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categoryItems;
export const selectFetchAllCategoriesLoading = (state: RootState) => state.categories.fetchAllCategoriesLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.categories.createCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.categories.deleteCategoryLoading;

