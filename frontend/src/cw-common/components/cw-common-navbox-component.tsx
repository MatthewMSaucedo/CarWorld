import { Link } from 'react-router-dom';
import './cw-common-navbox-component.scss'

function CWCommonNavboxComponent(text: string, url: string) {
  return (
    <div className="cw-common-navbox">
        <p className="content">
        <b><Link className="cw-common-link" to={ url }>
            { text }
        </Link></b>
        </p>
    </div>
  );
}

export default CWCommonNavboxComponent
