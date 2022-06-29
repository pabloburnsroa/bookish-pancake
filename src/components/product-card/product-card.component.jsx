import './product-card.styles.scss';
import Button, { button_type_classes } from '../button/button.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  // const { addItemToCart } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const addProductToCard = () => dispatch(addItemToCart(cartItems, product));
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        button_type={button_type_classes.inverted}
        onClick={addProductToCard}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
