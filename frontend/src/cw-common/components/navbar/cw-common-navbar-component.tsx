// Local imports
import '../../../App.scss';
import './cw-common-navbar.scss'
import * as AppConstants from '../../../AppConstants';

// React imports
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// 3rd party import
import Button from 'react-bootstrap/Button';


export interface CWCommonNavbarLink {
    url: string,
    name: string
}

function CWCommonNavbarComponent() {
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
    ]
    let navItemsLeft = navbarComponentLinksLeft.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className="cw-navbar-item"
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
            name: 'Wiki',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['my_carworld']].path,
            name: 'My Car World',
        },
    ]
    let navItemsRight = navbarComponentLinksRight.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className="cw-navbar-item"
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
    const navButtonClick = (route: string) => {
        navigate(route)
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

            {/* Set of left-centered nav buttons */}
            <div className="cw-navbar-right-grouping">
                { navItemsRight }
            </div>
        </nav>
    )
}

export default CWCommonNavbarComponent
