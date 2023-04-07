import '../../../App.scss';
import './cw-common-navbar.scss'
import * as AppConstants from '../../../AppConstants';
import { Link } from 'react-router-dom';

function CWCommonNavbarComponent() {
    let navbarComponentLinks: CWCommonNavbarLink[] = [
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['videos']].path,
            name: 'Videos',
        },
        {
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'About Us',
        },
    ]
    let isLoggedIn = false
    if(isLoggedIn) {
        navbarComponentLinks = navbarComponentLinks.concat({
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'Account',
        })
    } else {
        navbarComponentLinks = navbarComponentLinks.concat({
            url: '../' + AppConstants.CW_ROUTES[AppConstants.CW_ROUTE_ENUM['home']].path,
            name: 'Login/Register',
        })
    }
    let navItems = navbarComponentLinks.map((navbarLink: CWCommonNavbarLink)=>{
        return (
            <div className="cw-common-navbar-item">
                <b>
                    <Link
                        className="cw-common-link"
                        to={ navbarLink.url }
                    >
                        { navbarLink.name }
                    </Link>
                </b>
            </div>
        )
    })
    const homeLink = '../'

    return (
        <div className="cw-common-navbar-wrapper">
            <div className="cw-common-navbar-item-grouping">
                <div className="cw-common-navbar-item">
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
