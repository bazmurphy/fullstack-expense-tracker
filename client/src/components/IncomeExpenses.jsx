import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, cv) => acc + cv, 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, cv) => acc + cv, 0);

  return (
    <div className="income-expenses-container">
      <div>
        <h4 className="income-expenses-title">Income</h4>
        <p className="money plus">+£{Math.abs(income).toFixed(2)}</p>
      </div>
      <div>
        <h4 className="income-expenses-title">Expense</h4>
        <p className="money minus">-£{Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
};
