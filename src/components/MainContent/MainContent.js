import React from 'react';
import styles from './MainContent.module.css';
// import { products } from '../../mocks/products';
import ProductCard from '../ProductCard/ProductCard';

function MainContent(props) {
  if (!props.products) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className={styles.main_content}>
      {props.products.map((elem, index) => (
        <ProductCard
          isUserLoged={props.isUserLoged}
          addToBasket={props.addToBasket}
          key={index}
          product={elem}
        />
      ))}
    </div>
  );
}

export default MainContent;
