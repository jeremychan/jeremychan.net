import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faMedium from '@fortawesome/fontawesome-free-brands/faMediumM'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faStrava from '@fortawesome/fontawesome-free-brands/faStrava'
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
