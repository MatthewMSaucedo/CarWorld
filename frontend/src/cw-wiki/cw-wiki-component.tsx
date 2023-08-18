import '../App.scss'
import './cw-wiki.scss'

import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'

function CWWikiComponent() {
    return (
        <div>
            { CWCommonNavbarComponent() }
            <div className="cw-wiki-container">
                <div className="cw-wiki-text-block">
                    <p>
                        Car World is a sci-non-fi community building project created to raise global concern for the
                        genocide of <strong>the Attendants</strong>, the native species of <strong>Car World</strong> — a planet in an alternate universe
                        ruled by human-headed Worms sexually obsessed with <strong>William Banks</strong>.
                    </p>
                    <p>
                        William Banks is the self-proclaimed savior of Car World. On October 14th, 2018,
                        he had sex with <strong>Quuarux</strong>, a Worm phased into his car, who was traveling from an
                        alien planet in our universe and passing through <strong>Earth World</strong> to cross the
                        <strong> Bridge to Car World</strong>. He came inside of them.
                    </p>
                    <p>
                        The next day, William started dating the <strong>First Mechanic</strong>, his halfling daughter born of Quuarux
                        whose true identity was still a secret to him at the time. After they broke up, William was
                        abducted and taken to Car World <strong>where he lived for 10 years</strong>. There, he experienced the glory
                        of <strong>Kingmoon</strong>, the treachery of exile, and both <strong>Gas Wars</strong>.
                    </p>
                    <p>
                        Now, William Banks has returned to Earth World with a mission. <strong>The Bridgekeeper</strong> demands he
                        gather <strong>12 Apostles</strong> complete with <strong>Tat Pass</strong> to return to Car World.
                        William must comply if he wishes to lead <strong>the Attendants Revolution</strong> against
                        Quuarux and restore a third <strong>Cartopia</strong>. Including <strong>Director Russell Katz </strong>
                        (Head Propagator & Dramatician of the movement), William has gathered 5 Apostles thus far, with
                        his <strong>Fiancé-Apostle</strong> pledged to receive Tat Pass in the fall.
                    </p>
                </div>

                <div className="cw-wiki-text-block">
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
                        Allie Viti – The Healer<strong>*</strong>
                    </p>
                    <p className="cw-wiki-apostle-note">
                        <strong>*</strong> = Fiancé-Apostle
                    </p>

                </div>
                <div className="cw-wiki-text-block">
                    <p>
                        William Banks is physically cared for by
                            <strong> Guardian Tej Khanna</strong>.
                    </p>
                    <p>
                        William Banks is emotionally cared for by
                            <strong> Actor Caroline Yost</strong>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CWWikiComponent
