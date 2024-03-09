export interface ApiCategory {
  type: string;
  name: string;
}

export interface Category extends  ApiCategory {
  id: string;
}

export interface ApiCategories {
  [id: string]: ApiCategory;
}

export interface UpdateCategoryParams {
  catID: string;
  apiCategory: ApiCategory;
}
