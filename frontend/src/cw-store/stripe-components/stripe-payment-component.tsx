import '../../App.scss';
import './stripe-payment.scss'
import { CWShoppingCart, CWShoppingCartEntry } from '../cw-shopping-cart';
import CheckoutForm from "./CheckoutForm";

import React, { useState, useEffect } from "react"
import {useLocation} from 'react-router-dom';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
'pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs'
)

function StripePaymentComponent() {
    // grabbing passed in state
    const location = useLocation()
    const shoppingCart: CWShoppingCart = location.state

    console.log("I got here at least...")
    console.log(shoppingCart.contents[0].cwStoreItem.title)

    // stateful variables
    const [clientSecret, setClientSecret] = useState("")

    // Initiate PaymentIntent (clicked from shopping cart)
    useEffect(() => {
        console.log("initiating payment flow...")

        // Format shoppingCart for API body
        let formattedShoppingCart: any[] = []
        shoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            formattedShoppingCart = formattedShoppingCart.concat({
                // TODO: Logic for size if needed, and get quanitity from repeate items in cart
                name: (entry.cwStoreItem.serverName + "_" + entry.size),
                quantity: 1
            })
        })


        // Create PaymentIntent as soon as the page loads
        fetch('https://6vikh38ev7.execute-api.us-east-1.amazonaws.com/commerce/secret', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({ cart: formattedShoppingCart }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.body.client_secret)
                console.log("logging api res...")
                console.log(data.body.client_secret)
            });
    }, []);

    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'night',
        },
    };

    return (
        <div className="cw-common-content-container white-background">
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
                {/* <AddressForm /> */}
            </Elements>
        )}
        </div>
    );
}

export default StripePaymentComponent
