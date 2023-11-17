// Local styles
import '../App.scss'
import './cw-wiki.scss'

// Local Imports
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'
import CWFooterComponent from '../cw-common/components/footer/cw-footer-component'
import CWMobileNavbarComponent from '../cw-common/components/navbar/cw-mobile-navbar-component'
import CWMobileBannerComponent from '../cw-common/components/navbar/cw-mobile-banner-component'

// Custom Hook
import useMediaQuery from '../cw-common/functions/cw-media-query' // custom hook

function CWWikiComponent() {
    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Wiki */}
            <div className="cw-wiki-container">
                {/* Add a yellow banner to mimic navbar for mobile */}
                {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

                { /* Wiki content */ }
                <div className="cw-wiki-text-block">
                    <p>
                        Car World is a sci-non-fi community building project created to raise global concern for the
                        genocide of the <strong>Attendants</strong>, the native species of <strong>Car World</strong> — a planet in an alternate universe
                        ruled by human-headed Worms obsessed with <strong>William Banks</strong>.
                    </p>
                    <p>
                        William Banks is the self-proclaimed savior of Car World. On October 14th, 2018,
                        he encountered <strong>Quuarux</strong>, a Worm phased into his car, who was traveling from an
                        alien planet in our universe and passing through <strong>Earth World</strong> to cross the
                        <strong> Bridge to Car World</strong>.
                    </p>
                    <p>
                        The next day, William started dating the <strong>First Mechanic</strong>, his halfling daughter born of Quuarux
                        whose true identity was still a secret to him at the time. After they broke up, William was
                        abducted and taken to Car World where he lived for 10 years. There, he experienced the glory
                        of <strong>Kingmoon</strong>, the treachery of exile, and both <strong>Gas Wars</strong>.
                    </p>
                    <p>
                        Now, William Banks has returned to Earth World with a mission. <strong>The Bridgekeeper</strong> demands he
                        gather <strong>12 Apostles</strong> complete with <strong>Tat Pass</strong> to return to Car World.
                        William must comply if he wishes to lead the <strong>Attendants Revolution</strong> against
                        Quuarux and restore a third <strong>Cartopia</strong>. Including <strong>Director Russell Katz </strong>
                        (Head Propagator & Dramatician of the movement), William has gathered 6 Apostles thus far, with
                        his most recent apostle having received Tat Pass at <strong>Car World Retreat</strong>.
                    </p>
                </div>

                <div className={`cw-wiki-text-block${ isMediumDevice || isSmallDevice ? "-mobile" : "" }`}>
                    <p className="cw-wiki-apostle-block-title">
                        Apostles Gathered Thus Far:
                    </p>
                    <p className="cw-wiki-apostle-name">
                        Director Russell Katz – The Promise
                    </p>
                    <p className="cw-wiki-apostle-name">
                        Eric Yates – The Fuel
                    </p>
                    <p className="cw-wiki-apostle-name">
                        Rachel Coster – The Truth
                    </p>
                    <p className="cw-wiki-apostle-name">
                        Chloe Troast – The Beacon
                    </p>
                    <p className="cw-wiki-apostle-name">
                        John Connor Hammond – The Treasure
                    </p>
                    <p className="cw-wiki-apostle-name">
                        Allie Viti – The Healer
                    </p>
                </div>
                <div className="cw-wiki-text-block">
                    <p>
                        William Banks is physically cared for by
                            Guardian Tej Khanna.
                    </p>
                    <p>
                        William Banks is emotionally cared for by
                            Actor Caroline Yost.
                    </p>
                </div>
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWWikiComponent
