import React from 'react';

import './style.css'
import logo from '../../assets/logo.png';

const Header = () => (
    <header className="header">
        <div className="mdl-grid">
            <div className="mdl-cell--12-col">
                <img alt="Logo" src={ logo } className="header__logo" />
            </div>
        </div>
    </header>
);

export default Header;