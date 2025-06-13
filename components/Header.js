import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-regular-svg-icons'

const Header = (props) => (
    <header id="header" style={props.timeout ? { display: 'none' } : {}}>
        <div className="logo">

        </div>
        <div className="content">
            <div className="inner">
                <h1>Jeremy Chan</h1>
                <p>Full-Stack Software Engineer in London, specializing in AI integration, Backend Development and DevOps.</p>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); props.onOpenArticle('intro') }}>Intro</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); props.onOpenArticle('contact') }}>Contact</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
