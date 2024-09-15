import React, { useState, useRef } from 'react';

function Dropdown({ options, placeholder = "Select One", onChange, header }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState();

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        setSelectedOption(option);
        onChange?.(option);
    };

    return (
        <div className="dropdown form-inputs">
            {header && <p className='form-label'>{header}</p>}
            <div>
            <div className='dropdown-box' onClick={handleButtonClick}>
                <button
                    className="dropdown-button"
                >
                    {selectedOption || placeholder}
                </button>
                {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>}
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map(({ value }) => (
                        <li
                            key={value}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(value)}
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}

export default Dropdown;