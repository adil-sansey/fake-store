import {
  SET,
  LOG_IN,
  LOG_OUT,
  ADD,
  CLEAR,
  REMOVE,
  INCREASE,
  DECREASE,
  SET_AMOUNT,
} from './actionTypes';

export function productsReducer(state = [], action) {
  switch (action.type) {
    case SET:
      return [...action.products];

    default:
      return state;
  }
}

const userDefaultState = { isUserLogged: false };

export function userReducer(state = userDefaultState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...action.userData, isUserLogged: true };
    case LOG_OUT:
      return userDefaultState;

    default:
      return state;
  }
}

const basketDefaultState = [];

export function basketReducer(state = basketDefaultState, action) {
  switch (action.type) {
    case ADD: {
      const productIdx = state.findIndex((elem) => elem.id === action.product.id);

      if (productIdx !== -1) {
        const newState = [...state];
        newState[productIdx].amount += action.amount;
        return [...newState];
      }

      return [
        ...state,
        {
          ...action.product,
          amount: action.amount,
        },
      ];
    }

    case REMOVE: {
      return state.filter((product) => product.id !== action.id);
    }

    case SET_AMOUNT: {
      const productIdx = state.findIndex((elem) => elem.id === action.id);
      const newState = [...state];
      newState[productIdx].amount = action.amount;
      return [...newState];
    }

    case INCREASE: {
      const productIdx = state.findIndex((elem) => elem.id === action.id);

      const newState = [...state];
      newState[productIdx].amount = +newState[productIdx].amount + 1;
      return [...newState];
    }

    case DECREASE: {
      const productIdx = state.findIndex((elem) => elem.id === action.id);

      console.log(productIdx);
      const newState = [...state];
      newState[productIdx].amount = +newState[productIdx].amount - 1;
      return [...newState];
    }

    case CLEAR:
      return basketDefaultState;

    default:
      return state;
  }
}
