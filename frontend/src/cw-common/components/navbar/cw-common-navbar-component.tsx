// Local imports
import './cw-common-navbar.scss'
import * as AppConstants from '../../../AppConstants';

// React Hooks
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

// Icon
import { IconContext } from "react-icons";
import { MdShoppingCartCheckout, MdShoppingCart } from "react-icons/md";

export interface CWCommonNavbarLink {
    url: string,
    name: string
}
export const urlToPathMapping: Record<string, string> = {
    '/videos': 'Videos',
    '/store': 'Merch',
    '/car_world_nation': 'Car World Nation',
    '/wiki': 'Our Mission',
    '/my_carworld': 'My Profile',
    '/auth': 'My Profile',
    '/': 'Home'
}

function CWCommonNavbarComponent() {
    // Redux State
    let { cwUser } = useSelector((state: RootState) => state)

    // Get current url path
    const location = useLocation()
    let url: string = location.pathname
    const [selectedUrl, setSelectedUrl] = useState(url)

    // NOTE:
    //   Trying to cause a re-render here to solve the open bug around
    //   navbar highlight going from:
    //     Home -> Merch (no highlight)
    //     X -> Merch -> Home (Merch still highlight)
    useEffect(() => {
        url = location.pathname
        console.log(url)
    }, [location])

    // Left-Oriented Navbar links
    let navbarComponentLinksLeft: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['videos']].path,
            name: 'Videos',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['store']].path,
            name: 'Merch',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['car_world_nation']].path,
            name: 'Car World Nation',
        },
    ]
    let navItemsLeft = navbarComponentLinksLeft.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className={ urlToPathMapping[selectedUrl] === navbarLink.name ? "cw-navbar-highlighted-item" : "cw-navbar-item" }
                 onClick={() => navButtonClick(navbarLink.url)}
                    >
                        { navbarLink.name }
            </div>
        )
    })

    // Right-Oriented Navbar links
    let navbarComponentLinksRight: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['wiki']].path,
            name: 'Our Mission',
        },
        {
            url: cwUser.isLoggedIn ? (
                '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['my_carworld']].path
            ) : (
                '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['auth']].path
            ),
            name: 'My Profile',
        },
    ]
    let navItemsRight = navbarComponentLinksRight.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className={ urlToPathMapping[selectedUrl] === navbarLink.name ? "cw-navbar-highlighted-item" : "cw-navbar-item" }
                 onClick={() => navButtonClick(navbarLink.url)}
                    >
                        { navbarLink.name }
            </div>
        )
    })

    // Central Navbar link
    const homeLink = '../'

    // Navigation
    const navigate = useNavigate()
    const navButtonClick = (url: string) => {
        setSelectedUrl(url)
        navigate(url)
    }

    return (
        <nav className="cw-navbar">
            {/* Set of left-centered nav buttons */}
            <div className="cw-navbar-left-grouping">
                { navItemsLeft }
            </div>
            {/* Central Navbar button */}
            <div className="cw-navbar-central-grouping">
                <div className="cw-navbar-home"
                    onClick={() => navigate(homeLink)}
                >
                </div>
            </div>

            {/* Set of right-centered nav buttons */}
            <div className="cw-navbar-right-grouping">
                { navItemsRight }

                {/* Shopping Cart */}
                <div
                    className={ selectedUrl === "/cart" ? "cw-navbar-highlighted-item" : "cw-navbar-item" }
                    onClick={() => navigate('/cart', { replace: true })}>
                    <IconContext.Provider value={{ className: "shopping-cart-img"}}>
                        { selectedUrl === '/cart' ? <MdShoppingCart /> : <MdShoppingCartCheckout /> }
                    </IconContext.Provider>
                </div>
            </div>
        </nav>
    )
}

export default CWCommonNavbarComponent
