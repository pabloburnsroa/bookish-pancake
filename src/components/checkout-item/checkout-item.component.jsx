// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';

import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = ({ checkoutItem }) => {
  const { quantity, name, imageUrl, price } = checkoutItem;
  // const { addItemToCart, removeItemFromCart, clearItemFromCart } =
  //   useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const incrementHandler = () =>
    dispatch(addItemToCart(cartItems, checkoutItem));
  const decrementHandler = () =>
    dispatch(removeItemFromCart(cartItems, checkoutItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, checkoutItem));
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
