import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal.js/AuthModal';
import MainContent from './components/MainContent/MainContent';
import Product from './components/Product/Product';
import Basket from './components/Basket/Basket';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { setProducts } from './store/actions';

function App() {
  const dispatch = useDispatch();

  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        if (!response.ok) {
          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const openOrCloseAuthModal = (e) => {
    e.preventDefault();

    setIsOpenAuthModal(!isOpenAuthModal);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header openOrCloseAuthModal={openOrCloseAuthModal} />
        {isOpenAuthModal && <AuthModal openOrCloseAuthModal={openOrCloseAuthModal} />}
        <Routes>
          <Route path="/" element={<MainContent />}></Route>
          <Route path="products/:productId" element={<Product />} />
          <Route path="basket" element={<Basket />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>404 PAGE NOT FOUND</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
