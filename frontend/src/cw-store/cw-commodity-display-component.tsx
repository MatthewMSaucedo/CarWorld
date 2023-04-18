import '../App.scss';
import './cw-commodity-display.scss';

import { CWStoreItem } from './cw-store-item';


function CWCommodityDisplayComponent(cwStoreItem: CWStoreItem) {

  return (
    <div className="cw-common-page-container">
        <div className="cw-common-content-container">
          {cwStoreItem.title}
        </div>
    </div>
  );
}

/*
        <img
            className="item-image"
            src={ process.env.PUBLIC_URL + cwStoreItem.images[0] }
            alt="This is a very cool item you would love to own"
        />
*/

export default CWCommodityDisplayComponent
