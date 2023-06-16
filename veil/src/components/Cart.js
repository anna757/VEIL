import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // path to your CartContext

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.product.id}>
          <span>{item.product.name}</span>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item.product.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
          <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
      ))}
      <div>Total: {getTotalPrice()}</div>
    </div>
  );
};

export default Cart;
