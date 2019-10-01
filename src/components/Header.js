import React from 'react';
import '../styles/Header.scss'

const Header = ({ repoLink }) => (
  <header>
    <div className="header__container">
      <h1>Github Issue Viewer</h1>
      <h2>{ repoLink.href }</h2>
    </div>
  </header>
)

export default Header;