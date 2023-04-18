// Styles
import '../cw-common/components/navbar/cw-common-navbar.scss'
import './cw-store.scss'
import './cw-cart.scss'
import '../App.scss'

// Local Imports
import * as AppConstants from '../AppConstants'
import { CWStoreItem } from './cw-store-item'
import CWStoreItemComponent from './cw-store-item-component'
import { CWShoppingCartEntry } from './cw-shopping-cart'
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'

// React Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'

// 3rd Party Lib
import Button from 'react-bootstrap/Button';


function CWCartComponent() {
    // Redux State variable
    let { cwShoppingCart } = useSelector((state: RootState) => state)

    // Hooks
    const navigate = useNavigate()

    const cwCartItems = cwShoppingCart.contents.map((entry: CWShoppingCartEntry) => {
       return (
          <div className="cw-cart-item-row">
            <img className="cw-cart-item-img"
                src={entry.cwStoreItem.images[0]}
                alt="This is a very cool item you would love to own"
            />
            <div className="cw-cart-item-title">
                <div>{entry.cwStoreItem.title}</div>
                { entry.size ? (<div>size: {entry.size.toUpperCase()}</div>) : <></> }
            </div>
            <div className="cw-cart-item-price">
                ${entry.cwStoreItem.price}
            </div>
          </div>
       )
    })

    return (
        <div className="cw-common-page-container">
            {/* Navbar */}
            { CWCommonNavbarComponent() }

            <div className="cw-cart-container">

                <div className="cw-cart-header">
                    <div className="">
                        Your Cart
                    </div>
                    <Link className="cw-cart-link" to={ '/store' }>
                        Continue shopping
                    </Link>
                </div>

                <div className="cw-cart-items-container">
                    { cwCartItems }
                </div>

                <Button className="cw-cart-checkout-button"
                    as="a"
                    variant="outline-success"
                    onClick={ () => navigate('/checkout', { replace: true }) }>
                    Checkout
                </Button>

            </div>
        </div>
    )
}

export default CWCartComponent
