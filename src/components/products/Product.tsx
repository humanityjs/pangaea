import React from 'react';
import { IProduct } from './types';
import currencies from './currencies.json';
import { formatMoney } from '../utils';

interface IProductProps {
  product: IProduct;
  currency: string;
  addToCart: (item: IProduct) => null | void;
}

const Product: React.FC<IProductProps> = ({ product, currency, addToCart }) => {
  return (
    <div className="product">
      <div className="image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className="details">
        <span className="title">{product.title}</span>
        <span className="price">{`From ${currency}${formatMoney(
          product.price
        )}.00`}</span>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
