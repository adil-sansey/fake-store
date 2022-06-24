import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal.js/AuthModal';
import MainContent from './components/MainContent/MainContent';
import Product from './components/Product/Product';

import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserLoged, setIsUserLoged] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [basket, setBasket] = useState({ amount: 0, totalPrice: 0 });

  const addToBasket = (e) => {
    const target = e.target;
    const price = target.dataset.price;

    setBasket({ amount: ++basket.amount, totalPrice: basket.totalPrice + +price });
  };

  const clearBasket = () => {
    setBasket({ amount: 0, totalPrice: 0 });
  };

  const setUserData = (data) => {
    setUser(data);
  };

  const logOut = () => {
    setUser(null);
    setIsUserLoged(false);

    clearBasket();
  };

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        if (!response.ok) {
          return new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const openOrCloseAuthModal = (e) => {
    e.preventDefault();

    setIsOpenAuthModal(!isOpenAuthModal);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          isUserLoged={isUserLoged}
          logOut={logOut}
          user={user}
          basket={basket}
          openOrCloseAuthModal={openOrCloseAuthModal}
          clearBasket={clearBasket}
        />
        {isOpenAuthModal && (
          <AuthModal
            setIsUserLoged={setIsUserLoged}
            setUserData={setUserData}
            setUser={setUser}
            openOrCloseAuthModal={openOrCloseAuthModal}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                isUserLoged={isUserLoged}
                addToBasket={addToBasket}
                products={products}
              />
            }
          ></Route>
          <Route
            path="products/:productId"
            element={<Product basket={basket} isUserLoged={isUserLoged} setBasket={setBasket} />}
          />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>404 PAGE NOT FOUND</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
