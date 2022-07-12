import { FC, ButtonHTMLAttributes } from 'react';
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from './button.styles.jsx';

// Apply button styles through dynamic classes
// emum - constant types
export enum button_type_classes {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
}

const getButton = (button_type = button_type_classes.base): typeof BaseButton =>
  ({
    [button_type_classes.base]: BaseButton,
    [button_type_classes.google]: GoogleSignInButton,
    [button_type_classes.inverted]: InvertedButton,
  }[button_type]);

export type ButtonProps = {
  button_type?: button_type_classes;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  button_type,
  isLoading,
  ...otherProps
}) => {
  const CustomButton = getButton(button_type);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
