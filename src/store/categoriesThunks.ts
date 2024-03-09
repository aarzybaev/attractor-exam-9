import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../axiosAPI';
import {ApiCategories, Category} from '../types';

export const fetchAllCategories = createAsyncThunk<Category[], void>(
  'categories/fetchAll',
  async () => {
    const {data: categories} = await axiosAPI.get<ApiCategories | null>("/categories.json");

    let newCategories: Category[] = [];

    if (categories) {
      newCategories =  Object
        .keys(categories)
        .map((id: string) => {
          return ({...categories[id], id});
        });
    }
    return newCategories;
  }
);