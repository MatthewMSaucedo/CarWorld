// Styles
import '../../App.scss';
import './stripe-payment.scss'

// Local Imports
import { CWShoppingCart, CWShoppingCartEntry } from '../cw-shopping-cart';
import CheckoutForm from "./CheckoutForm";
import { CWShoppingItemType } from '../cw-store-item';
import { CW_API_ENDPOINTS } from '../../AppConstants';

// React Hooks
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'

// 3rd Party Lib
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe
// TODO: Resolve issue wherein this constant reference fails due to
//       declaration before initialization
// import { STRIPE_PUB_KEY } from '../../AppConstants';
const STRIPE_PUB_KEY = "pk_test_51MVNG0Edd7yLru5yTI1lXrQ3y9cTs01dMpm1K5nFqzVAHkZ0PEhp8gnpqpJyuB2cbbkLI3FSDcxR9MmgNDUgikXM00MHFJnNAs"
const stripePromise = loadStripe(STRIPE_PUB_KEY)

// Useful typdef
export interface BackendCWShoppingCartEntry {
    quantity: number,
    type: CWShoppingItemType,
    frontend_name: string,
    server_name: string,
    size?: string
}

function StripePaymentComponent() {
    // Stateful variables
    const [clientSecret, setClientSecret] = useState("")

    // Redux State variable
    let { cwShoppingCart } = useSelector((state: RootState) => state)

    // Formatting helper for server
    const convertFrontendCartToBackendCart = (cwShoppingCart: CWShoppingCart) => {
        let formattedShoppingCart: BackendCWShoppingCartEntry[] = []
        cwShoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            let commodity = entry.cwStoreItem

            formattedShoppingCart.push(
                // Account for clothing size if relevant
                commodity.type === CWShoppingItemType.Clothing ? {
                    quantity: entry.quantity,
                    type: commodity.type,
                    frontend_name: commodity.title,
                    server_name: commodity.serverName,
                    size: entry.size,
                } : {
                    quantity: entry.quantity,
                    type: commodity.type,
                    frontend_name: commodity.title,
                    server_name: commodity.serverName
                }
            )
        })

        return formattedShoppingCart
    }

    // Initiate PaymentIntent
    useEffect(() => {
        console.log("initiating payment flow...")
        console.log("current shopping cart contents in next log:")
        console.log(cwShoppingCart)

        let formattedShoppingCart = convertFrontendCartToBackendCart(cwShoppingCart)

        // const paymentIntentPayload = { cart: Object.fromEntries(formattedShoppingCart) }
        const paymentIntentPayload = { cart: formattedShoppingCart }
        console.log("payload for backend:")
        console.log(JSON.stringify(paymentIntentPayload))

        // TODO: this url should be sourced from App Constants
        // Create PaymentIntent
        fetch(CW_API_ENDPOINTS.commerce.secret, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "TODO" // Grab token state
            },
            body: JSON.stringify(paymentIntentPayload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setClientSecret(data.body.client_secret)
            });
    // NOTE:
    //   Empty dependency array to prevent re-rendering
    //   (either react is stupid, or I'm stupid... I'd believe either)
    }, []);

    // Stripe Checkout Config
    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'night', // duh
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
}

export default StripePaymentComponent
