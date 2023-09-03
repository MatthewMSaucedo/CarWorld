import './cw-footer.scss'

// FontAwesome Icons
import {
    faInstagram,
    faYoutube,
    faTiktok,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function CWFooterComponent () {
  return (
    <footer className="cw-footer-container">
      <a href="https://www.instagram.com/carworld.nyc"
        className="social-icon">
          <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://www.youtube.com/channel/UCp07rngbamZL70k0cNVAnQQ"
        className="social-icon">
          <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a href="https://www.tiktok.com/@carworld.nyc"
        className="social-icon">
          <FontAwesomeIcon icon={faTiktok} />
      </a>
      <a href="https://twitter.com/williambanks_?lang=en"
        className="social-icon">
          <FontAwesomeIcon icon={faTwitter} />
      </a>
      {/* <a href="https://github.com/matthewmsaucedo/carworld"
          className="social-icon">
          <FontAwesomeIcon icon={faGithub} />
          </a> */}
    </footer>
  )
}

export default CWFooterComponent
