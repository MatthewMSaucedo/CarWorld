import '../App.scss';
import './cw-auth.scss';

function CWAuthComponent() {

  const isAuthenticated: boolean = true

  return (
    <div className="cw-common-page-container">
        <div className="cw-common-auth-container">
          { isAuthenticated }
        </div>
    </div>
  );
}


export default CWAuthComponent
