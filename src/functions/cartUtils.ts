import { toast } from 'react-toastify';
import { updateCartInDB } from '../services/cartService';

export type CartItem = {
  productId: number;
  quantity: number;
};

export const addToCart = async (productId: number, quantity: number = 1) => {
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;

  let localCart = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingProduct = localCart.find((item: any) => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    localCart.push({ productId: productId, quantity: quantity });
  }

  localStorage.setItem('cart', JSON.stringify(localCart));

  if (user) {
    try {
      await updateCartInDB(user, localCart);
      toast.success('Ürün sepete eklendi.', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("DB - Cart update edilirken bir hata oluştu: ", error);
    }
  }
};
