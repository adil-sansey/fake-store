import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const { id, title, price, category, images } = props.product;
  const [imageURL] = images;
  const { name: categoryName } = category;

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
          {props.isUserLoged ? (
            <button className={styles.btn} data-price={price} onClick={props.addToBasket}>
              Добавить в корзину
            </button>
          ) : (
            <div className={styles.message}>Чтобы добавить товар в корзину залогинтесь</div>
          )}
        </div>
      </div>
    </div>

    // <div classNameName={styles.product_card}>
    //   <div classNameName={styles.category}>{categoryName}</div>
    //   <img classNameName={styles.product_img} src={imageURL} alt={title} />
    //   <Link to={`/products/${id}`} classNameName={styles.produce_title}>
    //     {title}
    //   </Link>
    //   <div classNameName={styles.product_price}>{`$${price}`}</div>
    //   {props.isUserLoged ? (
    //     <button data-price={price} onClick={props.addToBasket}>
    //       Добавить в корзину
    //     </button>
    //   ) : (
    //     <div>Чтобы добавить товар в корзину залогинтесь</div>
    //   )}
    // </div>
  );
}

export default ProductCard;
