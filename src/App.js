import { useContext } from "react";
import "./App.css";
import { CalcList } from "./components/CalcList/CalcList";
import ExchangeContext from "./context/ExchangeContext";
import { uuid } from "uuidv4";
function App() {
  const {
    addExchangeList,
    exchangeList,
    exchangeRate,
    // addExchangeRate,
    addExchangeRateList,
  } = useContext(ExchangeContext);

  const addList = () => {
    let { listId, currency, amount } = {
      ...exchangeList[exchangeList.length - 1],
    };
    let newListId = uuid();

    let rateArray = [...exchangeRate.filter((item) => item.listId === listId)];

    let newArr = [];

    rateArray.forEach((item) => {
      newArr = [...newArr, item.currency];
    });

    addExchangeList(currency, amount, newListId);

    addExchangeRateList(newListId, newArr);

    // newArr.forEach((currency) => {
    //   addExchangeRate(currency)
    // });
  };

  return (
    <div className="app">
      <div className="box">
        <p>From</p>
        <p>To</p>
      </div>
      {exchangeList.map(({ listId, amount, currency }, index) => {
        return (
          <CalcList
            exchangeListId={listId}
            listAmount={amount}
            listCurrency={currency}
            key={index}
            showRemove={index}
          />
        );
      })}
      <button className="add__btn" onClick={addList}>
        +
      </button>
    </div>
  );
}

export default App;
