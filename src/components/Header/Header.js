import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Fake-store</div>
        <nav className={styles.nav_bar}>
          <Link to="/" className={styles.nav_bar_link}>
            Главная
          </Link>
          <Link to="/about" className={styles.nav_bar_link}>
            О магазине
          </Link>
        </nav>
      </div>
      {props.user && (
        <div
          className={styles.basket}
        >{`В корзине ${props.basket.amount} товаров на сумму ${props.basket.totalPrice}$`}</div>
      )}
      <div
        onClick={props.isUserLoged ? props.logOut : props.openOrCloseAuthModal}
        className={styles.auth_box}
      >
        {props.isUserLoged ? 'Выйти' : 'Войти'}
      </div>
    </div>
  );
}

export default Header;
