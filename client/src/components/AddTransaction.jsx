import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {
      text: text,
      amount: Number(amount),
    };

    addTransaction(newTransaction);

    // Clear Form
    setText("");
    setAmount(0);
  };

  return (
    <div className="add-transaction-container">
      <h3 className="add-transaction-title">Add a new transaction</h3>
      <form className="add-transaction-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="text">Description:</label>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter transaction..."
          />
        </div>
        <div>
          <label htmlFor="amount">Amount: (+income -expense)</label>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="add-transaction-button">Add transaction</button>
      </form>
    </div>
  );
};
