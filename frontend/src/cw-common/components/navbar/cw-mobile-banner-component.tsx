// React Hooks
import { useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

// Icon
import { IconContext } from "react-icons";
import { MdShoppingCart } from "react-icons/md";

function CWMobileBannerComponent() {
    // Redux State
    let { cwShoppingCart } = useSelector((state: RootState) => state)

    // Navigation
    const navigate = useNavigate()
    const onClickCart = () => {
        navigate("/cart", { replace: true })
    }

    return (
        <div className="cw-mobile-banner">

            {/* Only Show cart in the navbar if it is populated */}
            { cwShoppingCart.size > 0 ? (
                <div
                    className="cw-mobile-banner-cart"
                    onClick={() => onClickCart()}>
                    <IconContext.Provider value={{ className: "shopping-cart-img"}}>
                        <MdShoppingCart />
                    </IconContext.Provider>
                </div>
                ) : <></> }
        </div>
    )
}

export default CWMobileBannerComponent
