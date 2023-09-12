// Local imports
import CWCommonNavbarComponent from "../cw-common/components/navbar/cw-common-navbar-component";
import CWMobileBannerComponent from "../cw-common/components/navbar/cw-mobile-banner-component";
import CWMobileNavbarComponent from "../cw-common/components/navbar/cw-mobile-navbar-component";
import * as AppConstants from '../AppConstants';

// Local style
import './cw-nation.scss'

// Custom Hook
import useMediaQuery from "../cw-common/functions/cw-media-query";
import CWFooterComponent from "../cw-common/components/footer/cw-footer-component";

function CWNationComponent() {
    let cwNationColumnOne: AppConstants.CarWorldNationBranch[] = []
    let cwNationColumnTwo: AppConstants.CarWorldNationBranch[] = []
    let cwNationColumnThree: AppConstants.CarWorldNationBranch[] = []

    const regionMapping = [
        "united-states",
        "canada",
        "europe",
        "oceania",
        "asia"
    ]

    AppConstants.CAR_WORLD_NATION_BRANCHES.forEach((carWorldNationBranch: AppConstants.CarWorldNationBranch, index: number) => {
        if (index < 21) {
            cwNationColumnOne = cwNationColumnOne.concat(carWorldNationBranch)
        } else if (index < 41) {
            cwNationColumnTwo = cwNationColumnTwo.concat(carWorldNationBranch)
        } else {
            cwNationColumnThree = cwNationColumnThree.concat(carWorldNationBranch)
        }
    })

    const cwNationColOneHtml = cwNationColumnOne.map((cwNationBranch: AppConstants.CarWorldNationBranch) => {
        const regionStr = regionMapping[cwNationBranch.region]
        return (
            <span className={`cw-nation-branch-${regionStr}`}>
                { cwNationBranch.location.toUpperCase() }
            </span>
        )
    })
    const cwNationColTwoHtml = cwNationColumnTwo.map((cwNationBranch: AppConstants.CarWorldNationBranch) => {
        const regionStr = regionMapping[cwNationBranch.region]
        return (
            <span className={`cw-nation-branch-${regionStr}`}>
                { cwNationBranch.location.toUpperCase() }
            </span>
        )
    })
    const cwNationColThreeHtml = cwNationColumnThree.map((cwNationBranch: AppConstants.CarWorldNationBranch) => {
        const regionStr = regionMapping[cwNationBranch.region]
        return (
            <span className={`cw-nation-branch-${regionStr}`}>
                { cwNationBranch.location.toUpperCase() }
            </span>
        )
    })

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Add a yellow banner to mimic navbar for mobile */}
            {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

            {/* Success Message */}
            <div className={`cw-nation-container${ isSmallDevice || isMediumDevice ? "-mobile" : "" }`}>
                <p className="cw-nation-page-header">
                    Become a Member of Car World Nation
                </p>
                <div className="cw-nation-about-paragraphs">
                    <p className="cw-nation-about-paragraph">
                        Join a community dedicated to helping people. We are a global social movement founded in love and brought together by our shared belief in William Banks' mission to save Car World.
                    </p>
                    <p className="cw-nation-about-paragraph">
                        To be a Member, donate @carworld on venmo and include your city location + phone number in the note.
                    </p>
                    <p className="cw-nation-about-paragraph">
                        You will then be connected to the local communications infrastructure we've established in your area. Donation is required to ensure that every Member of our organization is here under their own free will.
                    </p>
                    <p className="cw-nation-about-paragraph">
                        New Members of Car World Nation will receive feelings of gratitude immediately upon joining.
                    </p>
                </div>
                <div className="cw-nation-branches-header">
                    Established Branches of Car World Nation
                </div>
                <div className="cw-nation-branches">
                    <div className="cw-nation-branch-list-col">
                        { cwNationColOneHtml }
                    </div>
                    <div className="cw-nation-branch-list-col">
                        { cwNationColTwoHtml }
                    </div>
                    <div className="cw-nation-branch-list-col">
                        { cwNationColThreeHtml }
                    </div>
                </div>
                <div className="cw-nation-branch-key">
                    <span className="cw-nation-branch-united-states">United States</span>
                    <span className="cw-nation-branch-canada">Canada</span>
                    <span className="cw-nation-branch-europe">Europe</span>
                    <span className="cw-nation-branch-oceania">Oceania</span>
                    <span className="cw-nation-branch-asia">Asia</span>
                </div>
                <div className="cw-nation-invitation">
                    Don't see your city? Start your own branch of Car World Nation and become the Leader! Recruit more Members and receive rewards.
                </div>
                <div className="cw-nation-disclaimer">
                    <p className="cw-nation-disclaimer-text">
                        ***Car World Nation is a lifelong committment***
                    </p>
                </div>
            </div>
            { CWFooterComponent() }
        </div>
    )

}
export default CWNationComponent
