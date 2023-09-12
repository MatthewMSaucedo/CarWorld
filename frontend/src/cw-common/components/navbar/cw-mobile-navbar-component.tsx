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

// Burger Menu
import { slide as Menu } from 'react-burger-menu'

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

    // Navbar links
    let navbarComponentLinksLeft: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'Home',
        },
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

    // Nav Items
    let navItems = navbarComponentLinksLeft.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className={ urlToPathMapping[selectedUrl] === navbarLink.name ? "cw-mobile-navbar-highlighted-item" : "cw-mobile-navbar-item" }
                 onClick={() => navButtonClick(navbarLink.url)}
                    >
                        { navbarLink.name }
            </div>
        )
    })

    // Navigation
    const navigate = useNavigate()
    const navButtonClick = (url: string) => {
        setSelectedUrl(url)
        navigate(url)
    }

    return (
        <div>
            <Menu
                customBurgerIcon={ <img alt="Car World logo" src={process.env.PUBLIC_URL + IMAGE_SRC.cwLogoImg} /> }
            >
                { navItems }
            </Menu>
        </div>
    )
}

export default CWMobileNavbarComponent
