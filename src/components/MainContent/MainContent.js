import React from 'react';
import styles from './MainContent.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux/es/exports';
import { getProducts } from '../../store/selectors';

function MainContent() {
  const products = useSelector(getProducts);

  if (!products.length) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className={styles.main_content}>
      {products.map((elem, index) => (
        <ProductCard key={index} product={elem} />
      ))}
    </div>
  );
}

export default MainContent;
