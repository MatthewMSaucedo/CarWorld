import '../App.scss'
import Button from 'react-bootstrap/Button';
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
        console.log(`cwShoppingCart.contents: ${cwShoppingCart.contents[0].size}`)
        forceUpdate()
    }

    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    const shoppingCartButton = (
        <div className="cw-store-nav-shopping-cart">
            <Button variant="primary" size="lg" disabled={cwShoppingCart.size > 0 ? false : true}
                onClick={() => {
                    // Initiate PaymentIntent when clicking ShoppingCart
                    navigate('/checkout', { replace: true, state: cwShoppingCart })
                }}
            >
                Go to Cart
            </Button>
        </div>
    )
// {cwShoppingCart.size > 0 ? active : disabled}
    const storeItems = AppConstants.STORE_ITEMS.map((value: CWStoreItem)=>{
        return (
            CWStoreItemComponent(value, cwShoppingCart, onChangeCwShoppingCart)
        )
    })

    return (
        <div>
            <div className="cw-store-container">
                {/* Items sold in shop */}
                {storeItems}
            </div>
        </div>
    )

}

export default CWStoreComponent
