// Local imports
import '../App.scss';
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component';
import './my-carworld.scss';

function MyCarWorldComponent() {

  const isAuthenticated: boolean = true

  return (
    <div>
      { CWCommonNavbarComponent() }
      <div className="my-carworld-container">
        Nice
      </div>
    </div>
  )
}


export default MyCarWorldComponent
