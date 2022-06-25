import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';

// Apply button styles through dynamic classes
export const button_type_classes = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (button_type = button_type_classes.base) =>
  ({
    [button_type_classes.base]: BaseButton,
    [button_type_classes.google]: GoogleSignInButton,
    [button_type_classes.inverted]: InvertedButton,
  }[button_type]);

const Button = ({ children, button_type, ...otherProps }) => {
  const CustomButton = getButton(button_type);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
