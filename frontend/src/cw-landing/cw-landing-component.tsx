import '../App.scss';
import './cw-landing.scss';
import { Link } from 'react-router-dom';


function CWLandingComponent() {
  return (
    <div className="cw-landing-container">
      <div className="cw-landing-navbox">
        <p className="content">
          <b><Link className="cw-landing-link" to={`home`}>
             Enter CarWorld
          </Link></b>
        </p>
      </div>
    </div>
  );
}

export default CWLandingComponent
