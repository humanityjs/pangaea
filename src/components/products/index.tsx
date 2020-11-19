import React, { useState, useEffect, ChangeEvent } from 'react';
import './products.scss';
import { useQuery } from '@apollo/client';
import { PRODUCTS, CURRENCIES } from './query';
import Product from './Product';
import { IProduct, ICart } from './types';
import CartItem from './CartItem';
import currencies from './currencies.json';
import { formatMoney } from '../utils';

const Products: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [previousCurrency, setPreviousCurrency] = useState<string>('USD');
  const [cart, setCart] = useState<{ [key: string]: ICart }>({});
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sidebarOpen, setSideBar] = useState(false);

  const {
    loading: currencyLoading,
    error: currencyError,
    data: currency,
  } = useQuery(CURRENCIES);

  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { currency: selectedCurrency },
  });

  const changeCurrency = (e: any) => {
    setPreviousCurrency(selectedCurrency);
    setSelectedCurrency(e.target.value);
  };

  const addToCart = (
    item: IProduct | ICart,
    action: 'add' | 'remove' = 'add'
  ) => {
    if (action === 'add') {
      const newItem = cart[`${item.id}`];
      if (newItem) {
        newItem.quantity = newItem.quantity + 1;
        setCart({
          ...cart,
          [`${item.id}`]: newItem,
        });
      } else {
        setCart({
          ...cart,
          [`${item.id}`]: { ...item, quantity: 1 },
        });
      }
    } else {
      const cartItem = { ...item } as ICart;
      if (cartItem?.quantity === 1) {
        const newCart = {
          ...cart,
        };
        delete newCart[`${item.id}`];
        setCart(newCart);
      } else {
        cartItem.quantity = cartItem.quantity - 1;
        setCart({
          ...cart,
          [`${item.id}`]: cartItem,
        });
      }
    }
    setSideBar(true);
  };

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
    if (!loading && error) {
      setSelectedCurrency(previousCurrency);
    }
  }, [data, error]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [sidebarOpen]);

  const symbol: any =
    JSON.parse(JSON.stringify(currencies))?.[selectedCurrency]?.symbol ?? '';

  const cartTotal = Object.values(cart).reduce((prev: number, curr: ICart) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  if (!products.length && error) {
    return (
      <div className="products-wrapper">
        <p>An error occured. Please try again later</p>
      </div>
    );
  }

  return (
    <div className="products-wrapper">
      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="products">
          {products.map((product: IProduct) => (
            <Product
              currency={symbol}
              product={product}
              key={product.id}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
      <div className={`cart ${sidebarOpen ? 'active' : ''}`}>
        <div
          className={`overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSideBar(false)}
        ></div>
        <div className={`main ${sidebarOpen ? 'active' : ''}`}>
          <div className="top">
            <button onClick={() => setSideBar(false)} className="back-btn">
              &lt;
            </button>
            <span className="span-title">YOUR CART</span>
            <span> </span>
          </div>
          <div className="currency-select">
            <select
              defaultValue={selectedCurrency}
              value={selectedCurrency}
              onChange={changeCurrency}
            >
              {currency?.currency?.map((item: string) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="content">
            {Object.values(cart).map((item) => (
              <CartItem
                addToCart={addToCart}
                currency={symbol}
                item={item}
                key={item.id}
              />
            ))}
            {!Object.values(cart).length && (
              <div className="cart-empty-div">
                <span>Your cart is empty!</span>
              </div>
            )}
          </div>
          <div className="bottom">
            <div className="bottom-content">
              <span className="sub-total">Subtotal</span>
              <span className="total-price">{`${symbol}${formatMoney(
                cartTotal
              )}.00`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
