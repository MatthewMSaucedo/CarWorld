// Styles
import '../cw-common/components/navbar/cw-common-navbar.scss'
import './cw-store.scss'
import './cw-cart.scss'
import '../App.scss'

// Local Imports
import { CWShoppingCart, CWShoppingCartEntry } from './cw-shopping-cart'
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'
import CWCartDeletionRenderer from './cw-cart-deletion-renderer'
import CWFooterComponent from '../cw-common/components/footer/cw-footer-component'
import CWMobileNavbarComponent from '../cw-common/components/navbar/cw-mobile-navbar-component'
import { CW_API_ENDPOINTS } from '../AppConstants'
import CWMobileBannerComponent from '../cw-common/components/navbar/cw-mobile-banner-component'


// React Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { removeFromCart } from '../redux/shoppingCartSlice';

// Custom Hook
import useMediaQuery from '../cw-common/functions/cw-media-query'

// 3rd Party Lib
import Button from 'react-bootstrap/Button';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

// Useful typedefs
export interface UseSelectorCart {
    cwShoppingCart: CWShoppingCart
}
export interface CWAgGridCartRowData {
    Quantity: number,
    Name: string,
    Size?: string,
    Price: string
}

// TODO: (Redux-persist)
//       It would be nice to persist this shopping cart
//       such that it is still available following
//       a browser refresh.
function CWCartComponent() {
    // Redux State variable
    let { cwShoppingCart }: UseSelectorCart = useSelector((state: RootState) => state)
    console.log(cwShoppingCart)
    let { cwUser } = useSelector((state: RootState) => state)

    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Media query (custom hook)
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    // Checkout Disable Logic
    const [email, setEmail] = useState<string>("")
    const determineCheckoutDisableStatus = (): boolean => {
        if (cwUser.isLoggedIn) {
            return cwShoppingCart.size === 0
        } else {
            return !email.includes("@")
        }
    }
    const [checkoutIsDisabled, setCheckoutIsDisabled] = useState<boolean>(determineCheckoutDisableStatus())
    useEffect(() => {
        const isDisabled = determineCheckoutDisableStatus()
        setCheckoutIsDisabled(isDisabled)
    }, [email])

    console.log(cwShoppingCart)

    // Table column defs
    const [columnDefs] = useState<any>([
        {
            field: 'Quantity',
            headerName: '#',
            autoHeight: true,
            wrapText: true,
            rowDrag: false,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 50 : 500,
        },
        {
            field: 'Name',
            autoHeight: true,
            rowDrag: false,
            resizable: true,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 80 : 800,
            /* resizable: true */
        },
        {
            field: 'Size',
            autoHeight: true,
            wrapText: true,
            rowDrag: false,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 60 : 800,

        },
        {
            field: 'Price',
            autoHeight: true,
            wrapText: true,
            rowDrag: false,
            suppressMovable: true,
            width: isSmallDevice || isMediumDevice ? 65 : 800,
        },
        {
            field: 'Action',
            width: isSmallDevice || isMediumDevice ? 100 : 800,
            cellRenderer: CWCartDeletionRenderer,
        }
    ])
    const [rowData, setRowData] = useState<any>()

    // Function called to remove an item from the cart
    const remove = (title: string, size?: string) => {
        let removedEntry: CWShoppingCartEntry = cwShoppingCart.contents[0]
        cwShoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            if (entry.cwStoreItem.title === title) {
                if (size) {
                    if (entry.size === size) {
                       removedEntry = entry
                    }
                } else {
                    removedEntry = entry
                }
            }
        })

        dispatch(removeFromCart(removedEntry))
    }
    const onCellClicked = (params: any) => {
        remove(params.data.Name, params.data.Size)
    }

    // Iterate over items in the cart and translate to AG-Grid data
    const convertCartDataToAgGridRowData = () => {
        let agGridFormattedCartData: CWAgGridCartRowData[] = []
        cwShoppingCart.contents.forEach( (entry: CWShoppingCartEntry) => {
            agGridFormattedCartData.push({
                Quantity: entry.quantity,
                Name: entry.cwStoreItem.title,
                Size: entry.size,
                Price: "$" + entry.cwStoreItem.price
            })
        })
        setRowData(agGridFormattedCartData)
    }
    useEffect(() => {
        convertCartDataToAgGridRowData()
    }, [cwShoppingCart]) // Include Cart in dependency array so the table re-renders on cart deletions

    // Dynamically size the shopping cart table
    const onGridReady = (params: any) => {
        params.api.sizeColumnsToFit();
    };
    const determineCartTableHeight = () => {
        let numRows = cwShoppingCart.size
        cwShoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            numRows -= entry.quantity > 1 ? (entry.quantity - 1) : 0
        })

        return 35 + (42 * numRows)
    }

    const onClickCheckoutButton = async () => {
        navigate('/checkout', { replace: true, state: { guestEmail: email } })
    }

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Add a yellow banner to mimic navbar for mobile */}
            {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

            <div className={`cw-cart-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                {/* Header */}
                <div className="cw-cart-header">
                    <Link className="cw-cart-link" to={ '/store' }>
                        Continue shopping
                    </Link>
                </div>


                {/* Shopping Cart Table */}
                <div className="ag-theme-alpine"
                     style={{
                         width: isMediumDevice || isSmallDevice ? 350 : 800,
                         // Dynamic sizing based on cart size
                         height: determineCartTableHeight()
                     }}>

                    { cwShoppingCart.size > 0 ? (
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={onGridReady}
                        onCellClicked={onCellClicked}
                        headerHeight={30}
                        />
                    ) : <></>}
                </div>

                { cwUser.isLoggedIn ? <></> : (
                    <form>
                        <div className="cw-cart-form">
                            { /* Email Input */ }
                            <label className="cw-cart-form-input-label">
                                Email Address
                            </label>
                            <input
                                value={email}
                                type="email"
                                className="cw-cart-form-input-field"
                                placeholder="e.g. williambanks500@gmail.com"
                                onChange={ e => setEmail(e.target.value) }
                            />
                        </div>
                    </form>
                )}

                {/* Checkout button */}
                <Button className="cw-cart-checkout-button"
                    variant="outline-success"
                    disabled={ checkoutIsDisabled }
                    onClick={ () => onClickCheckoutButton() }>
                    Checkout
                </Button>

            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWCartComponent
