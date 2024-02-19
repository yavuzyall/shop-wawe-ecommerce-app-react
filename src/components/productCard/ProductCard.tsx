import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductCard.scss';
import CartItem from './CartItem';
import { CartProduct } from '../../modals/ICartProduct';
import { fetchProducts, getProductById } from '../../services/productService';
import { Product, ProductsState } from '../../modals/IProduct';
import { useNavigate } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const ProductCard = () => {

  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Ürünler çekilirken hata oluştu: ", error);
      }
    }
    fetchAllProducts();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalPrice = () => {

      let total = 0;
      cartItems.forEach((item: CartProduct) => {
        const product = allProducts.find(p => p.id === item.productId);
        if (product && product.price) {
          total += product.price * item.quantity;
        }
      });

      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems, allProducts]);

  const handleGoToOrder = () => {
    if (cartItems.length <= 0) {
      alert("Sepetinizde herhangi bir ürün mevcut değil.");
    } else if (user) {
      navigate('/product-order');
    }
    else {
      navigate('/login');
    }
  };

  const handleDeleteAllProducts = () => {
    localStorage.removeItem('cart');
  }

  // const handleIncrease = (id: number) => {

  // }

  // const handleDecrease = (id: number) => {

  // }

  return (
    <div className='main'>
      {cartItems.length <= 0 ?
        <div className='empty-header'>
          <h2>Sepetim</h2>
        </div> : <div className='header'>
          <h2>Sepetim</h2>
          <div className='delete-products' onClick={handleDeleteAllProducts}>
            Tüm Ürünleri Sil
          </div>
        </div>}
      {cartItems.length <= 0 ?
        <div className='empty-product-card'>
          <div className='empty-cart-items'>
            <AddShoppingCartIcon className='empty-cart-icon'/>
            <p>Sepetinde henüz ürün yok. Üzülme, hemen bir tane ekle ve tekrar gel!!</p>
          </div>
        </div> :
        <div className='container'>
          <div className='product-card'>
            <div className='cart-items'>
              {cartItems.map((item: CartProduct) => {
                const product = allProducts.find(p => p.id === item.productId);
                return (
                  <CartItem key={cartItems.productId} item={item} product={product} />
                );
              })}
            </div>
          </div>

          <div className='order-container'>
            <div className='total-price'>
              <span className='price-h'>Seçilen Ürünler</span>
              <div className='number-div'>
                <span className='price-number'>{totalPrice.toFixed(2)}</span>
                <span>TL</span>
              </div>
            </div>
            <div className='shopping'>
              <button className='complete-shopping' onClick={handleGoToOrder}>Alışverişi Tamamla</button>
            </div>
            <div className='discounts'>
              <div className='cargo'>
                <span>Kargo</span>
              </div>
              <div className='dis-rate'>
                <span className='result-dis'>Bedava</span>
                <span className='before-dis'>29.90TL</span>
              </div>
            </div>
          </div>

        </div>
      }

    </div>
  )
}

export default ProductCard