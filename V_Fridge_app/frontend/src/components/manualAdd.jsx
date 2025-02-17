import React from "react";
import { useState } from "react";
import "./manualAdd.css"

const DropDownManualAdd = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [word, setWord] = useState('');
    const [number, setNumber] = useState(0);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleWordChange = (e) => {
        setWord(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    }

    const handleSubmit = () => {
        console.log(word);
        console.log(number);
    }

    return (
        <div>
            <button onClick={togglePopup}>
           {props.text}
            </button>
            {isOpen && (
                <div className="popup-overlay" onClick={togglePopup}>
                    <div className="popup-window" onClick={e => e.stopPropagation()}>
                        <span className="close-button" onClick={togglePopup}>&times;</span>
                        <div className="form-container">
                            <h1>Simple Form</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                <input
                                    type="text"
                                    placeholder="Enter a word"
                                    value={word}
                                    onChange={(e) => {handleWordChange}}
                                />
                                </div>
                                <div>
                                <input
                                    type="number"
                                    placeholder="Enter a number"
                                    value={number}
                                    onChange={(e) => {handleNumberChange}}
                                />
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownManualAdd;
