function DatePicker({ header, onChange }) {

    function handleChange(e) {
        console.log("🚀 ~ handleChange ~ value:", e.target.value)
        onChange?.(e.target.value);
    }
    return (
        <div className="date-container">
            {header && <p className='form-label'>{header}</p>}
            <input className="date-picker" type="date" onChange={handleChange} />
        </div>);
}

export default DatePicker;