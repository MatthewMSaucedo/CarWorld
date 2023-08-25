import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"

import '../my-carworld.scss'
import './cw-profile.scss'

// React Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { logoutUser } from '../../redux/userSlice'

// React Router
import { useNavigate } from 'react-router-dom'

// React state hook
import { useState } from 'react'

// AgGrid
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import CWFooterComponent from "../../cw-common/components/footer/cw-footer-component"

// Redux typedef
export interface UseSelectorUser {
    cwUser: CWUser
}


function CWProfileComponent() {
    // Redux
    let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    // DDP Leaderboard def
    const [columnDefs] = useState<any>([
        {field: 'username'},
        {field: 'ddp'}
    ])
    const [rowData, setRowData] = useState<any>([
        { username: 'mitzi', ddp: 100},
        { username: 'Tim', ddp: 85},
        { username: 'themattsaucedo', ddp: 50},
        { username: 'Conan', ddp: 44},
        { username: 'Eric', ddp: 20},
    ])

    // DDP Leaderboard dynamically size
    const onGridReady = (params: any) => {
        params.api.sizeColumnsToFit();
        params.api.resetRowHeights();
    };
    const determineCartTableHeight = () => {
        let numRows = 5
        return 50 + (42 * numRows)
    }

    // Navigation
    const navigate = useNavigate()

    const onClickLogout = () => {
        dispatch(logoutUser(null))

        // Navigate to profile
        navigate('/auth')
    }

    const onClickBuyDDP = () => {
        // TODO: navigate to SPECIFIC DDP store page
        navigate('/store')
    }

    return (
        <div>
            <CWCommonNavbarComponent />
            <div className="cw-profile-container">
                <div className="my-carworld-card">
                    <div className="card-content">
                        <p className="username"> {cwUser.username} </p>
                        <p className="devoted-since">
                            Devoted since: { cwUser.joined }
                        </p>
                    </div>
                    <div className="card-content">
                        <p className="devotion-point-title">
                            Digital Devotion Point Leaderboard
                        </p>
                        <div className="ag-theme-alpine"
                            style={{
                                width: 400,
                                // Dynamic sizing based on cart size
                                height: determineCartTableHeight()
                            }}>
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    onGridReady={onGridReady}
                                />
                        </div>
                    </div>
                    <div className="card-content">
                        <p className="devotion-point-title">
                            My DDP: { cwUser.ddp }
                        </p>
                        <button className="buy-ddp" onClick={() => onClickBuyDDP()}>
                            BUY DDP
                        </button>
                    </div>
                </div>
                <div className="my-carworld-card">
                    <div className="card-content">
                        <button className="log-out" onClick={() => onClickLogout()}>
                            LOG OUT
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWProfileComponent
