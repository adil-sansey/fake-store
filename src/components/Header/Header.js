import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getUser } from '../../store/selectors';
import { logOutUser, clearBasket } from '../../store/actions';

function Header(props) {
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    dispatch(clearBasket());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>Fake-store</div>
        </Link>
        <nav className={styles.nav_bar}>
          <Link to="/" className={styles.nav_bar_link}>
            Главная
          </Link>
          <Link to="/about" className={styles.nav_bar_link}>
            О магазине
          </Link>
        </nav>
      </div>

      <div className={styles.container}>
        {user.isUserLogged && (
          <Link to="/basket">
            <img
              className={styles.basket}
              src="./icons/basket.svg"
              alt="basket"
              width="32px"
              height="32px"
            />
          </Link>
        )}
        <div
          onClick={user.isUserLogged ? logOut : props.openOrCloseAuthModal}
          className={styles.auth_box}
        >
          {user.isUserLogged ? 'Выйти' : 'Войти'}
        </div>
      </div>
    </header>
  );
}

export default Header;
