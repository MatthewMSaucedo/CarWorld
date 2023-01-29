import '../App.scss';
import CWCommonNavboxComponent from '../cw-common/components/navbox/cw-common-navbox-component';


function CWHomeComponent() {
  return (
      <div className="cw-common-page-container">
        <CWCommonNavboxComponent text={'Login/Register'} url={'/'} />
        <CWCommonNavboxComponent text={'Store'} url={'/store'} />
        <CWCommonNavboxComponent text={'Videos'} url={'/'} />
        <CWCommonNavboxComponent text={'Wiki'} url={'/'} />
      </div>
  )
}

export default CWHomeComponent
