import React, { useState } from 'react';
import './Quantity.scss';

type Props = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Quantity: React.FC<Props> = ({quantity, setQuantity}) => {


    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className='quantity-container'>
            <button className='decrement-button' onClick={decrement}>-</button>
            <div className='quantity-label'>
                <div>{quantity}</div>
                <div>Adet</div>
            </div>
            <button className='increment-button' onClick={increment}>+</button>
        </div>
    )
}

export default Quantity