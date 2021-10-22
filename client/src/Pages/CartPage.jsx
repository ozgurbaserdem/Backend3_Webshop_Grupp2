import React, { useState, useEffect } from 'react';

import { getCart, getSingleProduct } from '../fetches/fetches';

import { CartCard } from '../components/Cart/CartCard';
import { CartContentsStyled } from '../components/Cart/CartContentsStyled';
import { CartSummaryStyled, PlaceOrderButtonStyled } from '../components/Cart/CartSummaryStyled';

export const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
 
  useEffect(() => {
    setCart([]);
    getCart()
      .then(res => setCart(res.data));
  }, []);

  useEffect(() => {
    setProducts([]);
    cart.map((item) => {
      getSingleProduct(item._id)
        .then(res => setProducts(products => [...products, {...res.data, amount: item.amount} ]));
    });
  }, [cart]);  

  useEffect(() => {
    setTotal(0);
    products.map((item) => {
      setTotal(total + (item.price * item.amount));
    });
  }, [products]);

  const handleOnChange = (e) => {
  };

  const handleOnDelete = (e) => {
  };
    
  return (
    <>
      <CartContentsStyled>
        {products.length > 0
        ?
        products.map((item) => {
          return <CartCard key={item._id} props={item} />
        })
        :
        <p>Cart = empty</p>
        }
      </CartContentsStyled>
      <CartSummaryStyled>
        <p>Sum: {total}:-</p>
        <PlaceOrderButtonStyled>Place Order</PlaceOrderButtonStyled> 
      </CartSummaryStyled>
    </>
  );
};
