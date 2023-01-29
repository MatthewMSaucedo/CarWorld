import '../App.scss';
import CWStoreItemComponent from './cw-store-item-component';
import * as AppConstants from '../AppConstants';
import { CWStoreItem } from './cw-store-item';
import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import React, { useState } from "react";
import '../cw-common/components/navbar/cw-common-navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CWShoppingCart } from './cw-shopping-cart';

/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */

/* import CWCommonNavboxComponent from '../cw-common/components/navbox/cw-common-navbox-component'; */

function CWStoreComponent() {
    const [cwShoppingCart, setCwShoppingCart] = useState(new CWShoppingCart());
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
            onClick={() => alert(cwShoppingCart.size)}
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

    const navbarComponentLinks: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'Home',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'Login',
        },
    ]

    const storeItems = AppConstants.STORE_ITEMS.map((value: CWStoreItem)=>{
        return (
            CWStoreItemComponent(value, cwShoppingCart, onChangeCwShoppingCart)
        )
    })

    return (
        <div>
            <div className="cw-common-page-header">
                { CWCommonNavbarComponent(navbarComponentLinks, shoppingCartButton) }
                {/* <FontAwesomeIcon icon={['fas', 'shopping-cart']} /> */}
            </div>
            <div className="cw-common-page-container">
                {/* Items sold in shop */}
                {storeItems}
            </div>
        </div>
    )
}

export default CWStoreComponent
