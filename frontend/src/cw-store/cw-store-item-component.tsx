import '../App.scss'
import './cw-store.scss'
import { useState } from "react";
import { CWShoppingItemType, CWStoreItem } from './cw-store-item'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CWShoppingCart } from './cw-shopping-cart';

function CWStoreItemComponent(cwStoreItem: CWStoreItem, cwShoppingCart: CWShoppingCart, setCwShoppingCart: any) {
    // stateful variables
    const getInitialState = () => {
        const value = "m";
        return value;
    };
    const [value, setValue] = useState(getInitialState);

    // navigation
    const navigate = useNavigate()

    // TODO: type
    const handleChange = (e: any) => {
        setValue(e.target.value);
    };

    // TODO: type
    const addToCart = (clickEvent: any) => {
        console.log(clickEvent)
        console.log(`size: ${value}`)
        if (cwStoreItem.type === CWShoppingItemType["Clothing"]) {
            cwShoppingCart.add({cwStoreItem: cwStoreItem, size: value})
        }
        setCwShoppingCart(cwShoppingCart)
    }

    const sizeForm = (showSize: boolean) => {
        if (showSize) {
            return (
                <Form.Select onChange={handleChange} aria-label="Default select example">
                    <option >Size</option>
                    <option value="s">small</option>
                    <option value="m">medium</option>
                    <option value="l">large</option>
                </Form.Select>
            )
        }
   }

  return (
    <div
      onClick={ () => navigate('/product', { replace: true, state: cwStoreItem }) }
      className="cw-store-item">
        <img
            className="item-image"
            src={ process.env.PUBLIC_URL + cwStoreItem.image }
            alt="This is a very cool item you would love to own"
        />
        <div className="content">
            {cwStoreItem.title}
        </div>
        <div className="content">
            ${cwStoreItem.price}
        </div>
        { /*sizeForm(cwStoreItem.type === CWShoppingItemType["Clothing"]) */}
        { /* TODO: Add logic to disable if size is still "Size" */ }


        {/* <Button as="a" variant="primary" onClick={ (clickEvent) => addToCart(clickEvent) }>
            Add to Cart
            </Button> */}
    </div>
  )
}

export default CWStoreItemComponent
