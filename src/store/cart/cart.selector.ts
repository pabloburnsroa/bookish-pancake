import { createSelector } from 'reselect';
import { CartState } from './cart.reducer';

// Will return slice of state
const selectCartReducer = (state): CartState => state.cart;

// Get cart items from slice of state
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// Get boolean from isCartOpen
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// Get cart count
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// Get cart total
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
