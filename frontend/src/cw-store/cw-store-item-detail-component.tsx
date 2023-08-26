// Local Imports
import '../App.scss';
import './cw-commodity-display.scss';
import { CWShoppingItemType } from './cw-store-item';
import { CWShoppingCart, CWShoppingCartEntry } from './cw-shopping-cart';
import { STORE_ITEMS, CW_API_ENDPOINTS } from '../AppConstants'

// React Hooks
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// 3rd Party imports
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addToCart, updateCart } from '../redux/shoppingCartSlice';
import CWCommonLoadingComponent from '../cw-common/components/loading/cw-common-loading-component';
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component';

// TS type for page param
export type CWStoreItemDetailParams = {
  store_item_index: string
}

function CWStoreItemDetailComponent() {
  // Grabbing passed in state
  const { store_item_index } = useParams<keyof CWStoreItemDetailParams>() as CWStoreItemDetailParams
  const cwStoreItem = STORE_ITEMS[+store_item_index]

  // Hook
  const dispatch = useDispatch()

  // NOTE:
  //   The prop "value" is is called VALUE and not SIZE bc of the <Form>'s <option> tag.
  //   Idk why but it seems hard to not use VALUE to read from the form.
  //   Worth revisiting.
  // Stateful variables
  const [value, setValue] = useState(undefined);
  const [backendCommodityStates, setBackendCommodityStates] = useState(undefined);
  const [imageDisplayArray, setImageDisplayArray] = useState([...cwStoreItem.images].reverse())

  // Backend call to check on the quantity of the commodity being observed
  useEffect(() => {
      console.log("Checking stock of commodities on backend...")

      // Grab commodity details from backend
      fetch(CW_API_ENDPOINTS.commerce.commodities, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data)
              setBackendCommodityStates(data.body.commodityList)
          });
  // NOTE:
  //   Empty dependency array to prevent re-rendering
  //   (either react is stupid, or I'm stupid... I'd believe either)
  }, []);

  // Action performed when size is selected
  const handleChange = (e: any) => {
      setValue(e.target.value);
  };

  // Constant
  const numImages = cwStoreItem.images.length
  const navigate = useNavigate()

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

  // Check if product is in stock
  const productIsInStock = () => {
    console.log("hmmm")
    // Grab state of the specific commodity we are looking at
    const backendCommodityState: any = backendCommodityStates![cwStoreItem.serverName]

    // If this is clothing, check the stock of the specific size selected
    if (backendCommodityState.commodityType === "clothing") {
      return backendCommodityState.quantity[String(value)] > 0
    }

    // This isn't clothing; simply check the stock of the item
    return backendCommodityState.quantity > 0
  }

  // Add item to Cart
  const addToCartButton = (
    shouldShowAddToCartButton() ? (
     backendCommodityStates !== undefined && productIsInStock() ? (
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

  // Display non-highlighted images in a column IF there are more images
  const productImageMulti = (
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
     backendCommodityStates !== undefined && productIsInStock() ? (
        <Button className="cw-product-buy-now"
          as="a"
          variant="primary"
          onClick={ () => onClickBuyNow() }>
          BUY NOW
        </Button>
      ) : ( <></> )
    ) : ( <></> )
  )
  const onClickBuyNow = () => {
    // Create entry
    const entry: CWShoppingCartEntry = {
      cwStoreItem: cwStoreItem,
      quantity: 1
    }
    // Add size, if pertinent
    if (showSizeForm) {
      entry.size = value
    }

    // Set client cart to contain just this entry
    const newCart = new CWShoppingCart()
    newCart.add(entry)
    dispatch(updateCart(newCart))

    // Stripe checkout
    navigate('/checkout', { replace: true })
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

  // HTML
  return (
    // Ternary to show a spinner if the API data is still loading
    // for the commodity states
    backendCommodityStates !== undefined ? (
      <div>

        <div className="cw-product-page-container">

            {/* Column of non-highlighted images */}
            { productImageMulti }

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

              { /* Description */ }
              { productDescription }

              {/* Size selector, if applicable */}
              { sizeForm }

              {/* Actions (button group?) */}
              { addToCartButton }
              { buyNowButton }

              {/* Back button */}
              <Button className="cw-product-action-button"
                      as="a"
                      variant="primary"
                      onClick={ () => navigate('/store', { replace: true }) }>
                Back to Store
              </Button>
            </div>
        </div>
      </div>
    ) : (<CWCommonLoadingComponent />)
  )
}


export default CWStoreItemDetailComponent
