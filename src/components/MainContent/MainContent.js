import React from 'react';
import styles from './MainContent.module.css';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux/es/exports';
import { getProducts } from '../../store/selectors';

function MainContent() {
  const products = useSelector(getProducts);

  if (!products.length) {
    return <Loader />;
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
