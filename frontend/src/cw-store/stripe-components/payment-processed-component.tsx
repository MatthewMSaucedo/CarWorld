// Styles
import '../../App.scss'
import './payment-processed.scss'

// Local Imports
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component'
import { clearCart } from '../../redux/shoppingCartSlice';

// React Hooks
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'

import CWMobileNavbarComponent from '../../cw-common/components/navbar/cw-mobile-navbar-component';
import useMediaQuery from '../../cw-common/functions/cw-media-query';
import CWMobileBannerComponent from '../../cw-common/components/navbar/cw-mobile-banner-component';
import CWFooterComponent from '../../cw-common/components/footer/cw-footer-component';


// This component is displayed after the Stripe Modal completes a payment successfully
function CWPaymentProcessedComponent() {
    // Clear the cart, now that the items have been purchased
    const dispatch = useDispatch()
    dispatch(clearCart(null))

    const location = useLocation()
    const paymentIntent = location.state.paymentIntent
    console.log(paymentIntent)

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );


    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Add a yellow banner to mimic navbar for mobile */}
            {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

            {/* Success Message */}
            <div className="cw-payment-processed-container">
                <p className="cw-payment-processed-text">
                    Your payment was processed successfully,
                    { " " + paymentIntent.shipping.name }!
                    Expect an email receipt.
                </p>
                <p className="cw-payment-processed-text">
                    <span>Amount Paid: ${ paymentIntent.amount / 100 }</span>
                    <span>Shipping Info:</span>
                    {/* <span>{ paymentIntent.shipping.phone }</span> */}
                    <span>{ paymentIntent.shipping.address.line1 }</span>
                    <span>{ paymentIntent.shipping.address.line2 }</span>
                    <span>
                        { paymentIntent.shipping.address.city },
                        { " " + paymentIntent.shipping.address.state }
                    </span>
                    <span>
                        { paymentIntent.shipping.address.postal_code },
                        { " " + paymentIntent.shipping.address.country }
                    </span>
                </p>
                <p className="cw-payment-processed-text">
                    Don't see the email? Be sure to check your spam just in case! <br/>For any
                    questions or concerns in relation to your order, please contact William
                    Banks directly at:<br/>williambanks500@gmail.com.
                </p>
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWPaymentProcessedComponent
