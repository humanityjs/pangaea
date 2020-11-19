import React from 'react';
import { ICart, IProduct } from './types';
import { formatMoney } from '../utils';

interface ICartItemProps {
  item: ICart;
  currency: string;
  addToCart: (item: IProduct, action?: 'add' | 'remove') => null | void;
}

const CartItem: React.FC<ICartItemProps> = ({ item, currency, addToCart }) => {
  return (
    <div className="cart-item">
      <span className="cart-title">{item.title}</span>
      <div className="cart-item-image-div">
        <div className="cart-item-image">
          <img src={item.image_url} alt={item.title} />
        </div>
      </div>
      <div className="selector-price">
        <div className="selector">
          <div className="input">
            <button
              onClick={() => addToCart(item, 'remove')}
              className="action"
            >
              -
            </button>
            <input disabled value={item.quantity} />
            <button onClick={() => addToCart(item)} className="action">
              +
            </button>
          </div>
        </div>
        <span className="item-price">{`${currency}${formatMoney(
          item.price * item.quantity
        )}.00`}</span>
        <span> </span>
      </div>
    </div>
  );
};

export default CartItem;
