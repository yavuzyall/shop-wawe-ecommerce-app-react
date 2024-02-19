import React, { useEffect } from 'react';
import './App.scss';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/homePage/HomePage';
import Footer from './components/footer/Footer';
import ProductDetailPage from './components/productDetail/ProductDetailPage';
import { useDispatch } from 'react-redux';
import { updateCartItemCount } from './actions/cartActions';
import ProductCard from './components/productCard/ProductCard';
import ProductOrder from './components/product-order/ProductOrder';
import Products from './components/products/Products';
import MyOrders from './components/myOrders/MyOrders';
import Account from './components/accountPage/Account';

function App() {

  const location = useLocation();
  const hideNavbarOnPages = ['/login', '/register'];
  const dispatch = useDispatch();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemCount = localCart.length;
    dispatch(updateCartItemCount(itemCount));
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {!hideNavbarOnPages.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/homepage/*' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/product-cart' element={<ProductCard/>}/>
        <Route path='/product-order' element={<ProductOrder/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:categoryId' element={<Products/>}/>
        <Route path='/products/:categoryId/:productType' element={<Products/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/account-details' element={<Account/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
