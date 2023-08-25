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

// React Redux
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

// 3rd Party Lib
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'
import CWFooterComponent from '../cw-common/components/footer/cw-footer-component'


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
    }, [location])

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
            { CWCommonNavbarComponent() }

            {/* Store */}
            <div className="cw-store-container">
                {/* VideoPlayer if home screen */}
                { route === "/" ? (
                    <div className="cw-home-video-container">
                        <ReactPlayer
                        controls={true}
                        playing={true}
                        loop={true}
                        url='https://www.youtube.com/watch?v=FDZsqouKQ3M&t=1s'
                        />
                    </div>) : <></>
                }

                {/* Store items */}
                <div className="cw-store-items-container">
                    { storeItems }
                </div>
            </div>


            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWStoreComponent
