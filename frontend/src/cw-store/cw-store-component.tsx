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
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"
import useMediaQuery from '../cw-common/functions/cw-media-query' // custom hook

// React Redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// 3rd Party Lib
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'
import CWFooterComponent from '../cw-common/components/footer/cw-footer-component'
import CWMobileNavbarComponent from '../cw-common/components/navbar/cw-mobile-navbar-component'


function CWStoreComponent() {
    // Redux State
    let { cwShoppingCart } = useSelector((state: RootState) => state)
    console.log(cwShoppingCart)

    // Hooks
    const navigate = useNavigate()
    const location = useLocation()
    let route = location.pathname;
    useEffect(() => {
        console.log(route)
    }, [location, route])

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

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
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Store */}
            <div className="cw-store-container">
                {/* Add a yellow banner to mimic navbar for mobile */}
                {isMediumDevice || isSmallDevice ? (
                    <div className="cw-mobile-banner"></div>
                ) : <></>}

                {/* VideoPlayer if home screen */}
                { route === "/" ? (
                    <div className={`cw-video-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                        <ReactPlayer
                            className="cw-react-player"
                            controls={true}
                            playing={false}
                            loop={false}
                            url='https://www.youtube.com/watch?v=FDZsqouKQ3M&t=1s'
                        />
                    </div>) : <></>
                }

                {/* Store items */}
                <div className={`cw-store-items-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                    { storeItems }
                </div>
            </div>


            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWStoreComponent
