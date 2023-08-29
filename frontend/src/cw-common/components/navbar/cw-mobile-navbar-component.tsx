// Local imports
import './cw-mobile-navbar.scss'
import * as AppConstants from '../../../AppConstants';
import * as IMAGE_SRC from '../../../assets/images'

// React Hooks
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

// Icon
import { IconContext } from "react-icons";
import { MdShoppingCartCheckout, MdShoppingCart } from "react-icons/md";
import { FaBars } from "react-icons/fa";

// Burger Menu
import { slide as Menu } from 'react-burger-menu'

export interface CWCommonNavbarLink {
    url: string,
    name: string
}
export const urlToPathMapping: Record<string, string> = {
    '/videos': 'Videos',
    '/store': 'Merch',
    '/carworld_nation': 'Car World Nation',
    '/wiki': 'Our Mission',
    '/my_carworld': 'My Profile',
    '/auth': 'My Profile',
    '/': 'Home'
}

function CWMobileNavbarComponent() {
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
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['videos']].path,
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
        <div>
            <Menu
                customBurgerIcon={ <img src={process.env.PUBLIC_URL + IMAGE_SRC.cwLogoImg} /> }
            >
                <a id="Home" className="menu-item" href="/">Home</a>
                <a id="Merch" className="menu-item" href="/store">Merch</a>
                <a id="Videos" className="menu-item" href="/videos">Videos</a>
                <a id="Our Mission" className="menu-item" href="/wiki">Our Mission</a>
                <a id="Car World Nation" className="menu-item" href="/videos">Car World Nation</a>
                <a id="My Profile" className="menu-item" href="/auth">My Profile</a>
                <a id="Cart" className="menu-item" href="/cart">Cart</a>
            </Menu>
        </div>
    )
}

export default CWMobileNavbarComponent
