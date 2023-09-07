import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";
import { useContext } from "react";

export default function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={sign === "+" ? "plus" : "minus"}>
      {transaction.text}{" "}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount).toFixed(2))}
      </span>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(transaction._id)}
      >
        &#10005;
      </button>
    </li>
  );
}
