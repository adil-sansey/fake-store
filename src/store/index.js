import { createStore, combineReducers } from 'redux';
import { productsReducer, userReducer, basketReducer } from './reducers';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  basket: basketReducer,
});

export const store = createStore(rootReducer);
