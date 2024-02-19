import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingProducts } from '../../actions/productActions';
import { fetchBestSellingProducts } from '../../actions/productActions';
import { RootState } from '../../modals/rootState';
import { ThunkDispatch } from 'redux-thunk';
import './HomePage.scss'
import Slider from "react-slick";
import slider1 from '../../assets/slider/slider1.png';
import slider2 from '../../assets/slider/slider2.png';
import slider3 from '../../assets/slider/slider3.png';
import slider4 from '../../assets/slider/slider4.png';
import slider5 from '../../assets/slider/slider5.png';
import slider6 from '../../assets/slider/slider6.png';
import { AnyAction } from 'redux';
import { Product } from '../../modals/IProduct'
import StarRating from '../starrating/StarRating';
import BestSelling from '../bestselling/BestSelling';
import { Link } from 'react-router-dom';
import { addToCart } from '../../functions/cartUtils';
import { error } from 'console';
import { calculateCartItemCount } from '../../functions/newItemCount';
import { updateCartItemCount } from '../../actions/cartActions';

export const formatPrice = (price: number) => {
  return price.toFixed(2);
};

export const handleAddToCart = (productId: number) => {
  addToCart(productId).catch((error) => {
    console.error("Sepete ekleme işlemi başarısız oldu: ", error);

  })
};

//Slice Product Name (55 character)
export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const HomePage = () => {

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const trendingProducts = useSelector((state: RootState) => state.trendingProducts.products);
  const bestSellingProducts = useSelector((state: RootState) => state.bestSellingProducts.products);


  useEffect(() => {
    dispatch(fetchTrendingProducts());
    dispatch(fetchBestSellingProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const trendSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleAddToCartCount = () => {
    const newItemCount = calculateCartItemCount();
    dispatch(updateCartItemCount(newItemCount))
  }

  if (!trendingProducts) {
    return <div className='loading'>Loading...</div>;
  }



  const renderTrendingProducts = () => {
    return trendingProducts.map((product: Product) => (
      <div key={product.id} className='t-container'>
        <Link to={`/product/${product.id}`} key={product.id} className='link' >
          <div className='image-container'>
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className='text-container'>
            <h3>{truncateString(product.name, 55)}</h3>
            <div className='text-area'>
              <div className='rating'>
                <StarRating rating={product.rating} />
                <div className='rate-number'>{product.reviewCount} değerlendirme.</div>
              </div>
              <div className='price'>{formatPrice(product.price)} TL</div>
            </div>

          </div>
        </Link>

        <div className='button-container'>
          <button onClick={() => { handleAddToCart(product.id); handleAddToCartCount() }}>Sepete Ekle</button>
        </div>
      </div>


    ))
  }
  if (!bestSellingProducts) {
    return <div className='loading'>Loading...</div>;
  }


  const renderBestSellingProducts = () => {
    return bestSellingProducts.map((product: Product) => (
      <div key={product.id} className='t-container'>
        <Link to={`/product/${product.id}`} key={product.id} >
          <div className='image-container'>
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className='text-container'>
            <h3>{truncateString(product.name, 55)}</h3>
            <div className='text-area'>
              <div className='rating'>
                <StarRating rating={product.rating} />
                <div className='rate-number'>{product.reviewCount} değerlendirme.</div>
              </div>
              <div className='price'>{formatPrice(product.price)} TL</div>
            </div>

          </div>
        </Link>
        <div className='button-container'>
          <button onClick={() => { handleAddToCart(product.id); handleAddToCartCount(); }}>Sepete Ekle</button>
        </div>
      </div>


    ))
  }


  return (

    <div className='homepage-container'>
      <div className='background-div'></div>
      <div className='slider-container'>
        <Slider {...settings}>
          <div>
            <img src={slider1} alt="reklam 1" />
          </div>
          <div>
            <img src={slider2} alt="reklam 1" />
          </div>
          <div>
            <img src={slider3} alt="reklam 1" />
          </div>
          <div>
            <img src={slider4} alt="reklam 1" />
          </div>

        </Slider>
      </div>
      {/* Trend Products */}
      <div className='trending-container'>
        <div className='trend-header'>
          <div className='in-trend-header'>
            <h2>En Trend Ürünler</h2>
          </div>
        </div>
        <div className='trend-slider'>
          <Slider {...trendSettings}>
            {renderTrendingProducts()}
          </Slider>
        </div>
      </div>
      {/* Best Selling */}
      <div className='best-seller-container'>
        <div className='best-header'>
          <div className='in-best-header'>
            <h2>En Çok Satanlar</h2>
          </div>
        </div>
        <div className='best-slider'>
          <Slider {...trendSettings}>
            {renderBestSellingProducts()}
          </Slider>
        </div>
      </div>
    </div>

  )
}

export default HomePage