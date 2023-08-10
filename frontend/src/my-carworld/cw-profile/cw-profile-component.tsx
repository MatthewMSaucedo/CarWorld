import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"

import '../my-carworld.scss'

// React Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'

export interface UseSelectorUser {
    cwUser: CWUser
}


function CWProfileComponent() {

    let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)
    return (
        <div>
            <CWCommonNavbarComponent />
            <div className="my-carworld-container">
                <div> Hello, {cwUser.username}! I love you. </div>
            </div>
        </div>
    )
}

export default CWProfileComponent
