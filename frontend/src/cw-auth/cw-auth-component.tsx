// Local imports
import '../App.scss';
import './cw-auth.scss';
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'

function MyCarWorldComponent() {

  const isAuthenticated: boolean = true

  return (
        <div className="cw-common-page-container">
          { CWCommonNavbarComponent() }
            <div className="my-carworld-container">
              Hi.
            </div>
        </div>
  );
}


export default MyCarWorldComponent
