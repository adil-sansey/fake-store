import {
  SET,
  LOG_IN,
  LOG_OUT,
  ADD,
  CLEAR,
  REMOVE,
  SET_AMOUNT,
  INCREASE,
  DECREASE,
} from './actionTypes';

export function setProducts(products) {
  return { type: SET, products };
}

export function logInUser(userData) {
  return { type: LOG_IN, userData };
}

export function logOutUser() {
  return { type: LOG_OUT };
}

export function addToBasket(product, amount) {
  return { type: ADD, product, amount };
}

export function removeFromBasket(id) {
  return { type: REMOVE, id };
}

export function setAmount(id, amount) {
  return { type: SET_AMOUNT, id, amount };
}

export function increaseAmount(id) {
  return { type: INCREASE, id };
}

export function decreaseAmount(id) {
  return { type: DECREASE, id };
}

export function clearBasket() {
  return { type: CLEAR };
}
