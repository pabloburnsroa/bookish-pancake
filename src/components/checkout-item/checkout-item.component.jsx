import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ checkoutItem }) => {
  const { quantity, name, imageUrl, price } = checkoutItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const incrementHandler = () => addItemToCart(checkoutItem);
  const decrementHandler = () => removeItemFromCart(checkoutItem);
  const clearItemHandler = () => clearItemFromCart(checkoutItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={decrementHandler} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={incrementHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>

      <div onClick={clearItemHandler} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
