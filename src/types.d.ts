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


export interface ApiTransaction {
  category: string;
  amount: number;
  createdAt: string;
}

export interface Transaction extends ApiTransaction {
  id: string;
}

export interface ApiTransactios {
  [id: string]: ApiTransaction;
}

export interface ApiTransactionForm {
  type: string;
  categoryName: string;
  amount: number;
  createdAt: string;
}