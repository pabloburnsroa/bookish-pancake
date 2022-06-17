import './button.styles.scss';

// Apply button styles through dynamic classes
const button_type_classes = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, button_type, ...otherProps }) => {
  return (
    <button
      className={`button-container ${button_type_classes[button_type]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default Button;
