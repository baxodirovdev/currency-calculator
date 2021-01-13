import React, { useContext, useEffect, useState } from "react";
import { CalcItem } from "../Calcitem/CalcItem";
import "./CalcList.css";
import Api from "../../utils/Api";
import { CalcRate } from "../Calcitem/CalcRate";
import ExchangeContext from "../../context/ExchangeContext";

export const CalcList = ({
  exchangeListId,
  listAmount,
  listCurrency,
  showRemove,
}) => {
  const { exchangeRate, addExchangeRate } = useContext(ExchangeContext);
  const [currency, setCurrency] = useState(listCurrency);
  const [amount, setAmount] = useState(listAmount);
  const [rates, setRates] = useState({});
  const currencyExchangeHandler = (currency) => {
    setCurrency(currency);
  };

  const amountExchangeHandler = (amount) => {
    setAmount(+amount.replace(/\s/g, ""));
  };

  const addRate = () => {
    addExchangeRate(listCurrency, exchangeListId);
  };

  useEffect(() => {
    setAmount(listAmount);
  }, [listAmount]);

  // Get Data
  useEffect(() => {
    Api.get("/latest", {
      params: {
        base: currency,
      },
    })
      .then((res) => {
        setRates(res.data.rates);
      })
      .catch((err) => console.log(err));
  }, [currency]);

  const select = Object.keys(rates).map((key) => key);

  let newArr = [
    ...exchangeRate.filter((item) => {
      return item.listId === exchangeListId;
    }),
  ];
  return (
    <div className="calcList">
      <CalcItem
        currencyExchangeHandler={currencyExchangeHandler}
        amountExchangeHandler={amountExchangeHandler}
        select={select}
        listCurrency={listCurrency}
        exchangeListId={exchangeListId}
        listAmount={listAmount}
        showRemove={showRemove}
      />
      <i className="equal">=</i>
      {newArr.map(({ listId, rateId, currency }, index) => {
        // eslint-disable-next-line
        return (
          <CalcRate
            listId={listId}
            rateId={rateId}
            currency={currency}
            amount={amount}
            rates={rates}
            select={select}
            key={index}
            dsb={index}
          />
        );
      })}

      <button className="add__btn" onClick={addRate}>
        +
      </button>
    </div>
  );
};
