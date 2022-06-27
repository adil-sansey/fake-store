import React from 'react';
import styles from './Basket.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { getBasket, getUser } from '../../store/selectors';
import {
  clearBasket,
  removeFromBasket,
  setAmount,
  increaseAmount,
  decreaseAmount,
} from '../../store/actions';

function Basket() {
  const user = useSelector(getUser);
  const basket = useSelector(getBasket);

  const dispatch = useDispatch();

  const totalPrice = basket.reduce((sum, product) => {
    return sum + product.price * product.amount;
  }, 0);

  const basketItems = basket.map((product, idx) => {
    const { title, price } = product;

    return (
      <div key={idx} className={styles.item}>
        <div className={styles.product_id}>{product.id}</div>
        <div className={styles.description}>
          <span>{title}</span>
        </div>
        <div className={styles.total_price}>{price}$</div>

        <div className={styles.quantity}>
          <button
            onClick={() => {
              dispatch(decreaseAmount(product.id));
            }}
            className={styles.minus_btn}
            type="button"
            name="button"
          >
            -
          </button>
          <input
            value={product.amount}
            onChange={(e) => {
              dispatch(setAmount(product.id, +e.target.value));
            }}
            type="text"
            name="name"
          />
          <button
            onClick={() => {
              dispatch(increaseAmount(product.id));
            }}
            className={styles.plus_btn}
            type="button"
            name="button"
          >
            +
          </button>
        </div>
        <div className={styles.total_price}>{+product.amount * price}$</div>

        <div className={styles.buttons}>
          <button
            onClick={() => {
              dispatch(removeFromBasket(product.id));
            }}
            className={styles.delete_btn}
          >
            <img width="16px" height="16px" src="./icons/delete.svg" alt="delete button" />
          </button>
        </div>
      </div>
    );
  });

  if (!user.isUserLogged) {
    return <h2>Залогинтесь чтобы увидить корзину</h2>;
  }

  return (
    <div className={styles.shopping_cart}>
      <div className={styles.title}>Ваша корзина</div>
      {basketItems}
      <div className={styles.total_total_price}>Итого: {totalPrice}</div>
      <div className={styles.buttons}>
        <button
          className={styles.clear_basket_btn}
          onClick={() => {
            dispatch(clearBasket());
          }}
        >
          Очистить корзину
        </button>
        <button className={styles.pay_btn} disabled>
          Оплатить
        </button>
      </div>
    </div>
  );
}

export default Basket;
