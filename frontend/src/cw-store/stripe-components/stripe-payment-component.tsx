// Styles
import '../../App.scss'
import './stripe-payment.scss'

// Local Imports
import { CWShoppingCart, CWShoppingCartEntry } from '../cw-shopping-cart'
import CheckoutForm from "./CheckoutForm"
import { CWShoppingItemType } from '../cw-store-item'
import { CW_API_ENDPOINTS } from '../../AppConstants'
import { CWUser } from '../../my-carworld/auth/models/cw-user'

// React Hooks
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'
import { RootState } from '../../redux/store'

// 3rd Party Lib
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import CWCommonLoadingComponent from '../../cw-common/components/loading/cw-common-loading-component'

// Initialize Stripe
// TODO: Resolve issue wherein this AppConstant reference fails due to
//       declaration before initialization
// import { STRIPE_PUB_KEY } from '../../AppConstants'
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
export interface UseSelectorUser {
    cwUser: CWUser
}

function StripePaymentComponent() {
    // Route hook (for state passed by /checkout)
    const location = useLocation()

    // Stateful variables
    const [clientSecret, setClientSecret] = useState("")

    // Redux State variable
    let { cwShoppingCart } = useSelector((state: RootState) => state)
    let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)

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

    // API Calls
    const initiatePaymentIntentApiCall = async (paymentIntentPayload: any) => {
        const initPaymentIntentRawRes = await fetch(CW_API_ENDPOINTS.commerce.secret, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": cwUser.authToken.token // Grab token state
            },
            body: JSON.stringify(paymentIntentPayload),
        })
        const initPaymentIntentRes = await initPaymentIntentRawRes.json()
        return initPaymentIntentRes
    }
    const cacheEmailApiCall = async (cacheEmailPayload: any) => {
        const cacheEmailRawRes = await fetch(CW_API_ENDPOINTS.commerce.cache_email, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": cwUser.authToken.token // Grab token state
            },
            body: JSON.stringify(cacheEmailPayload),
        })
        const cacheEmailRes = await cacheEmailRawRes.json()
        return cacheEmailRes
    }


    // Initiate PaymentIntent (and, if guest, cache email)
    useEffect(() => {
        (async () => {
            console.log("initiating payment flow...")

            let formattedShoppingCart = convertFrontendCartToBackendCart(cwShoppingCart)

            // Create PaymentIntent
            const paymentIntentPayload = { cart: formattedShoppingCart }
            const initPaymentIntentRes = await initiatePaymentIntentApiCall(paymentIntentPayload)

            console.log(initPaymentIntentRes)
            if (initPaymentIntentRes.message === "Forbidden") {
                // TODO: Toast? Then nav to cart again?
                console.log("401 Error")
            }

            // cache email if user is a guest
            if (!cwUser.isLoggedIn) {
                const cacheEmailPayload = {
                    email: location.state.guestEmail,
                    transaction_id: initPaymentIntentRes.body?.stripe_payment_intent_id
                }
                const cacheEmailRes = await cacheEmailApiCall(cacheEmailPayload)
                if (cacheEmailRes.code !== 200) {
                    // TODO: Toast? Then nav to cart again?
                    console.log("401 Error")
                }
            }

            setClientSecret(initPaymentIntentRes.body?.client_secret)
        })()

        return () => { }
    // NOTE:
    //   Empty dependency array to prevent re-rendering
    }, [])

    // Stripe Checkout Config
    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            /* theme: 'night', // duh */
        },
    }

    // HTML
    return (
        <div className="">
        { clientSecret ? <></> : <CWCommonLoadingComponent /> }
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
                {/* <AddressForm /> */}
            </Elements>
        )}
        </div>
    )
}

export default StripePaymentComponent
