// A Reducer is how we specify the Application State changes in response to certain actions to our Context (or Store)
// A Reducer is a way to change a state

// we have an action that has specific types (like an id, for example add transaction or delete transaction)
// the bare minimum as a default action is to return state
export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        // the payload is the data from the API
        transactions: action.payload,
      };

    case "DELETE_TRANSACTION":
      // in our Reducer we create a case for "DELETE_TRANSACTION"
      // when we look at our dispatch
      // we send it with a type (of action) and a payload (any data we send to it)
      // in this case the type is "DELETE_TRANSACTION"
      // and the payload is the id
      return {
        ...state,
        // we spread the original state
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        // we change the transactions to all of them except the one that was deleted
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
