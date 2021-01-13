import React, { useContext, useEffect, useState } from "react";
import ExchangeContext from "../../context/ExchangeContext";
import "./CalcItem.css";
import { SelectCurrency } from "./SelectCurrency";
export const CalcItem = ({
  currencyExchangeHandler,
  amountExchangeHandler,
  select,
  listCurrency,
  exchangeListId,
  listAmount,
  showRemove,
}) => {
  const [amount, setAmount] = useState("" + listAmount);
  const [currency, setCurrency] = useState(listCurrency);

  const { setExchangeList, removeExchangeList } = useContext(ExchangeContext);

  useEffect(() => {
    setCurrency(listCurrency);
  }, [listCurrency]);

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleChange = (event) => {
    setAmount(addCommas(removeNonNumeric(event.target.value)));
  };

  const currencyHandler = (event) => {
    setCurrency(event.target.value);
  };
  useEffect(() => {
    currencyExchangeHandler(currency);
    amountExchangeHandler(amount);
    setExchangeList(exchangeListId, currency, +amount.replace(/\s/g, ""));
    // eslint-disable-next-line
  }, [currency, amount]);

  const removeList = () => {
    removeExchangeList(exchangeListId);
  };

  return (
    <div className="calcItem">
      <SelectCurrency
        currencyHandler={currencyHandler}
        currency={currency}
        select={select}
      />
      <input
        type="text"
        className="calcItem__input"
        onChange={handleChange}
        value={amount}
        maxLength="15"
      />
      {showRemove !== 0 && (
        <button className="delete__btn" onClick={removeList}>
          x
        </button>
      )}
    </div>
  );
};
