import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  // we gain access to the context state
  // const context = useContext(GlobalContext);
  // instead of the above lets object destructure to get the transactions
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transaction-list-container">
      <h3 className="transaction-list-title">History</h3>
      <ul className="transaction-list">
        {transactions
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
};
