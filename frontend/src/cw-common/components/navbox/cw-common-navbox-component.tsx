import { Link } from 'react-router-dom';
import './cw-common-navbox-component.scss'

function CWCommonNavboxComponent(props: any) {
  return (
    <div className="cw-common-navbox">
        <p className="content">
        <b><Link className="cw-common-link" to={ props.url }>
            { props.text }
        </Link></b>
        </p>
    </div>
  );
}

export default CWCommonNavboxComponent;
