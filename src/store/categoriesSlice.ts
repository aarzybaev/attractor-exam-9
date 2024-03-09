import {Category} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAllCategories} from './categoriesThunks';
import {RootState} from '../app/store';

interface CategoriesState {
  categoryItems: Category[];
  fetchAllCategoriesLoading: boolean;
}

const initialState: CategoriesState = {
  categoryItems: [],
  fetchAllCategoriesLoading: false,
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
  }
});


export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categoryItems;
export const selectFetchAllCategoriesLoading = (state: RootState) => state.categories.fetchAllCategoriesLoading;