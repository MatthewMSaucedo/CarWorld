import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"

import '../my-carworld.scss'
import './cw-profile.scss'

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
                <div className="my-carworld-card">
                    <div className="card-content">
                        <p className="username"> {cwUser.username} </p>
                        <p className="devoted-since">
                            Devoted since: { new Date(cwUser.refreshToken.expiration).toDateString() }
                        </p>
                    </div>
                    <div className="card-content">
                        <p className="devotion-point-title">
                            Digital Devotion Points (DDP)
                        </p>
                        <p className="devotion-point-count">
                            { cwUser.ddp }
                        </p>
                        <button className="buy-ddp">
                            BUY DDP
                        </button>
                    </div>
                </div>
                <button className="log-out">
                    LOG OUT
                </button>
            </div>
        </div>
    )
}

export default CWProfileComponent
