import '../App.scss';
import './cw-videos.scss';

import * as AppConstants from '../AppConstants';
import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import CWCommonNavboxComponent from '../cw-common/components/navbox/cw-common-navbox-component'

import Carousel from "react-material-ui-carousel";

import YouTube from 'react-youtube'

import React from 'react'
import ReactPlayer from 'react-player'
import CWFooterComponent from '../cw-common/components/footer/cw-footer-component';
import useMediaQuery from '../cw-common/functions/cw-media-query';
import CWMobileNavbarComponent from '../cw-common/components/navbar/cw-mobile-navbar-component';

function CWVideosComponent() {
    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    return (
        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Video Page  */}
            <div className="cw-video-container">
                {/* Add a yellow banner to mimic navbar for mobile */}
                {isMediumDevice || isSmallDevice ? (
                    <div className="cw-mobile-banner"></div>
                ) : <></>}

                {/* Playlist title and videos  */}
                <div className={`playlist-title-wrapper${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                        The Gatherings of Car World (DOCUMENTARY)
                </div>
                <div className={`non-carousel-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=HUkheNJxcyo' />
                    </div>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=z8JxOErTzUc' />
                    </div>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=2NGQE-XCJlk' />
                    </div>
                </div>

                {/* Playlist title and videos  */}
                <div className={`playlist-title-wrapper${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                        Car World Nation
                </div>
                <div className={`non-carousel-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=5fhQyyE8C5A' />
                    </div>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=g1IY-B65Syo' />
                    </div>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/shorts/ddauzHQedHU' />
                    </div>
                </div>



                {/* Playlist title and videos  */}
                <div className={`playlist-title-wrapper${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                        Sci-Non-Fi Cinematic History
                </div>
                <div className={`non-carousel-container${ isMediumDevice || isSmallDevice ? "-mobile" : ""}`}>
                    <div className="non-carousel-item">
                        <ReactPlayer
                            className="videos-react-player"
                            url='https://www.youtube.com/watch?v=FDZsqouKQ3M&t=1s' />
                    </div>
                </div>
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWVideosComponent
