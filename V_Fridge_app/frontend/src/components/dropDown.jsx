import React, { useState } from 'react';
import './dropDown.css'; // Import the CSS file
import btn from "../assets/addBTN.jpg"
import DropDownOptionUpload from './dropDownOptionUpload';
import DropDownManualAdd from './manualAdd';

const DropdownMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => {toggleDropdown()}}>
                <img src={btn} alt="Menu" className="menu-icon"  />
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <DropDownOptionUpload text={props.opt1} />
                    <DropDownManualAdd text={props.opt2} />
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
