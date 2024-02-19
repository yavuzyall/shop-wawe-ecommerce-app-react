import React, { useEffect, useState } from 'react';
import './ProductDetailPage.scss'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { Product } from '../../modals/IProduct';
import { formatPrice } from '../homePage/HomePage';
import StarRating from '../starrating/StarRating';
import { updateCartInDB } from '../../services/cartService';
import ad1 from '../../assets/ads/ad1.png';
import Quantity from '../quantity/Quantity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateCartItemCount } from '../../actions/cartActions';
import { calculateCartItemCount } from '../../functions/newItemCount';


const ProductDetailPage = () => {

  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product data: ', error);
      }
    };

    fetchProductData();
  }, [id]);


  if (product === null) {
    return (
      <div className='loading'>Loading...</div>
    )
  }

  const handleAddToCartCount = () => {
    const newItemCount = calculateCartItemCount();
    dispatch(updateCartItemCount(newItemCount))
  }

  const addToCart = async () => {

    // localStorage.setItem('cart', '');
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;

    if (user) {
      console.log("usera girdi");

      let localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const mergedCart = [...(user.cart || []), ...localCart, { productId: product?.id, quantity: quantity }];

      const existingProduct = localCart.find((item: any) => item.productId === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        localCart.push({ productId: product.id, quantity: quantity });
      }
      localStorage.setItem('cart', JSON.stringify(localCart));

      try {
        await updateCartInDB(user, mergedCart);
        toast.success('Ürün sepete eklendi.', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      } catch (error) {
        console.error("DB - Cart update edilirken bir hata oluştu: ", error);
      }

    } else {
      let localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      // const mergedCart = [...(user.cart || []), ...localCart, { productId: product?.id, quantity: quantity }];

      const existingProduct = localCart.find((item: any) => item.productId === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        localCart.push({ productId: product.id, quantity: quantity });
      }
      localStorage.setItem('cart', JSON.stringify(localCart));

    }
  }
  return (
    <div className='product-detail-page'>
      <div className='ad-banner'>
        <img src={ad1} alt="" />
      </div>
      <div className='product-info'>
        <div className='product-image'>
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className='product-details'>
          <h2 className='name'>{product.name}</h2>
          <div className='price'>{formatPrice(product.price)} <span>TL</span></div>
          <div className='rating'>
            <div className='rate-value'>
              <div>{product.rating}</div>
              <StarRating rating={product.rating} />
            </div>
            <div className='rate-count'>{product.reviewCount} değerlendirme.</div>
          </div>
          <div className='installment'>
            <div>
              {`${(product.price / 12).toFixed(2)} TL X 12 aya varan `}
              <span>Taksitle</span>
            </div>
            <div className='instalment-options'>Taksit seçeneklerini görüntüle!</div>
          </div>

          <div className='cart-actions'>
            <div className='quantity'><Quantity quantity={quantity} setQuantity={setQuantity} /></div>
            <button className='add-to-cart-button' onClick={() => {addToCart(); handleAddToCartCount()}}>Sepete Ekle</button>
          </div>
          <div className='actions'>
            <div className='like-button'><FavoriteBorderIcon className='like-symbol' /></div>
            {/* <button className='like-button'></button> */}
            <div className='save-button'><TurnedInNotIcon className='save-symbol' /></div>
            {/* <button className='save-button'>Listeme Ekle</button> */}
          </div>
        </div>
      </div>
      <div className='description-container'>
        <div className='description-header'>
          <h2>Ürün Açıklaması</h2>
        </div>
        <div className='description'>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage