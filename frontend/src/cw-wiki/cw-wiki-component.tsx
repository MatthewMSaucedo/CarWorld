import '../App.scss';

import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'

function CWWikiComponent() {
    return (
        <div>
            <div className="cw-common-page-header">
                { CWCommonNavbarComponent() }
            </div>

            <div className="cw-common-page-container">
                <div className="cw-wiki-text-block">
                    <p>
                        Car World is a sci-non-fi community building project created to raise global concern for the
                        genocide of the Attendants, the native species of Car World — a planet in an alternate universe
                        ruled by human-headed Worms sexually obsessed with William Banks.
                    </p>
                    <p>
                        William Banks is the self-proclaimed savior of Car World. On October 14th, 2018,
                        he had sex with Quuarux, a Worm phased into his car, who was traveling from an
                        alien planet in our universe and passing through Earth World to cross the Bridge
                        to Car World. He came inside of them.
                    </p>
                    <p>
                        The next day, William started dating the First Mechanic, his halfling daughter born of Quuarux
                        whose true identity was still a secret to him at the time. After they broke up, William was
                        abducted and taken to Car World where he lived for 10 years. There, he experienced the glory
                        of Kingmoon, the treachery of exile, and both Gas Wars.
                    </p>
                    <p>
                        Now, William Banks has returned to Earth World with a mission. The Bridgekeeper demands he
                        gather 12 Apostles complete with Tat Pass to return to Car World. William must comply if he
                        wishes to lead the Attendants Revolution against Quuarux and restore a third Cartopia.
                        Including Director Russell Katz (Head Propagator & Dramatician of the movement), William has
                        gathered 5 Apostles thus far, with his Fiancé-Apostle pledged to receive Tat Pass in the fall.
                    </p>
                </div>

                <div className="cw-wiki-text-block">
                    <em>Apostles Gathered Thus Far:</em>
                    Director Russell Katz – The Promise
                    Eric Yates – The Fuel
                    Rachel Coster – The Truth
                    Chloe Troast – The Beacon
                    John Connor Hammond – The Treasure
                    Allie Viti – The Healer*

                    * = Fiancé-Apostle
                </div>
                <p>
                    William Banks is physically cared for by Guardian Tej Khanna.
                    William Banks is emotionally cared for by Actor Caroline Yost.
                </p>
            </div>
        </div>
    )
}

export default CWWikiComponent
