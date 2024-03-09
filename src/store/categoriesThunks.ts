import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../axiosAPI';
import {ApiCategories, ApiCategory, Category} from '../types';

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

export const createCategory = createAsyncThunk<void, ApiCategory>(
  'categories/create',
  async (category) => {
    await axiosAPI.post("/categories.json", category);
  }
);

export const removeCategory = createAsyncThunk<void, string>(
  'categories/remove',
  async (id) => {
    await axiosAPI.delete('/categories/' + id + '.json');
  }
);