import '../../../App.scss';
import './cw-common-navbar.scss'
import { Link } from 'react-router-dom';

function CWCommonNavbarComponent(navbarComponentLinks: CWCommonNavbarLink[], customComponent?: any) {
    const navItems = navbarComponentLinks.map((navbarLink: CWCommonNavbarLink)=>{
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

    return (
        <div className="cw-common-navbar-wrapper">
            {/* set of requested standard nav buttons */}
            { navItems }

            {/* custom navbar button passed in by caller */}
            { customComponent }
        </div>
    )
}

export interface CWCommonNavbarLink {
    url: string,
    name: string
}

export default CWCommonNavbarComponent
