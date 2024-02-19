import React, { useEffect, useState } from 'react';
import './CartItem.scss';
import { CartProduct, CartItemProps } from '../../modals/ICartProduct';
import { Product } from '../../modals/IProduct';
import Quantity from '../quantity/Quantity';
import { deleteProductInDB, updateCartInDB } from '../../services/cartService';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

//Because i have one colon = id = number.
type User = {
    id: string | number;
}

const CartItem: React.FC<CartItemProps> = ({ item, product }) => {

    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const updateLocalStorageAndDB = async () => {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            const updateCartItems = cartItems.map((cartItem: CartProduct) =>
                cartItem.productId === item.productId ? { ...cartItem, quantity } : cartItem
            );
            localStorage.setItem('cart', JSON.stringify(updateCartItems));

            if (user) {
                try {
                    const userId = String(user)
                    await updateCartInDB(userId, updateCartItems);
                } catch (error) {
                    console.error("DB - Cart update edilirken bir hata oluştu: ", error);
                }
            }
        };

        updateLocalStorageAndDB();
    }, [quantity, item.productId, user]);

    useEffect(() => {
        const userItem = localStorage.getItem('user');
        const userValue = userItem ? JSON.parse(userItem) : null;
        if (userValue) {
            setUser(userValue);
        }
    }, []);

    const handleDeleteProduct = async (productId: number) => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCartItems = cartItems.filter((cartItem: CartProduct) => cartItem.productId !== productId);

        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

        if(user) {
            try{
                await deleteProductInDB(String(user), updatedCartItems);
            } catch(error) {
                console.error("DB - Product deletion error: ", error);
            }
        }
    }

    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className='cart-item'>
            <div className='img-div'>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className='info'>
                <div className='product-name'>
                    <h3>{product.name}</h3>
                </div>
                <div className='product-quantity'>
                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                    <div className='delete-product' onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteOutlineIcon className='delete-symbol'/>
                    </div>
                    {/* <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button> */}
                </div>
            </div>
            <div className='product-price'>
                <div>
                    <p>{(product.price * item.quantity).toFixed(2)}</p>
                    <p className='tl'>TL</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem