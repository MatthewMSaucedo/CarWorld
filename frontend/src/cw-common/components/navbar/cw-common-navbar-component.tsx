import '../../../App.scss';
import './cw-common-navbar.scss'
import * as AppConstants from '../../../AppConstants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CWCommonNavbarComponent() {
    let navbarComponentLinks: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['videos']].path,
            name: 'Videos',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['store']].path,
            name: 'Merch',
        },
        {
            url: '../',
            name: 'Home',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['wiki']].path,
            name: 'Wiki',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'My Car World',
        },
    ]
    /* let isLoggedIn = false
     * if(isLoggedIn) {
     *     navbarComponentLinks = navbarComponentLinks.concat({
     *         url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
     *         name: 'Account',
     *     })
     * } else {
     *     navbarComponentLinks = navbarComponentLinks.concat({
     *         url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
     *         name: 'Login/Register',
     *     })
     * } */
    let navItems = navbarComponentLinks.map((navbarLink: CWCommonNavbarLink)=>{
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
                    {/* <Link
                        className="cw-common-link"
                        to={ navbarLink.url }
                        >
                        { navbarLink.name }
                        </Link> */}
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
            {/* <div className="cw-common-navbar-item-grouping">
                <div className="cw-common-navbar-item">
                <Button onClick={() => navButtonClick(homeLink)} variant="primary" size="lg">
                Home
                </Button>
                </div>
                </div>
              */}
            <div className="cw-common-navbar-item-grouping">
                {/* set of requested standard nav buttons */}
                { navItems }
            </div>
        </div>
    )
}

export interface CWCommonNavbarLink {
    url: string,
    name: string
}

export default CWCommonNavbarComponent
