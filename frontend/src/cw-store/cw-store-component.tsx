// Styles
import '../cw-common/components/navbar/cw-common-navbar.scss'
import './cw-store.scss'
import '../App.scss'

// Local Imports
import * as AppConstants from '../AppConstants'
import { CWStoreItem } from './cw-store-item'
import CWStoreItemComponent from './cw-store-item-component'
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'

// React Hooks
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'

// 3rd Party Lib
import Button from 'react-bootstrap/Button';


function CWStoreComponent() {
    // Redux State
    let { cwShoppingCart } = useSelector((state: RootState) => state)
    console.log(cwShoppingCart)

    // Hooks
    const navigate = useNavigate()
    const route = useLocation().pathname;

    // CheckoutButton HTML
    const shoppingCartButton = (
        cwShoppingCart.size > 0 ? ( <div className="cw-store-nav-shopping-cart">
            <Button variant="primary" size="lg" disabled={cwShoppingCart.size > 0 ? false : true}
                onClick={() => {
                    navigate('/cart', { replace: true, state: cwShoppingCart })
                }}
            >
                Go to Cart
            </Button>
        </div>
        ) : (<></>)
    )

    // Products sourced from Constants
    const storeItems = AppConstants.STORE_ITEMS.map((value: CWStoreItem, index) => {
        return (
            CWStoreItemComponent(value, index)
        )
    })

    return (
        <div className="cw-common-page-container">
            { route === "/store" ? CWCommonNavbarComponent() : <></> }

            <div className="cw-store-container">
                { shoppingCartButton }
                <div className="cw-store-items-container">
                    {/* Items sold in shop */}
                    { storeItems }
                </div>
            </div>
        </div>
    )
}

export default CWStoreComponent
