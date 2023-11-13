// TODO:
//    Add Rank to UI
//    Add Referral to UI

// Local code
import CWCommonNavbarComponent from "../../cw-common/components/navbar/cw-common-navbar-component"
import { CWUser } from "../auth/models/cw-user"
import * as AppConstants from '../../AppConstants'
import CWFooterComponent from "../../cw-common/components/footer/cw-footer-component"
import { CWStoreItem } from "../../cw-store/cw-store-item"
import CWMobileNavbarComponent from "../../cw-common/components/navbar/cw-mobile-navbar-component"
import CWMobileBannerComponent from "../../cw-common/components/navbar/cw-mobile-banner-component"

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

// Backend response type for DDP Ranking
export interface CWDdpRank {
    ddp: number,
    userId: number,
    username: string,
    referral: string,
    cwNationMember: boolean
    rank: number,
}

function CWProfileComponent() {
    // Redux
    let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    // Stateful hooks
    //   Change to loading-screen while we wait on API calls
    const [apiIsLoading, setApiIsLoading] = useState(false);
    //   Fetch User DDP and Rank on page load, as this can change
    const [userDdp, setUserDdp] = useState(0);
    const [userRank, setUserRank] = useState(0);

    useEffect(() => {
        (async () => {
            setApiIsLoading(true)

            // Call ddpRank to determine:
            //   - Rank of user in DDP Leaderboard
            //   - Top 20 users by DDP, and respective DDP values
            const ddpRankRes = await ddpRankApiCall()
            if (ddpRankRes.code !== 200) {
                console.log("Failed to fetch DDP Rank!")
                return
            }
            // Parse login response
            const ddpRankTopTwenty: CWDdpRank[] = ddpRankRes.body.ddpTierList
            const userRecord: CWDdpRank = ddpRankRes.body.callerUser

            setUserDdp(userRecord.ddp)
            setUserRank(userRecord.rank)

            let ddpDataRows: any[] = []
            ddpRankTopTwenty.forEach((entry) => {
                ddpDataRows = ddpDataRows.concat({
                    username: entry.username,
                    ddp: entry.ddp
                })
            })
            setRowData(ddpDataRows)
            console.log(ddpDataRows)

            setApiIsLoading(false)
        })();

        return () => { }

    // NOTE:
    //   Empty dependency array to prevent re-rendering
    }, [])

    // Api call to fetch ddpRank
    const ddpRankApiCall = async () => {
        const ddpRankRawApiRes = await fetch(AppConstants.CW_API_ENDPOINTS.profile.ddp_rank, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": cwUser.authToken.token // Grab token state
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
            <Spinner
                animation="border"
                role="status"
                className="api-loading-spinner"
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    // DDP Leaderboard def
    const [columnDefs] = useState<any>([
        {
            field: 'username',
            headerName: 'Name',
            autoHeight: true,
            wrapText: true,
            rowDrag: false,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 510 : 800
        },
        {
            field: 'ddp',
            headerName: 'DDP',
            sort: 'desc',
            rowDrag: false,
            suppressMovable: true,
            /* autoSizeColumn: true */
        }
    ])

    const [rowData, setRowData] = useState<any>([])

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

            {/* Add a yellow banner to mimic navbar for mobile */}
            {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

            {/* Profile */}
            <div className="cw-profile-container">
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
                                { userDdp }
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

                {/* Referral Code */}
                {/* <div className="my-carworld-card">
                    <div className="card-content">
                    <p>Referral Code: {cwUser.referral}</p>
                    </div>
                    </div>
                  */}
                {/* Footer */}
                { CWFooterComponent() }
            </div>
        </div>
    )
}

export default CWProfileComponent
