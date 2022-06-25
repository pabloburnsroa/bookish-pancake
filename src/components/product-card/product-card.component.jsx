import './product-card.styles.scss';
import Button, { button_type_classes } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCard = () => addItemToCart(product);
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
