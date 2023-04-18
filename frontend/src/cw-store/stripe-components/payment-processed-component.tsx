// Styles
import '../../App.scss'
import './payment-processed.scss'

// Local Imports
import * as AppConstants from '../../AppConstants'
import { CWStoreItem } from '../cw-store-item'
import CWStoreItemComponent from '../cw-store-item-component'
import { CWShoppingCartEntry } from '../cw-shopping-cart'
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component'

// React Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'

// 3rd Party Lib
import Button from 'react-bootstrap/Button';


function CWPaymentProcessedComponent() {
    // Redux State variable
    let { cwShoppingCart } = useSelector((state: RootState) => state)

    // Hooks
    const navigate = useNavigate()

    const cwCartItems = cwShoppingCart.contents.map((entry: CWShoppingCartEntry) => {
       return (
          <div className="cw-payment-processed-item-row">
            <img className="cw-payment-processed-item-img"
                src={entry.cwStoreItem.images[0]}
                alt="This is a very cool item you would love to own"
            />
            <div className="cw-payment-processed-item-title">
                <div>{entry.cwStoreItem.title}</div>
                { entry.size ? (<div>size: {entry.size.toUpperCase()}</div>) : <></> }
            </div>
            <div className="cw-payment-processed-item-price">
                ${entry.cwStoreItem.price}
            </div>
          </div>
       )
    })

    return (
        <div className="cw-common-page-container">
            {/* Navbar */}
            { CWCommonNavbarComponent() }

            <div className="cw-payment-processed-container">
                    Your payment was processed successfully!
                    Expect an email regarding confirmation.
            </div>
        </div>
    )
}

export default CWPaymentProcessedComponent
