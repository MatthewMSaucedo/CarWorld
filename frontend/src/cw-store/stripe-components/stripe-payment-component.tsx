// Styles
import '../../App.scss';
import './stripe-payment.scss'

// Local Imports
import { CWShoppingCart, CWShoppingCartEntry } from '../cw-shopping-cart';
import CheckoutForm from "./CheckoutForm";
import { CWShoppingItemType } from '../cw-store-item';

// React Hooks
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'

// 3rd Party Lib
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
'pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs'
)

function StripePaymentComponent() {
    // Stateful variables
    const [clientSecret, setClientSecret] = useState("")

    // Redux State variable
    let { cwShoppingCart } = useSelector((state: RootState) => state)

    // Initiate PaymentIntent
    useEffect(() => {
        console.log("initiating payment flow...")

        // Format cwShoppingCart for API body
        let formattedShoppingCart: Map<string, any> = new Map<string, any>()
        cwShoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            let commodity = entry.cwStoreItem
            formattedShoppingCart = formattedShoppingCart.set(
                commodity.serverName + (entry.size ? "_" + entry.size : ""),
                formattedShoppingCart.has(commodity.serverName) ? {
                    quantity: formattedShoppingCart.get(commodity.serverName) + 1,
                    type: commodity.type,
                    frontend_name: commodity.title
                } : {
                    quantity: 1,
                    type: commodity.type,
                    frontend_name: commodity.title
                }
            )
        })

        const paymentIntentPayload = { cart: Object.fromEntries(formattedShoppingCart) }
        console.log("payload for backend:")
        console.log(JSON.stringify(paymentIntentPayload))

        // Create PaymentIntent
        fetch('https://6vikh38ev7.execute-api.us-east-1.amazonaws.com/commerce/secret', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(paymentIntentPayload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setClientSecret(data.body.client_secret)
            });
    // Empty dependency array to prevent re-rendering
    }, []);

    // Stripe Checkout Config
    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'night',
        },
    };

    // HTML
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

    // Helper Function
}

export default StripePaymentComponent
