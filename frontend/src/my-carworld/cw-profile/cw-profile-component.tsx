// Local code
import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"
import * as AppConstants from '../../AppConstants'

// Local styles
import '../my-carworld.scss'
import './cw-profile.scss'

// React Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { logoutUser } from '../../redux/userSlice'

// React Router
import { useNavigate } from 'react-router-dom'

// React state hook
import { useEffect, useState } from 'react'

// AgGrid
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import CWFooterComponent from "../../cw-common/components/footer/cw-footer-component"
import { CWStoreItem } from "../../cw-store/cw-store-item"

// Redux typedef
export interface UseSelectorUser {
    cwUser: CWUser
}

//
export interface CWDdpRank {
    username: string,
    ddp: number
}

function CWProfileComponent() {
    // Redux
    let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    // Api call to fetch ddpRank
    const ddpRankApiCall = async () => {
        const ddpRankRawApiRes = await fetch(AppConstants.CW_API_ENDPOINTS.profile.ddp_rank, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        })
        const ddpRankRes = await ddpRankRawApiRes.json()

        return ddpRankRes
    }

    /* useEffect(() => { */
        // TODO
        /* (async () => { */
            // Call ddpRank to determind:
            //   - Rank of user in DDP Leaderboard
            //   - Top 5 users by DDP, and respective DDP values
            /* const ddpRankRes = await ddpRankApiCall() */
            /* if (ddpRankRes.code !== 200) { */
            /* console.log("Failed to fetch DDP Rank!") */
            /* return */
            /* } */
            // Parse login response
            /* const ddpRankTopFive: CWDdpRank[] = ddpRankRes.body.ddp_top_five */
            /* const userDdpRank: number = ddpRankRes.body.user_ddp_rank */
        /* })(); */

        /* return () => { } */
    /* }) */



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

    // Determine index of DDP item for potential navigation (clicking BUY DDP)
    const determineDDPIndex = () => {
        AppConstants.STORE_ITEMS.findIndex((storeItem: CWStoreItem) => {
            return storeItem.title === "Devotion Point"
        })
    }
    const ddpIndex = determineDDPIndex()

    // Navigation
    const navigate = useNavigate()

    const onClickLogout = () => {
        dispatch(logoutUser(null))

        // Navigate to profile
        navigate('/auth')
    }

    const onClickBuyDDP = () => {
        navigate(
            `http://localhost:3000/product/${ddpIndex}`,
            { replace: true }
        )
    }

    return (
        <div>
            <CWCommonNavbarComponent />
            <div className="cw-profile-container">
                <div className="my-carworld-card">
                    <div className="card-content">
                        <p className="username"> {cwUser.username} </p>
                        <p className="devoted-since">
                            My Digital Devotion Points:
                        </p>
                        <p className="user-ddp-point-value">
                            { cwUser.ddp }
                        </p>
                    </div>
                    <div className="card-content">
                        <p className="devotion-point-title">
                            Hierarchy
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
                        <button className="buy-ddp" onClick={() => onClickBuyDDP()}>
                            BUY DDP
                        </button>
                    </div>
                </div>
                <div className="card-content">
                    <button className="log-out" onClick={() => onClickLogout()}>
                        LOG OUT
                    </button>
                </div>
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWProfileComponent
