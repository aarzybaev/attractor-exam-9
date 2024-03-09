import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../axiosAPI';
import {ApiCategories, ApiCategory, Category, UpdateCategoryParams} from '../types';

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

export const fetchOneCategory = createAsyncThunk<Category, string>(
  'categories/fetchOne',
  async (catID) => {

      const {data: category} = await axiosAPI.get<ApiCategory | null>(`/categories/${catID}.json`);
    if (category === null) {
      throw new Error('Not found');
    }
    return ({...category, id: catID});

  },
);

export const updateCategory = createAsyncThunk<void, UpdateCategoryParams>(
  'categories/update',
  async ({catID, apiCategory}) => {
    await axiosAPI.put(`/categories/${catID}.json`, apiCategory);
  },
);