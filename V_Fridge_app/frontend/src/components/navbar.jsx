import React from 'react';
import logoPlaceholder from '../assets/image.png';
import './navbar.css';

const NavBar = ({ onNavClick }) => {
  return (
    <nav>
      <img src={logoPlaceholder} id="logo" alt="logo image"></img>
      <ul className="nav-list">
        <li className="nav-item underline" onClick={() => onNavClick('myfridge')}>My Fridge</li>
        <li className="nav-item underline" onClick={() => onNavClick('recipes')}>Recipes</li>
      </ul>
    </nav>
  );
};

export default NavBar;
