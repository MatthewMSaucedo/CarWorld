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
        <div className="cw-common-background-color">
            <div className="cw-common-page-header">
                { CWCommonNavbarComponent() }
            </div>

            <div className="playlist-title-wrapper">
                <div className="playlist-content-title">
                    The Gatherings of Car World
                </div>
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

            <div className="playlist-title-wrapper">
                <div className="playlist-content-title">
                    Car World Nation
                </div>
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


            <div className="playlist-title-wrapper">
                <div className="playlist-content-title">
                    Sci-Non-Fi Cinematic History
                </div>
            </div>
            <div className="non-carousel-container-left-align">
                    <ReactPlayer
                        width={533.3}
                        height={300}
                        className="pad-left"
                        url='https://www.youtube.com/watch?v=EovGOc-TAxY&feature=youtu.be' />
            </div>

        </div>
    )
}

export default CWVideosComponent

/*
        <div className="cw-common-background-color">
            <div className="cw-common-page-header">
                { CWCommonNavbarComponent() }
            </div>

            <div className="playlist-title-wrapper">
                <div className="playlist-content-title">
                    The Gatherings of Car World
                </div>
            </div>
            <div className="container">
                <Carousel
                        autoPlay={false}
                        navButtonsAlwaysVisible={true}
                        indicators={false}
                        className="playlist-container">
                    <ReactPlayer
                        width={533.3}
                        height={300}
                        url='https://www.youtube.com/watch?v=HUkheNJxcyo' />
                    <ReactPlayer url='https://www.youtube.com/watch?v=z8JxOErTzUc' />
                    <ReactPlayer url='https://www.youtube.com/watch?v=2NGQE-XCJlk' />
                </Carousel>
            </div>

            <div className="playlist-title-wrapper">
                <div className="playlist-content-title">
                    Sci-Non-Fi Cinematic History
                </div>
            </div>
            <div className="container">
                <Carousel
                        navButtonsAlwaysVisible={true}
                        indicators={false}
                        className="playlist-container"
                        autoPlay={false}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=EovGOc-TAxY&feature=youtu.be' />
                </Carousel>
            </div>

            <div className="cw-common-content-container">
                <div className="cw-common-content-title">
                    Car World Nation
                </div>
            </div>
            <div className="container">
                <Carousel
                        navButtonsAlwaysVisible={true}
                        className="playlist-container"
                        indicators={false}
                        autoPlay={false}>
                    <ReactPlayer url='https://www.youtube.com/shorts/ddauzHQedHU' />
                    <ReactPlayer url='https://www.youtube.com/watch?v=5fhQyyE8C5A' />
                    <ReactPlayer url='https://www.youtube.com/watch?v=g1IY-B65Syo' />
                </Carousel>
            </div>
        </div>


 */
