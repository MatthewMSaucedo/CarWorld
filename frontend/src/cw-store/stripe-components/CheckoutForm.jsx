import './stripe-payment.scss'

import React, { useState } from "react"
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component'
import useMediaQuery from '../../cw-common/functions/cw-media-query'
import CWMobileBannerComponent from '../../cw-common/components/navbar/cw-mobile-banner-component'
import CWMobileNavbarComponent from '../../cw-common/components/navbar/cw-mobile-navbar-component'
import CWFooterComponent from '../../cw-common/components/footer/cw-footer-component'
import { ToastContainer, toast } from 'react-toastify'
import carWorldImg from '../../logo.svg'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'

export default function CheckoutForm({clientSecret}) {
  // Stripe init
  const stripe = useStripe()
  const elements = useElements()

  // Stateful variables
  const [isLoading, setIsLoading] = useState(false)

  // Navigation
  const navigate = useNavigate()

  // Media query
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)")
  const isMediumDevice = useMediaQuery(
      "only screen and (min-width : 769px) and (max-width : 992px)"
  )

  // Toast
  const notify = (input: string) => {
      toast.error(input, {
          theme: "dark",
          position: "top-right",
          icon: ({theme, type}) =>  <img alt="Car World Logo" src={carWorldImg}/>
      })
  }

  // Stripe Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const paymentIntent = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: "https:carworldneedsme.netlify.app/payment_processed",
        return_url: "http://localhost:3000/payment_processed",
      },
      redirect: "if_required"
    })

    console.log(paymentIntent)
    if (!paymentIntent.error) {
      navigate('/payment_processed', { replace: true, state: paymentIntent })
    }

    window.scrollTo(0, 0)
    const error = paymentIntent.error
    if (error.type === "card_error" || error.type === "validation_error") {
      notify(error.message)
    } else {
      notify("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs",
    business: {name: "Car World"}
  }

  return (
    <div>
      {/* Toast */}
      <ToastContainer
          position="top-right"
          toastStyle={{}}/>

      {/* Navbar */}
      { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

      {/* Add a yellow banner to mimic navbar for mobile */}
      {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

      {/* Stripe Checkout Form */}
      <form id="payment-form" onSubmit={handleSubmit} className="stripe-form-body">

        {/* shipping info */}
        <h3>Shipping</h3>
        <AddressElement options={{
          mode: 'shipping',
            fields: {
              phone: 'always',
            },
            validation: {
              phone: {
                required: 'never',
              },
            },
        }} />


        <br />

        {/* Stripe Checkout Form */}
        {/*
          * !NOTE: THIS ELEMENT MUST BE VISIBLE (not hidden by a spinner for example)
          *        for the calls to stripe.confirmPayment to work.
          *        See: (https://github.com/stripe/react-stripe-js/issues/296#issuecomment-1475409947)
          * */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        {/* Submission Button */}
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                className="api-loading-spinner"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : "Pay now"}
          </span>
        </button>
      </form>

      {/* Footer */}
      { CWFooterComponent() }
    </div>
  )
}
