import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faMediumM, faGithub, faStrava } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types';

const Social = (props) => (
    <ul className="icons">
        <li><a href="https://www.linkedin.com/in/jeremycwchan/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
        </a></li>
        <li><a href="https://github.com/jeremychan" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
        </a></li>
        <li><a href="https://www.strava.com/athletes/79204665" target="_blank">
            <FontAwesomeIcon icon={faStrava} />
        </a></li>
    </ul>
)

Social.propTypes = {
}

export default Social
