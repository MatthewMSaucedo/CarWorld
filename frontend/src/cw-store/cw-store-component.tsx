import '../App.scss'
import CWStoreItemComponent from './cw-store-item-component'
import * as AppConstants from '../AppConstants'
import { CWStoreItem } from './cw-store-item'
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../cw-common/components/navbar/cw-common-navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CWShoppingCart } from './cw-shopping-cart'
import { CWShoppingCartEntry } from './cw-shopping-cart'
import StripePaymentComponent from './stripe-components/stripe-payment-component'


function CWStoreComponent() {
    // stateful variables
    const [cwShoppingCart, setCwShoppingCart] = useState(new CWShoppingCart())
    const [checkoutClicked, setcheckoutClicked]= useState(false)

    // navigation
    const navigate = useNavigate()


    let shoppingCartFilled = false

    const onChangeCwShoppingCart = (newCwShoppingCart: CWShoppingCart) => {
        setCwShoppingCart(newCwShoppingCart)
        shoppingCartFilled = true
        console.log("!!!!!")
        console.log(`cwShoppingCart.size: ${cwShoppingCart.size}`)
        forceUpdate()
    }

    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    const shoppingCartButton = (
        <div
            className="cw-store-nav-shopping-cart"
            onClick={() => {
                // Initiate PaymentIntent when clicking ShoppingCart
                navigate('/checkout', { replace: true, state: cwShoppingCart })
            }}
        >
            <FontAwesomeIcon
                icon={faCartShopping}
                size="8x"
                color={cwShoppingCart.size > 0 ? "yellow" : "white"}
            />
            <b className="cw-shopping-link">
                Enter CartWorld
            </b>
        </div>
    )

    // Initiate PaymentIntent (clicked from shopping cart)
    /* TODO:

     * OH I THINK I GET THIS! Or at least, how to make mine match the docs...
       What I need to do is put all of this into a PaymentComponent.
       After I do that, this function will really just flip a flag
       in the HTML to render <PaymentComponent>. Once rendered, it will
       have most of this logic in the useEffect(() => {});.

       Might have to make it nonasync I guess. Oh well.

       but so <PaymentComponent> should return:
           <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
                </Elements>
            )}
            </div>

       so I need two new components
       PaymentComponent, and CheckoutForm.

     */
    const initiatePaymentFlow = async () => {
    }

    const storeItems = AppConstants.STORE_ITEMS.map((value: CWStoreItem)=>{
        return (
            CWStoreItemComponent(value, cwShoppingCart, onChangeCwShoppingCart)
        )
    })

    return (
        <div>
            {shoppingCartButton}
            <div className="cw-store-container">
                {/* Items sold in shop */}
                {storeItems}
            </div>
        </div>
    )

}

export default CWStoreComponent
