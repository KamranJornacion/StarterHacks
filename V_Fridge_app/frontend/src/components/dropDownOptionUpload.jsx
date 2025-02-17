import React, { useState } from 'react';
import './dropDownOptionUpload.css'; // Import the CSS file
import ImageUploader from './imageUploader';

const DropDownOptionUpload = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={togglePopup}>
           {props.text}
            </button>
            {isOpen && (
                <div className="popup-overlay" onClick={togglePopup}>
                    <div className="popup-window" onClick={e => e.stopPropagation()}>
                        <span className="close-button" onClick={togglePopup}>&times;</span>
                        <ImageUploader />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownOptionUpload;
