import {
  ADD_CALCRATE,
  REMOVE_CALCRATE,
  ADD_CALCLIST,
  REMOVE_CALCLIST,
  SET_CALCRATE,
  SET_CALCLIST,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CALCRATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case REMOVE_CALCRATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case ADD_CALCLIST:
      return {
        ...state,
        exchangeList: action.payload,
      };
    case REMOVE_CALCLIST:
      return {
        ...state,
        exchangeList: action.payload,
      };

    case SET_CALCRATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };

    case SET_CALCLIST:
      return {
        ...state,
        exchangeList: action.payload,
      };
    default:
      break;
  }
};
