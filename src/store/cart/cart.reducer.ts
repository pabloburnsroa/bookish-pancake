import { /*CART_ACTION_TYPES,*/ CartItem } from './cart.types';
import { AnyAction } from 'redux';
import { setIsCartOpen, setCartItems } from './cart.action';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

  // switch (type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  // return {
  //   ...state,
  //   cartItems: payload,
  // };

  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: payload,
  //     };

  //   default:
  //     return state;
  // }
};
