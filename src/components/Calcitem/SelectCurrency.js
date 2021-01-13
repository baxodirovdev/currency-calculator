import React from "react";

export const SelectCurrency = ({ currencyHandler, currency, select }) => {
  return (
    <select
      className="calcItem__select"
      name="currency"
      id="1"
      value={currency}
      onChange={currencyHandler}
    >
      {select.map((item, index) => {
        return (
          <option className="calcItem__option" key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};
