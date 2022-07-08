import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useCallback } from 'react';

const CartDropdown = () => {
  // Component will re run when cartitems changes
  const cartItems = useSelector(selectCartItems);
  // const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  /* useCallBack() takes in 2 arguments - 1 callback function, 2 dependency array - it can help with performance optimization by memoizing the function (not the return of the function) */
  const goToCheckout = useCallback(() => {
    navigate('/checkout');
    // setIsCartOpen(!isCartOpen);
  }, []);
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckout}>Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
