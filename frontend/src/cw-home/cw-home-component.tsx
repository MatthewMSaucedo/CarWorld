import '../App.scss';
import { Link } from 'react-router-dom';


function CWHomeComponent() {
  return (
      <div className="cw-common-container">
        <div className="cw-common-navbox">
          <p className="content">
            <b><Link className="cw-common-link" to={`/`}>
               Store
            </Link></b>
          </p>
        </div>
      </div>
  );
}

export default CWHomeComponent
