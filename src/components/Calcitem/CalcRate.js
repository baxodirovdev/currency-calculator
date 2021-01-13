import React, { useContext, useEffect, useState } from "react";
import ExchangeContext from "../../context/ExchangeContext";
import "./CalcItem.css";
import { SelectCurrency } from "./SelectCurrency";
export const CalcRate = ({
  rateId,
  amount,
  rates,
  select,
  currency,
  dsb,
}) => {
  const [exchangedAmount, setExchangedAmount] = useState(1);
  const [exchangedCurrency, setExchangedCurrency] = useState(currency);

  const { removeExchangeRate, setExchangeRate } = useContext(ExchangeContext);

  useEffect(() => {
    setExchangedAmount(rates[exchangedCurrency]);
    setExchangeRate(rateId, exchangedCurrency);
    // eslint-disable-next-line
  }, [exchangedCurrency, rates]);

  const currencyHandler = (event) => {
    setExchangedCurrency(event.target.value);
  };

  const removeRate = (rateId) => {
    removeExchangeRate(rateId);
  };

  useEffect(() => {
    setExchangedCurrency(currency);
  }, [currency]);

  return (
    <div className="calcItem">
      <SelectCurrency
        currencyHandler={currencyHandler}
        currency={exchangedCurrency}
        select={select}
      />
      <p className="calcItem__number">
        {exchangedAmount ? (exchangedAmount * amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 1}
      </p>
      {dsb !== 0 && (
        <button className="delete__btn" onClick={() => removeRate(rateId)}>
          x
        </button>
      )}
    </div>
  );
};
