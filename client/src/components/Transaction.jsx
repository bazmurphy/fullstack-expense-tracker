import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <li
      className={transaction.amount < 0 ? "negative-border" : "positive-border"}
    >
      {transaction.text}{" "}
      <span className={transaction.amount < 0 ? "negative" : "positive"}>
        {transaction.amount < 0 ? "-" : "+"}£
        {Math.abs(transaction.amount).toFixed(2)}
      </span>
      <button
        className="delete-button"
        onClick={() => {
          deleteTransaction(transaction._id);
        }}
      >
        X
      </button>
    </li>
  );
};
