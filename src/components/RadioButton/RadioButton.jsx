import React, { useState } from 'react';

function RadioButton({ options, name, onChange, header }) {
    const [selectedOption, setSelectedOption] = useState(() => {
        onChange?.(options[0]?.value);
        return options[0]?.value;
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        onChange?.(event.target.value);
    };

    return (
        <ul className='radio-switch form-inputs' name={name}>
            {header && <p className='form-label'>{header}</p>}
            {
                options.map(({ value }, index) => {
                    // console.log("🚀 ~ options.map ~ value:", value, selectedOption, selectedOption === value)
                    return (<li className="radio-switch__item" key={value}>
                        <input
                            className="radio-switch__input ri5-sr-only"
                            type="radio"
                            name="radio-switch-name"
                            id={value}
                            value={value}
                            checked={selectedOption === value}
                            onChange={handleOptionChange} />
                        <label className="radio-switch__label" htmlFor={value}>{value}</label>
                    </li>)
                })
            }
        </ul>
    );
}

export default RadioButton;