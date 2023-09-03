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

    // Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Stateful variables
    const [columnDefs] = useState<any>([
        {field: 'Quantity'},
        {field: 'Name'},
        {field: 'Size'},
        {field: 'Price'},
        {field: 'Action', minWidth: 175, cellRenderer: CWCartDeletionRenderer }
    ])
    const [rowData, setRowData] = useState<any>()

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

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
        params.api.resetRowHeights();
    };
    const determineCartTableHeight = () => {
        let numRows = cwShoppingCart.size
        cwShoppingCart.contents.forEach((entry: CWShoppingCartEntry) => {
            numRows -= entry.quantity > 1 ? (entry.quantity - 1) : 0
        })

        return 50 + (42 * numRows)
    }

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            <div className={`cw-cart-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                {/* Add a yellow banner to mimic navbar for mobile */}
                {isMediumDevice || isSmallDevice ? (
                    <div className="cw-mobile-banner"></div>
                ) : <></>}

                {/* Header */}
                <div className="cw-cart-header">
                    <Link className="cw-cart-link" to={ '/store' }>
                        Continue shopping
                    </Link>
                </div>


                {/* Shopping Cart Table */}
                <div className="ag-theme-alpine"
                     style={{
                         width: 800,
                         // Dynamic sizing based on cart size
                         height: determineCartTableHeight()
                     }}>

                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={onGridReady}
                        onCellClicked={onCellClicked}
                        />
                </div>

                {/* Checkout button */}
                <Button className="cw-cart-checkout-button"
                    as="a"
                    variant="outline-success"
                    onClick={ () => navigate('/checkout', { replace: true }) }>
                    Checkout
                </Button>

            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWCartComponent
