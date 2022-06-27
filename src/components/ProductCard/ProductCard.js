import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsUserLogged } from '../../store/selectors';
import { addToBasket } from '../../store/actions';

function ProductCard(props) {
  const {
    id,
    title,
    price,
    images: [imageURL],
  } = props.product;

  const isUserLogged = useSelector(getIsUserLogged);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addToBasket(props.product, 1));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.front}>
          <div>
            <img className={styles.img} src={imageURL} alt={title} />
          </div>
          <div className={styles.info}>
            <Link to={`/products/${id}`}>
              <h2 className={styles.product_title}>{title}</h2>
            </Link>
          </div>
          <div className={styles.product_price}>{`${price}$`}</div>
          {isUserLogged ? (
            <button className={styles.btn} data-price={price} onClick={clickHandler}>
              Добавить в корзину
            </button>
          ) : (
            <div className={styles.message}>Чтобы добавить товар в корзину залогиньтесь</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
