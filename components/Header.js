import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faGem from '@fortawesome/fontawesome-free-regular/faGem'

const Header = (props) => (
    <header id="header" style={props.timeout ? { display: 'none' } : {}}>
        <div className="logo">
            {/*<span className="icon fa-diamond"></span>*/}
            <FontAwesomeIcon icon={faGem} transform="grow-18" />
        </div>
        <div className="content">
            <div className="inner">
                <h1>Jeremy Chan</h1>
                <p>I'm a Software Engineer and a Technology Enthusiast based in London. <br />
                    Also an aspiring conference speaker and blogger.</p>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="javascript:;" onClick={() => { props.onOpenArticle('intro') }}>Intro</a></li>
                <li><a href="javascript:;" onClick={() => { props.onOpenArticle('about') }}>Blog</a></li>
                <li><a href="javascript:;" onClick={() => { props.onOpenArticle('contact') }}>Contact</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
