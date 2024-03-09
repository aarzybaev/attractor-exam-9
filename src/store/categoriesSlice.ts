import {Category} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, fetchAllCategories, fetchOneCategory, removeCategory, updateCategory} from './categoriesThunks';
import {RootState} from '../app/store';

interface CategoriesState {
  categoryItems: Category[];
  categoryItem: Category | null;
  fetchAllCategoriesLoading: boolean;
  fetchOneCategoryLoading: boolean;
  createCategoryLoading: boolean;
  deleteCategoryLoading: boolean | string;
  updateCategoryLoading: boolean;
}

const initialState: CategoriesState = {
  categoryItems: [],
  categoryItem: null,
  fetchAllCategoriesLoading: false,
  fetchOneCategoryLoading: false,
  createCategoryLoading: false,
  deleteCategoryLoading: false,
  updateCategoryLoading: false,
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
      state.categoryItem = null;
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

    builder.addCase(fetchOneCategory.pending, (state) => {
      state.fetchOneCategoryLoading = true;
    }).addCase(fetchOneCategory.fulfilled, (state, {payload: category}) => {
      state.categoryItem = category;
      state.fetchOneCategoryLoading = false;
    }).addCase(fetchOneCategory.rejected, (state) => {
      state.fetchOneCategoryLoading = false;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updateCategoryLoading = true;
    }).addCase(updateCategory.fulfilled, (state) => {
      state.updateCategoryLoading = false;
    }).addCase(updateCategory.rejected, (state) => {
      state.updateCategoryLoading = false;
    });
  }
});


export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categoryItems;
export const selectCategory = (state: RootState) => state.categories.categoryItem;

export const selectFetchAllCategoriesLoading = (state: RootState) => state.categories.fetchAllCategoriesLoading;
export const selectFetchOneCategoryLoading = (state: RootState) => state.categories.fetchOneCategoryLoading;

export const selectCreateCategoryLoading = (state: RootState) => state.categories.createCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.categories.deleteCategoryLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.categories.updateCategoryLoading;

