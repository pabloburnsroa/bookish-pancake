import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { button_type_classes } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useState } from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);
    // create-payment-intent is expecting an amount, we need to pass in an amount to netlify function
    // Make request to netlify api for create-payment-intent
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      // Stripe expects payments values to be in cents (USD)
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    // We need to get client-secret from the response as that is what will be used to attach the intent to pay with details
    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProcessingPayment(false);
    if (paymentResult.error) {
      console.log(paymentResult.error.code);
      alert(paymentResult.error.code);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <Button
          isLoading={isProcessingPayment}
          button_type={button_type_classes.inverted}
        >
          Pay Now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
