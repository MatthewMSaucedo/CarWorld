import './stripe-payment.scss'

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component';

export default function CheckoutForm() {
  // Stripe init
  const stripe = useStripe();
  const elements = useElements();

  // Stateful variables
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          alert("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          alert("Payment succeeded!");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          alert("Payment succeeded!");
          break;
        default:
          setMessage("Something went wrong.");
          alert("Payment succeeded!");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // TODO: (PaymentProcessedComponent)
        //   Just a message with details and a button that redirects
        //   to the Home page.
        // return_url: "https://carworldneedsme.netlify.app/payment_processed",
        return_url: "http://localhost:3000/payment_processed",
        // NOTE: This ensures customers receive a confirmation email
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      // TODO: replace this stuff with Toast logic
      setMessage(error.message);
    } else {
      // TODO: replace this stuff with Toast logic
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    business: {name: "Car World"}
  }

  return (
    <div>
      { CWCommonNavbarComponent() }
      <form id="payment-form" onSubmit={handleSubmit} className="stripe-form-body">
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <h3>Shipping</h3>
        <AddressElement options={{mode: 'shipping'}} />

        <br />

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        { /* TODO: Toast */ }
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
