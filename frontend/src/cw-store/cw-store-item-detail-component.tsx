// Local Imports
import '../App.scss';
import './cw-commodity-display.scss';
import { CWShoppingItemType } from './cw-store-item';
import { CWShoppingCart, CWShoppingCartEntry } from './cw-shopping-cart';
import { STORE_ITEMS, CW_API_ENDPOINTS } from '../AppConstants'
import CWCommonLoadingComponent from '../cw-common/components/loading/cw-common-loading-component';
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component';

// React Hooks
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom';

// Redux
import { addToCart, updateCart } from '../redux/shoppingCartSlice';
import { useDispatch } from 'react-redux';

// Custom Hook
import useMediaQuery from '../cw-common/functions/cw-media-query';

// 3rd Party imports
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// TS type for page param
export type CWStoreItemDetailParams = {
  store_item_index: string
}

function CWStoreItemDetailComponent() {
  // Grabbing passed in state
  const { store_item_index } = useParams<keyof CWStoreItemDetailParams>() as CWStoreItemDetailParams
  const cwStoreItem = STORE_ITEMS[+store_item_index]


  // NOTE:
  //   The prop "value" is is called VALUE and not SIZE bc of the <Form>'s <option> tag.
  //   Idk why but it seems hard to not use VALUE to read from the form.
  //   Worth revisiting.
  // Stateful variables
  const [value, setValue] = useState(undefined);
  const [ddpInput, setDdpInput] = useState(0);
  const [shouldShowAddDdpToCart, setShouldShowAddDdpToCart] = useState(false);
  const [imageDisplayArray, setImageDisplayArray] = useState([...cwStoreItem.images].reverse())

  // Redux hook
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // NOTE: After a Discussion with William and Russell, it was determined that there is no desire
  //       to gate a purchase by available stock -- supply will be made to meet demand.
  //       Consequently, all logic to ensure availability will be disabled (though left in-tact
  //       for the sake of changing business demands).
  /* const [backendCommodityStates, setBackendCommodityStates] = useState(undefined); */
  // Backend call to check on the quantity of the commodity being observed
  /* useEffect(() => {
   *     console.log("Checking stock of commodities on backend...")

   *     // Grab commodity details from backend
   *     fetch(CW_API_ENDPOINTS.commerce.commodities, {
   *         method: "GET",
   *         headers: {
   *           "Content-Type": "application/json",
   *           "Access-Control-Allow-Origin": "*"
   *         },
   *     })
   *         .then((res) => res.json())
   *         .then((data) => {
   *             console.log(data)
   *             setBackendCommodityStates(data.body.commodityList)
   *         });
   * // NOTE:
   * //   Empty dependency array to prevent re-rendering
   * //   (either react is stupid, or I'm stupid... I'd believe either)
   * }, []);
   *  // Check if product is in stock
   * const productIsInStock = () => {
   *   console.log("hmmm")
   *   // Grab state of the specific commodity we are looking at
   *  const backendCommodityState: any = backendCommodityStates![cwStoreItem.serverName]
   *
   *   // If this is clothing, check the stock of the specific size selected
   *   if (backendCommodityState.commodityType === "clothing") {
   *     return backendCommodityState.quantity[String(value)] > 0
   *   }
   *
   *   // This isn't clothing; simply check the stock of the item
   *   return backendCommodityState.quantity > 0
   * }
   */

  // Action performed when size is selected
  const handleChange = (e: any) => {
      setValue(e.target.value);
  };

  // Constant
  const numImages = cwStoreItem.images.length

  // Display Size toggle if the item is Clothing
  const showSizeForm: boolean = cwStoreItem.type === CWShoppingItemType["Clothing"]
  const sizeForm = (
    showSizeForm ? (
        <p>
            <Form.Select onChange={handleChange} aria-label="Default select example">
                <option >Size</option>
                <option value="xs">extra small</option>
                <option value="s">small</option>
                <option value="m">medium</option>
                <option value="l">large</option>
                <option value="xl">extra large</option>
            </Form.Select>
        </p>
    ) : ( <></>)
  )

  // Make sure AddToCart button does not show up for clothing without a size selected
  const shouldShowAddToCartButton = () => {
    if (cwStoreItem.type === CWShoppingItemType.Clothing) {
      return value ? true : false
    } else {
      return true
    }
  }

  // Add item to Cart
  const addToCartButton = (
    shouldShowAddToCartButton() ? (
      // Removed for now, as ther is no desire to show "Out of Stock"
      true /* backendCommodityStates !== undefined && productIsInStock() */ ? (
        <Button className="cw-product-action-button"
          as="a"
          variant="primary"
          onClick={ () => onClickAddToCart() }>
          Add to Cart
        </Button>
      ) : (
        <Button className="cw-product-out-of-stock"
            size="sm"
            variant="danger">
            OUT OF STOCK
        </Button>
      )
    ) : ( <></> )
  )
  const onClickAddToCart = () => {
    let entry: CWShoppingCartEntry = {
      cwStoreItem: cwStoreItem,
      quantity: 1
    }
    // Add size, if pertinent
    if (showSizeForm) {
      entry.size = value
    }

    dispatch(addToCart(entry))

    navigate('/store', { replace: true })
  }
  // Add x amount of DDP to Cart
  const addXDdp = (
    <input className="cw-ddp-num-input"
      value={ddpInput}
      onChange={ () => setDdpInput( ddpInput + 1 ) }
      type="number"
      id="num_ddp"
      name="num_ddp"
      min="1" />
  )
  useEffect(() => {
    if (ddpInput > 0) {
      setShouldShowAddDdpToCart(true)
    }
  },[ddpInput])
  const onClickAddDdpToCart = () => {
    let entry: CWShoppingCartEntry = {
      cwStoreItem: cwStoreItem,
      quantity: ddpInput as number
    }

    dispatch(addToCart(entry))

    navigate('/store', { replace: true })
  }
  const addDdpToCartButton = (
    <Button className="cw-product-action-button"
      as="a"
      variant="primary"
      onClick={ () => onClickAddDdpToCart() }>
      Add DDP to Cart
    </Button>
  )

  // Display non-highlighted images in a column IF there are more images
  const productImageMultiDesktop = (
    cwStoreItem.images.length > 1 ? (
      <div className="cw-product-multi-pic-col">
      {
        imageDisplayArray.map((itemImage, index)=>{
          return (index + 1) === numImages ? (<div></div>) : (
            <img
              className="cw-product-multi-pic-img"
              src={ process.env.PUBLIC_URL + itemImage }
              alt="This is a very cool item you would love to own"
              onClick={ () => onClickMultiPicImg(index, numImages)}
            />)
        })
      }
      </div>
    ) : ( <></> )
  )
  const productImageMultiMobile = (
    cwStoreItem.images.length > 1 ? (
      <div className="cw-product-multi-pic-col">
      {
        imageDisplayArray.map((itemImage, index)=>{
          return (index + 1) === numImages ? (<div></div>) : (
            <img
              className="cw-product-multi-pic-img"
              src={ process.env.PUBLIC_URL + itemImage }
              alt="This is a very cool item you would love to own"
              onClick={ () => onClickMultiPicImg(index, numImages)}
            />)
        })
      }
      </div>
    ) : ( <></> )
  )

  const buyNowButton = (
    shouldShowAddToCartButton() ? (
      <Button className="cw-product-buy-now"
        as="a"
        variant="primary"
        onClick={ () => onClickBuyNow() }>
        BUY NOW
      </Button>
    ) : ( <></> )
  )
  const onClickBuyNow = () => {
    const entry: CWShoppingCartEntry = {
      cwStoreItem: cwStoreItem,
      quantity: 1
    }
    // Add size, if pertinent
    if (showSizeForm) {
      entry.size = value
    }

    dispatch(addToCart(entry))

    // Go to cart immediately
    navigate('/cart', { replace: true })
  }

  // Rotate highlighted image onClick
  const onClickMultiPicImg = (indexOfImg: number, numImages: number) => {
    // Move clicked image to the end of the array
    let tempArray = [...imageDisplayArray]
    tempArray.push(
      tempArray.splice(indexOfImg, 1)
    )
    setImageDisplayArray(tempArray)
  }

  const productDescription = cwStoreItem.description_paragraphs.map((paragraph) => {
    return (
      <p className="cw-product-description-paragraph">
        {paragraph}
      </p>
    )
  })

  let credits = null
  if (cwStoreItem.credits) {
    credits = cwStoreItem.credits.map((credit) => {
      return (
        <p className="cw-product-description-paragraph">
          <a href={credit.url}>{credit.text}</a>
        </p>
      )
    })
  }

  // Media query
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
      "only screen and (min-width : 769px) and (max-width : 992px)"
  );

  // HTML
  return (
    <div>
      <div className={`cw-product-page-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
          {/* Column of non-highlighted images */}
          { isMediumDevice || isSmallDevice ? <></> : productImageMultiDesktop }

          {/* Column of highlighted image and actions */}
          <div className="cw-product-actions-col">

            {/* Title */}
            <div className="cw-product-title">
              {cwStoreItem.title}
            </div>

            {/* Cost */}
            <div className="cw-product-price">
              ${cwStoreItem.price}
            </div>

            {/* Highlighted image */}
            <img className="cw-product-highlighted-pic-img"
              src={ process.env.PUBLIC_URL + imageDisplayArray[numImages - 1] }
              alt="This is a very cool item you would love to own"
            />

            {/* Column of non-highlighted images */}
            { isMediumDevice || isSmallDevice ? productImageMultiMobile : (<></>) }

            { /* Description */ }
            { productDescription }

            { /* Hyperlink credits, if applicable */ }
            { credits }

            {/* Size selector, if applicable */}
            { sizeForm }

            {/* Actions (button group) */}
            { cwStoreItem.title === "Devotion Point" ? addXDdp : addToCartButton }
            { shouldShowAddDdpToCart ? addDdpToCartButton : (<></>) }
            { cwStoreItem.title === "Devotion Point" ? (<></>) : buyNowButton }

            {/* Back button */}
            <button className="cw-product-action-button"
                    onClick={ () => navigate('/store', { replace: true }) }>
              Back to Store
            </button>
          </div>
      </div>
    </div>
  )
}


export default CWStoreItemDetailComponent
