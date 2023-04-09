import '../App.scss';
import './cw-commodity-display.scss';

import {useLocation} from 'react-router-dom';
import { CWStoreItem } from './cw-store-item';


function CWCommodityDisplayComponent() {
  // grabbing passed in state
  const location = useLocation()
  const cwStoreItem: CWStoreItem = location.state


  return (
    <div className="cw-common-page-container">
        <div className="cw-common-content-container">
          {cwStoreItem.title}
        </div>
    </div>
  );
}

export default CWCommodityDisplayComponent
