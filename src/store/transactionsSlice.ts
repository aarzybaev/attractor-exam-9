import {Transaction} from '../types';
import {RootState} from '../app/store';
import {fetchAllTransactions} from './transactionsThunks';
import {createSlice} from '@reduxjs/toolkit';

interface TransactionsState {
  transactionItems: Transaction[];
  transactionItem: Transaction | null;
  fetchAllTransactionsLoading: boolean;
  fetchOneTransactionsLoading: boolean;
  createTransactionsLoading: boolean;
  deleteTransactionsLoading: boolean | string;
  updateTransactionsLoading: boolean;
}

const initialState: TransactionsState = {
  transactionItems: [],
  transactionItem: null,
  fetchAllTransactionsLoading: false,
  fetchOneTransactionsLoading: false,
  createTransactionsLoading: false,
  deleteTransactionsLoading: false,
  updateTransactionsLoading: false,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.fetchAllTransactionsLoading = true;
    }).addCase(fetchAllTransactions.fulfilled, (state,
      {payload: transactions}) => {
      state.fetchAllTransactionsLoading = false;
      state.transactionItems = transactions;
    }).addCase(fetchAllTransactions.rejected, (state) => {
      state.fetchAllTransactionsLoading = false;
    });
  }
});


export const transactionsReducer = transactionsSlice.reducer;
export const selectTransactions = (state: RootState) => state.transactions.transactionItems;