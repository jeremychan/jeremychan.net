import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faMedium from '@fortawesome/fontawesome-free-brands/faMedium'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import PropTypes from 'prop-types';

const Social = (props) => (
    <ul className="icons">
        <li><a href="https://www.linkedin.com/in/jeremycwchan/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
        </a></li>
        <li><a href="https://github.com/jeremychan" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
        </a></li>
        <li><a href="https://medium.com/@jeremy_chan" target="_blank">
            <FontAwesomeIcon icon={faMedium} />
        </a></li>
    </ul>
)

Social.propTypes = {
}

export default Social
