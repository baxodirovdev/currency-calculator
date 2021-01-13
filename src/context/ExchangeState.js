import React, { useEffect, useReducer } from "react";
import ExchangeReducer from "./ExchangeReducer";
import ExchangeContext from "./ExchangeContext";
import {
  ADD_CALCRATE,
  REMOVE_CALCRATE,
  ADD_CALCLIST,
  REMOVE_CALCLIST,
  SET_CALCRATE,
  SET_CALCLIST,
} from "./types";

import { uuid } from "uuidv4";

export const ExchangeState = (props) => {
  const initialState = {
    exchangeList: [
      {
        listId: 1,
        currency: "USD",
        amount: 1,
      },
    ],
    exchangeRate: [
      {
        listId: 1,
        rateId: 2,
        currency: "RUB",
      },
    ],
  };

  const [state, dispatch] = useReducer(ExchangeReducer, initialState, () => {
    const loacalData = localStorage.getItem("state");
    return loacalData ? JSON.parse(loacalData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const addExchangeList = (currency, amount, newListId) => {
    dispatch({
      type: ADD_CALCLIST,
      payload: [...state.exchangeList, { listId: newListId, currency, amount }],
    });
  };

  const removeExchangeList = (id) => {
    dispatch({
      type: REMOVE_CALCLIST,
      payload: state.exchangeList.filter((list) => list.listId !== id),
    });

    dispatch({
      type: REMOVE_CALCRATE,
      payload: [...state.exchangeRate.filter((list) => list.listId !== id)],
    });
  };

  const addExchangeRate = (currency, listId) => {
    dispatch({
      type: ADD_CALCRATE,
      payload: [...state.exchangeRate, { listId, rateId: uuid(), currency }],
    });
  };
  const addExchangeRateList = (listId, list) => {
    let newArr = [];

    list.forEach((list) => {
      newArr = [...newArr, { listId, rateId: uuid(), currency: list }];
    });

    dispatch({
      type: ADD_CALCRATE,
      payload: [...state.exchangeRate, ...newArr],
    });
  };

  const removeExchangeRate = (rateId) => {
    dispatch({
      type: REMOVE_CALCRATE,
      payload: [...state.exchangeRate.filter((list) => list.rateId !== rateId)],
    });
  };

  const setExchangeRate = (rateId, currency) => {
    let objIndex = state.exchangeRate.findIndex((obj) => obj.rateId === rateId);

    state.exchangeRate[objIndex] = {
      ...state.exchangeRate[objIndex],
      currency: currency,
    };

    dispatch({
      type: SET_CALCRATE,
      payload: state.exchangeRate,
    });
  };

  const setExchangeList = (listId, currency, amount) => {
    let objIndex = state.exchangeList.findIndex((obj) => obj.listId === listId);

    state.exchangeList[objIndex] = {
      listId,
      currency,
      amount,
    };

    dispatch({
      type: SET_CALCLIST,
      payload: state.exchangeList,
    });
  };

  return (
    <ExchangeContext.Provider
      value={{
        exchangeList: state.exchangeList,
        exchangeRate: state.exchangeRate,
        addExchangeList,
        removeExchangeList,
        addExchangeRate,
        removeExchangeRate,
        setExchangeRate,
        setExchangeList,
        addExchangeRateList,
      }}
    >
      {props.children}
    </ExchangeContext.Provider>
  );
};
