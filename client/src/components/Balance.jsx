import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts);
  const total = amounts.reduce((acc, cv) => acc + cv, 0);
  // console.log(total);

  return (
    <div className="balance-container">
      <h4 className="balance-title">Your Balance</h4>
      <h1 className="balance-value">
        {total < 0 ? "-" : null}£{Math.abs(total).toFixed(2)}
      </h1>
    </div>
  );
};
