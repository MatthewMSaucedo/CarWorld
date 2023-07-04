import '../App.scss';
import './cw-videos.scss';

import * as AppConstants from '../AppConstants';
import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import CWCommonNavboxComponent from '../cw-common/components/navbox/cw-common-navbox-component'

import Carousel from "react-material-ui-carousel";

import YouTube from 'react-youtube'

import React from 'react'
import ReactPlayer from 'react-player'

function CWVideosComponent() {

    return (
        <div className="cw-common-page-container">

            {/* Navbar */}
            { CWCommonNavbarComponent() }

            {/* Video Page  */}
            <div className="cw-common-content-container">

                {/* Playlist title and videos  */}
                <div className="playlist-title-wrapper">
                        The Gatherings of Car World
                </div>
                <div className="non-carousel-container">
                        <ReactPlayer
                            width={533.3}
                            height={300}
                            url='https://www.youtube.com/watch?v=HUkheNJxcyo' />
                        <ReactPlayer
                            width={533.3}
                            height={300}
                            url='https://www.youtube.com/watch?v=z8JxOErTzUc' />
                        <ReactPlayer
                            width={533.3}
                            height={300}
                            url='https://www.youtube.com/watch?v=2NGQE-XCJlk' />
                </div>

                {/* Playlist title and videos  */}
                <div className="playlist-title-wrapper">
                        Car World Nation
                </div>
                <div className="non-carousel-container">
                    <ReactPlayer
                        width={533.3}
                        height={300}
                        url='https://www.youtube.com/watch?v=5fhQyyE8C5A' />
                    <ReactPlayer
                        width={533.3}
                        height={300}
                        url='https://www.youtube.com/watch?v=g1IY-B65Syo' />
                    <ReactPlayer
                        width={533.3}
                        height={300}
                        url='https://www.youtube.com/shorts/ddauzHQedHU' />
                </div>


                {/* Playlist title and videos  */}
                <div className="playlist-title-wrapper">
                        Sci-Non-Fi Cinematic History
                </div>
                <div className="non-carousel-container-left-align">
                        <ReactPlayer
                            width={533.3}
                            height={300}
                            url='https://www.youtube.com/watch?v=FDZsqouKQ3M&t=1s' />
                </div>
            </div>
        </div>
    )
}

export default CWVideosComponent
