import '../App.scss'
import './cw-store.scss'
import { useState } from "react";
import { CWShoppingItemType, CWStoreItem } from './cw-store-item'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CWStoreItemComponent(cwStoreItem: CWStoreItem, index: number) {
    // Navigation
    const navigate = useNavigate()

  return (
    <div
        className="cw-store-item"
        onClick={ () =>
            navigate(`/product/${index}`, { replace: true }
        )}
    >
        <img
            className="item-image"
            src={ cwStoreItem.images[0] }
            alt="This is a very cool item you would love to own"
        />
        <div className="content">
            {cwStoreItem.title}
            <br />
            ${cwStoreItem.price}
        </div>
    </div>
  )
}

export default CWStoreItemComponent
