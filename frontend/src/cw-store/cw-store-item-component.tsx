import '../App.scss'
import './cw-store.scss'
import React, { useState } from "react";
import { CWShoppingItemType, CWStoreItem } from './cw-store-item'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CWShoppingCart } from './cw-shopping-cart';

function CWStoreItemComponent(cwStoreItem: CWStoreItem, cwShoppingCart: CWShoppingCart, setCwShoppingCart: any) {
    const getInitialState = () => {
        const value = "m";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e: any) => {
        setValue(e.target.value);
    };

    const addToCart = (clickEvent: any) => {
        console.log(clickEvent)
        console.log(`size: ${value}`)
        if (cwStoreItem.type === CWShoppingItemType["Clothing"]) {
            console.log("crowes")
            console.log(`cwStoreItem size: ${cwStoreItem.title}`)
            cwShoppingCart.add({cwStoreItem: cwStoreItem, size: value})
        }
        setCwShoppingCart(cwShoppingCart)
        console.log(cwShoppingCart.contents[0]?.size)
        console.log(cwShoppingCart.size)
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

    //  CW-TODO: Add input takers for size, color etc
  return (
    <div className="cw-store-item">
        <img className="item-image" src={process.env.PUBLIC_URL + cwStoreItem.image} />
        <div className="content">
            {cwStoreItem.title}
        </div>
        <div className="content">
            ${cwStoreItem.price}
        </div>
        { sizeForm(cwStoreItem.type === CWShoppingItemType["Clothing"]) }
        <Button as="a" variant="primary" onClick={ (clickEvent) => addToCart(clickEvent) }>
            Add to Cart
        </Button>
    </div>
  )
}

export default CWStoreItemComponent
