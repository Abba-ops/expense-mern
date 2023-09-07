import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect } from "react";
import Transaction from "./Transaction";

export default function TransactionList() {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <h3>History</h3>
      {transactions.length ? (
        <ul className="list">
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <div>No Transactions</div>
      )}
    </>
  );
}
