// Local Imports
import '../App.scss';
import './cw-commodity-display.scss';
import { CWShoppingItemType, CWStoreItem } from './cw-store-item';
import { CWShoppingCart, CWShoppingCartEntry } from './cw-shopping-cart';
import { STORE_ITEMS } from '../AppConstants'

// React Hooks
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

// 3rd Party imports
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addToCart } from '../redux/shoppingCartSlice';

// TS type for page param
export type CWStoreItemDetailParams = {
  store_item_index: string
}

function CWStoreItemDetailComponent() {
  // Some initial state
  const { cwShoppingCart } = useSelector((state: RootState) => {
    console.log("from useSelector inside CWStoreItemDetailComponent")
    console.log(state.cwShoppingCart.cart)
    return state
  })

  // Grabbing passed in state
  const { store_item_index } = useParams<keyof CWStoreItemDetailParams>() as CWStoreItemDetailParams
  const cwStoreItem = STORE_ITEMS[+store_item_index]

  // Hook
  const dispatch = useDispatch()

  // NOTE:
  //   This is called VALUE and not SIZE bc of the <Form>'s <option> tag.
  //   Idk why but it seems hard to not use VALUE to read form the form.
  //   Worth revisiting.
  // Stateful variables
  const [value, setValue] = useState(undefined);
  const [imageDisplayArray, setImageDisplayArray] = useState([...cwStoreItem.images].reverse())

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
                <option value="s">small</option>
                <option value="m">medium</option>
                <option value="l">large</option>
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
      <Button className="cw-product-action-button"
        as="a"
        variant="primary"
        onClick={ () => onClickAddToCart() }>
        Add to Cart
      </Button>
    ) : ( <></> )
  )
  const onClickAddToCart = () => {
    let entry: CWShoppingCartEntry = {
      cwStoreItem: cwStoreItem
    }
    // Add size, if pertinent
    if (showSizeForm) {
      entry.size = value
    }

    dispatch(addToCart(entry))

    // TODO: change to /store after fixing that page's style
    navigate('/cart', { replace: true })
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
      <Button className="cw-product-action-button"
          as="a"
          variant="primary"
          onClick={ () => onClickBuyNow() }>
        BUY NOW
      </Button>
    ) : ( <></> )
  )
  const onClickBuyNow = () => {
    // TODO:
    //  - add to shoppingcart
    //  - take to purchase page
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
    <div className="cw-product-page-container">

        {/* Column of non-highlighted images */}
        { productImageMulti }

        {/* Column of highlighted image and actions */}
        <div className="cw-product-actions-col">

          {/* Cost */}
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
          { /* TODO: Last priority... buyNowButton */ }

          {/* Back button */}
          <Button className="cw-product-action-button"
                  as="a"
                  variant="primary"
                  onClick={ () => navigate('/', { replace: true }) }>
            Back to Store
          </Button>

        </div>

    </div>
  );
}


export default CWStoreItemDetailComponent
