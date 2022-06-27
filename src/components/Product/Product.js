import React from 'react';
import styles from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsUserLogged } from '../../store/selectors';
import { addToBasket } from '../../store/actions';

function Product() {
  const isUserLogged = useSelector(getIsUserLogged);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [productAmout, setProductAmout] = useState(1);
  const { productId } = useParams();

  const changeHandler = (e) => {
    const value = +e.target.value;
    setProductAmout(value);
  };

  const onClick = () => {
    dispatch(addToBasket(product, +productAmout));
  };

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        if (data instanceof Error) {
          return data;
        }

        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  if (!product) {
    return <h1>Loading ...</h1>;
  }

  const {
    title,
    price,
    description,
    category: { name: categoryName },
    images: [imageURL],
  } = product;

  return (
    <div className={styles.container}>
      <div className={styles.left_column}>
        <img data-image="black" className={styles.active} src={imageURL} alt={title} />
      </div>

      <div className={styles.right_column}>
        <div className={styles.product_description}>
          <span>{categoryName}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className={styles.product_price}>
          <span>{price}$</span>
          {isUserLogged ? (
            <>
              <button onClick={onClick} className={styles.cart_btn}>
                Добавить в корзину
              </button>
              <input onChange={changeHandler} type="number" step="1" min="1" value={productAmout} />
            </>
          ) : (
            <div className={styles.message}>Чтобы добавить товар в корзину залогинтесь</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
