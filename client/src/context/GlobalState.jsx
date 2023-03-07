import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  // transactions: [
  //   { id: 1, text: "Flower", amount: -20 },
  //   { id: 2, text: "Salary", amount: 300 },
  //   { id: 3, text: "Book", amount: -10 },
  //   { id: 4, text: "Camera", amount: 150 },
  // ],
  transactions: [],
  error: null,
  loading: true,
};

// create global context
export const GlobalContext = createContext(initialState);

// in order for our components to have access to this global state we need to have a Provider
// we need to wrap all our component tree in a Provider Component

// Provider Component
// And since we are going to be wrapping all the components, they will be the children
// so in the props we will put children (object destructured)
export const GlobalProvider = ({ children }) => {
  // in here we use our Reducer, because we need access to "state" and "dispatch"
  // whenever we want to call a Reducer action we need to call this dispatch
  // and our useReducer takes in whatever our Reducer is... in this case code in a separate file called AppReducer
  // and it also takes the initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // inside the Provider component above the return is where we will have our ACTIONS that will make calls to our Reducer
  // Actions

  const getTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      // console.log(`getTransactions response:`, response);
      const data = await response.json();
      // console.log(`getTransactions data:`, data);

      dispatch({
        type: "GET_TRANSACTIONS",
        // these are the transactions from the Back End
        payload: data.data,
      });
    } catch (error) {
      // console.log(`getTransactions error:`, error);
      dispatch({
        type: "TRANSACTION_ERROR",
        // payload: error.response.data.error,
        payload: error,
      });
    }
  };

  // in order for us to use this Action we have to pass it down IN OUR PROVIDER
  const deleteTransaction = async (_id) => {
    try {
      const response = await fetch(`/api/transactions/${_id}`, {
        method: "DELETE",
      });
      // console.log(`deleteTransaction response:`, response);

      // the dispatch function comes from the useReducer
      // we send it a type and a payload (in this case id)
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: _id,
      });
    } catch (error) {
      // console.log(`deleteTransaction error:`, error);
      dispatch({
        type: "TRANSACTION_ERROR",
        // payload: error.response.data.error,
        payload: error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      // console.log(`addTransaction response:`, response);
      const data = await response.json();
      // console.log(`addTransaction data:`, data);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: data.data,
      });
    } catch (error) {
      // console.log(`addTransaction error:`, error);
      dispatch({
        type: "TRANSACTION_ERROR",
        // payload: error.response.data.error,
        payload: error,
      });
    }
  };

  // we need to have our Provider component
  // our Provider provides any state and provides our actions etc to the Components that is it wrapped around
  // the Provider has a value prop and we pass it an object, and give it a key and the value of the state.transactions
  // so this way any component can use this using useContext
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
