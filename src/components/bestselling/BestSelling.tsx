import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellingProducts } from '../../actions/productActions';
import { RootState } from '../../modals/rootState';
import Slider from "react-slick";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Product } from '../../modals/IProduct'
import StarRating from '../starrating/StarRating';


const BestSelling = () => {

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const bestSellingProducts = useSelector((state: RootState) => state.bestSellingProducts.products);
  console.log(bestSellingProducts);
  
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  }
  useEffect(() => {
    dispatch(fetchBestSellingProducts());
  }, [dispatch]);
  const bestSettings = {
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
          dots: true
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

  if (!bestSellingProducts) {
    return <div>Loading...</div>;
  }


  const renderBestSellingProducts = () => {
    return bestSellingProducts.map((product: Product) => (
      <div key={product.id} className='t-container'>
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
        <div className='button-container'>
          <button>Sepete Ekle</button>
        </div>
      </div>


    ))
  }

  //Slice Product Name (55 character)
  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <div className='trending-container'>
      <div className='trend-header'>
        <div className='in-trend-header'>
          <h2>En Çok Ürünler</h2>
        </div>
      </div>
      <div className='trend-slider'>
        <Slider {...bestSettings}>
          {renderBestSellingProducts()}
        </Slider>
      </div>
    </div>
  )
}

export default BestSelling