// Styles
import '../../App.scss'
import './payment-processed.scss'

// Local Imports
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component'
import { clearCart } from '../../redux/shoppingCartSlice';

// React Hooks
import { useDispatch } from 'react-redux';


// This component is displayed after the Stripe Modal completes a payment successfully
function CWPaymentProcessedComponent() {
    // Hooks
    const dispatch = useDispatch()

    // Clear the cart, now that the items have been purchased
    dispatch(clearCart(null))

    return (
        <div className="cw-common-page-container">
            {/* Navbar */}
            { CWCommonNavbarComponent() }

            {/* Success Message */}
            <div className="cw-payment-processed-container">
                    Your payment was processed successfully!
                    Expect an email regarding confirmation.
            </div>
        </div>
    )
}

export default CWPaymentProcessedComponent
