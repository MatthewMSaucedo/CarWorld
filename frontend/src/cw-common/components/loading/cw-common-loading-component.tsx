import Spinner from 'react-bootstrap/Spinner'
import './cw-common-loading.scss'

function CWCommonLoadingComponent () {
  return (
    <div className="cw-loading-component">
      <Spinner animation="border" role="status" style={{color: "green", width: "10rem", height: "10rem"}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default CWCommonLoadingComponent
