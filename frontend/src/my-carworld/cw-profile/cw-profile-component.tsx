// Local code
import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"
import * as AppConstants from '../../AppConstants'
import CWFooterComponent from "../../cw-common/components/footer/cw-footer-component"
import { CWStoreItem } from "../../cw-store/cw-store-item"
import CWMobileNavbarComponent from "../../cw-common/components/navbar/cw-mobile-navbar-component"

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

// Loading Spinner
import Spinner from 'react-bootstrap/Spinner'

// Custom Hook
import useMediaQuery from "../../cw-common/functions/cw-media-query"

// AgGrid
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component

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

    // Stateful hooks
    //   Change to loading-screen while we wait on API calls
    //   Determine which form to show, login or register
    const [apiIsLoading, setApiIsLoading] = useState(false);

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

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    const apiLoadingSpinner = () => {
        return (
            <Spinner animation="border" role="status" style={{color: "green", width: "10rem", height: "10rem"}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    // DDP Leaderboard def
    const [columnDefs] = useState<any>([
        {
            field: 'username',
            autoHeight: true,
            wrapText: true,
            rowDrag: false,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 510 : 800
        },
        {
            field: 'ddp',
            sort: 'desc',
            rowDrag: false,
            suppressMovable: true,
            /* autoSizeColumn: true */
        }
    ])
    const [rowData, setRowData] = useState<any>([
        { username: 'mitzi', ddp: 100},
        { username: 'Tim', ddp: 85},
        { username: 'themattsaucedo', ddp: 50},
        { username: 'Matthew Saucedo', ddp: 150},
        { username: 'Conan', ddp: 44},
        { username: 'Eric', ddp: 20},
        { username: 'mitzi', ddp: 100},
        { username: 'Tim', ddp: 85},
        { username: 'themattsaucedo', ddp: 50},
        { username: 'Conan', ddp: 44},
        { username: 'Eric', ddp: 20},
        { username: 'mitzi', ddp: 100},
        { username: 'Tim', ddp: 85},
        { username: 'themattsaucedo', ddp: 50},
        { username: 'Conan', ddp: 44},
        { username: 'Eric', ddp: 20},
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
        const numRows = 5
        const tableHeight = isMediumDevice || isSmallDevice ? 40 + (42 * (numRows/2)) : 50 + (42 * numRows)
        return tableHeight
    }

    // Determine index of DDP item for potential navigation (clicking BUY DDP)
    const determineDDPIndex = (): number => {
        const ddpIndex = AppConstants.STORE_ITEMS.findIndex((storeItem: CWStoreItem) => {
            return storeItem.title === "Devotion Point"
        })
        return ddpIndex
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
            `/product/${ddpIndex}`,
            { replace: true }
        )
    }

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Profile */}
            <div className="cw-profile-container">
                {/* Add a yellow banner to mimic navbar for mobile */}
                {isMediumDevice || isSmallDevice ? (
                    <div className="cw-mobile-banner"></div>
                ) : <></>}

                {/* Content */}
                <div className={`my-carworld-card${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>

                    <div className="card-content">
                        {/* Username */}
                        <p className="username"> {cwUser.username} </p>

                        {/* User's DDP */}
                        <p className="card-content-my-ddp-text">
                            My Digital Devotion Points:
                        </p>
                        { apiIsLoading ? apiLoadingSpinner() : (
                            <p className="user-ddp-point-value">
                                { cwUser.ddp }
                            </p>
                        )}
                    </div>

                    {/* DDP Hierarchy */}
                    <div className="card-content">
                        <div className="devotion-point-header">
                            <p className="devotion-point-title">Hierarchy</p>
                        </div>
                        { apiIsLoading ? apiLoadingSpinner() : (
                            <div className="ag-theme-alpine"
                                style={{
                                    width: isMediumDevice || isSmallDevice ? 200 : 400,
                                    // Dynamic sizing based on cart size
                                    height: determineCartTableHeight(),
                                }}>
                                    <AgGridReact
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        onGridReady={onGridReady}
                                        rowHeight={ isMediumDevice || isSmallDevice ? 22 : 50 }
                                        headerHeight={22}
                                    />
                            </div>
                        )}
                    </div>

                    {/* Buy DDP Button (redirect to store page) */}
                    <div className="card-content">
                        <button className="buy-ddp" onClick={() => onClickBuyDDP()}>
                            BUY DDP
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
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
