import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  month: parseInt(new Date().getMonth() + 1),
  year: parseInt(new Date().getFullYear()),
  budgets: [],
  transactions: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light"? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setMonth: (state, action) => {
            state.month = action.payload.month;
        },
        setYear: (state, action) => {
            state.year = action.payload.year;
        },
        setBudgets: (state, action) => {
            if (state.user) {
                state.budgets = action.payload.budgets;
            } else {
                console.error("No user logged in");
            }
        },
        setTransactions: (state, action) => {
            // console.log(state.transactions);
            // console.log(action.payload.transactions);
            if (state.user) {
                state.transactions = action.payload.transactions;
            } else {
                console.error("No user logged in");
            }
        }
    }
});

export const { setMode, setLogin, setLogout, setMonth, setYear, setBudgets, setTransactions } = authSlice.actions;
export default authSlice.reducer;