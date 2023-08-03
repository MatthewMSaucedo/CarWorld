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
            <div className="cw-common-navbar-item">
                <b>
                    <Button
                        onClick={() => navButtonClick(navbarLink.url)}
                        variant="primary"
                        size="lg"
                    >
                        { navbarLink.name }
                    </Button>
                </b>
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
            <div className="cw-common-navbar-item">
                <b>
                    <Button
                        onClick={() => navButtonClick(navbarLink.url)}
                        variant="primary"
                        size="lg"
                        disabled={ navbarLink.name === "My Car World__TODO: REMOVE ME__" ? true : false }
                    >
                        { navbarLink.name }
                    </Button>
                </b>
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
        <div className="cw-common-navbar-wrapper">
            {/* Set of left-centered nav buttons */}
            <div className="cw-common-navbar-item-grouping">
                { navItemsLeft }
            </div>

            {/* Central Navbar button */}
            <div className="cw-common-navbar-item-grouping">
                <div className="cw-common-navbar-home">
                    <b>
                        <Link
                        className="cw-common-link"
                        to={ homeLink }
                        >
                            Home
                        </Link>
                    </b>
                </div>
            </div>

            {/* Set of left-centered nav buttons */}
            <div className="cw-common-navbar-item-grouping">
                { navItemsRight }
            </div>
        </div>
    )
}

export default CWCommonNavbarComponent
