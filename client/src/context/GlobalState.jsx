import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

export const GlobalContext = createContext(initialState);
export default function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get("http://localhost:4000/api/transactions");
      dispatch({ type: "GET_TRANSACTIONS", payload: res.data.data });
    } catch (error) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (error) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addNewTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/api/transactions",
        transaction,
        config
      );
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (error) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        deleteTransaction,
        addNewTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
