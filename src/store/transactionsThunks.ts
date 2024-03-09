import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategory, ApiTransaction, ApiTransactios, Transaction} from '../types';
import axiosAPI from '../axiosAPI';


export const fetchAllTransactions = createAsyncThunk<Transaction[], void>(
  'transactions/fetchAll',
  async () => {
    const {data: transactions} = await axiosAPI.get<ApiTransactios | null>("/transactions.json");

    let newTransactions: Transaction[] = [];

    if (transactions) {
      newTransactions =  Object
        .keys(transactions)
        .map((id: string) => {
          return ({...transactions[id], id});
        });
    }
    return newTransactions;
  }
);

export const createTransaction = createAsyncThunk<void, ApiTransaction>(
  'transactions/create',
  async (transaction) => {
    await axiosAPI.post("/transactions.json", transaction);
  }
);