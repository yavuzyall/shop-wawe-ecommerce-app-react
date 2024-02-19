import React, { useEffect, useState } from 'react';
import './MyOrders.scss';
import { deleteOrderByUserId, getAllOrders } from '../../services/orderService';
import { IOrder } from '../../modals/IOrder';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { getProductById } from '../../services/productService';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { Product } from '../../modals/IProduct';
import StarRating from '../starrating/StarRating';
import { formatPrice } from '../homePage/HomePage';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';


const MyOrders = () => {

  const navigate = useNavigate();
  const userId = String(localStorage.getItem('user'));
  const [orders, setOrders] = useState<IOrder[] | []>([]);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});
  const [productInf, setProductInf] = useState<{ [key: string]: Product }>({});


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getAllOrders(userId);
        setOrders(allOrders);
      } catch (error) {
        console.error('Siparişler yüklenirken bir hata oluştu: ', error);
      }
    }

    fetchOrders();

  }, [userId]);


  useEffect(() => {
    orders.forEach(order => {
      order.orderContent.forEach(async (content) => {
        try {
          const productInf = await getProduct(content.productId);
          setProductImages(prevImages => ({ ...prevImages, [content.productId]: productInf.imageUrl }));
          console.log(productInf);

          setProductInf(prevInfos => ({ ...prevInfos, [content.productId]: productInf }));
          console.log(productInf, typeof productInf);

        } catch (error) {
          console.error('Ürün bilgileri yüklenirken hata oluştu: ', error);
        }
      })
    })
  }, [orders]);


  const calculateTotalPriceForOrder = (order: IOrder) => {
    return order.orderContent.reduce((total, content) => {
      const productInfo = productInf[content.productId];
      if (productInfo) {
        return total + (productInfo.price * content.quantity);
      }
      return total;
    }, 0);
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options).replace(/\//g, '.').replace(',', ' -').replace(':', '.');
  }

  const getProduct = async (productId: any) => {
    const pId = productId;
    const data = await getProductById(pId);
    const imageUrl = data;
    return imageUrl;
  }

  const handleClickOrdersProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  }
  const handleClickDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrderByUserId(userId, orderId);
      const updatedOrders = orders.filter(order => order.orderId !== orderId);
      setOrders(updatedOrders);
      toast.success('Sipariş başarıyla silindi.', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (error) {
      console.error("Sipariş silinirken bir hata oluştu: ", error);
    }
  }

  return (
    <div className='main'>
      <h2 className='order-header'>Siparişlerim</h2>
      {orders.length <= 0 ? (<div className='empty-product-card'>
        <div className='empty-order-items'>
          <CreditCardOffIcon className='empty-order-icon' />
          <p>Siparişlerin henüz boş gibi görünüyor. Üzülme, hemen bir tane ürün sipariş ver ve tekrar gel!!</p>
        </div>
      </div>) : (
        orders.map((order) => {
          const totalPrice = calculateTotalPriceForOrder(order);
          return (
            <div className='order-div' key={order.orderId}>
              <div className='order-detail'>
                <div className='order-date-no'>
                  <div className='order-no'>
                    <span className='number-header'>Sipariş No: </span>
                    <span className='number'>{order.orderId}</span>
                  </div>
                  <div className='order-date'>
                    <span className='date-header'>Sipariş Tarihi: </span>
                    <span className='date'>{formatDate(order.orderDate)}</span>
                  </div>
                </div>
                <div className='order-status'>
                  <span className='status-header'>Sipariş Durumu</span>
                  <span className='status'>{order.orderStatus}</span>
                </div>
              </div>
              {order.orderContent.map((content) => {
                // console.log(order.productId);
                // const a = getProduct(content.productId).then(res => {
                //   return res.imageUrl;
                // });
                // console.log(a);
                const productInfo = productInf[content.productId];

                console.log(productImages[content.productId]);

                return (

                  <div className='order-content' key={content.productId}>
                    <div className='content' onClick={() => {handleClickOrdersProduct(content.productId)}}>
                      <div className='img-div'>
                        {productImages[content.productId] && <img src={productImages[content.productId]} alt="" />}
                      </div>
                      <div className='inf-div'>
                        {productInfo && (
                          <>
                            <div className='infoGroup'>
                              <label htmlFor="pName">Ürün:</label>
                              <p className='pName'>{productInfo.name}</p>
                            </div>
                            <div className='infoGroup'>

                              <label htmlFor="pPrice">Ürün Fiyatı:</label>
                              <p>{formatPrice(productInfo.price)} TL</p>
                            </div>
                            <div className='infoGroup'>
                              <label htmlFor="pRate">Ürün Puanı:</label>
                              <div className='rate-div'>
                                <StarRating rating={productInfo.rating} />
                                <p>{productInfo.rating}</p>

                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='quantity-total-price'>
                      <label htmlFor="pPrice">{content.quantity} Adet</label>
                      <p>{productInfo && (formatPrice(productInfo.price * content.quantity))} TL</p>
                    </div>
                  </div>
                )
              })}
              <div className='address-information'>
                <div className='address-line'>
                  <label htmlFor="addressName">Adres Başlığı:</label>
                  <p className='addressName'>{order.selectedAddress.addressName}</p>
                </div>
                <div className='address-line'>
                  <label htmlFor="nameSurname">Ad Soyad:</label>
                  <p className='nameSurname'>{order.selectedAddress.name} {order.selectedAddress.lastname}</p>
                </div>
                <div className='address-line'>
                  <label htmlFor="phoneNumber">Telefon Numarası</label>
                  <p className='phoneNumber'>{order.selectedAddress.phoneNumber}</p>
                </div>
                <div className='address-line'>
                  <label htmlFor="addressLine">Adres Satırı:</label>
                  <p className='addressLine'>{order.selectedAddress.neighbourhood} mah, {order.selectedAddress.addressLine}, {order.selectedAddress.district} / {order.selectedAddress.province}</p>
                </div>
              </div>
              <div className='order-footer'>
                <div className='general-total'>
                  <label htmlFor="total-price">Genel Toplam:</label>
                  <p className='total-price'>{formatPrice(totalPrice)} TL</p>
                </div>
                {order.orderStatus === 'Processing' ? (<div className='delete-order' onClick={() => {handleClickDeleteOrder(order.orderId)}}>
                  Siparişi İptal Et
                </div>) : (null)}

              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default MyOrders