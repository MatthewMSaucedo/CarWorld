import '../../../App.scss';
import './cw-common-navbar.scss'
import * as AppConstants from '../../../AppConstants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CWCommonNavbarComponent() {
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
    let navbarComponentLinksRight: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['wiki']].path,
            name: 'Wiki',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'My Car World',
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
                        disabled={ navbarLink.name === "My Car World" ? true: false }
                    >
                        { navbarLink.name }
                    </Button>
                </b>
            </div>
        )
    })
    let navItemsRight = navbarComponentLinksRight.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className="cw-common-navbar-item">
                <b>
                    <Button
                        onClick={() => navButtonClick(navbarLink.url)}
                        variant="primary"
                        size="lg"
                        disabled={ navbarLink.name === "My Car World" ? true: false }
                    >
                        { navbarLink.name }
                    </Button>
                </b>
            </div>
        )
    })

    const homeLink = '../'

    // navigation
    const navigate = useNavigate()
    const navButtonClick = (route: string) => {
        navigate(route)
    }

    return (
        <div className="cw-common-navbar-wrapper">
            <div className="cw-common-navbar-item-grouping">
                {/* set of requested standard nav buttons */}
                { navItemsLeft }
            </div>
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
            <div className="cw-common-navbar-item-grouping">
                {/* set of requested standard nav buttons */}
                { navItemsRight }
            </div>
        </div>
    )
}

export interface CWCommonNavbarLink {
    url: string,
    name: string
}

export default CWCommonNavbarComponent
