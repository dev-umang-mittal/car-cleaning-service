import { useRef } from "react";
import { invoke, validateSchema } from "../utilities/services";
import RadioButton from "../components/RadioButton/RadioButton";
import Dropdown from "../components/DropDown/DropDown";
import DatePicker from "../components/DatePicker/DatePicker";

function Subscription() {

    const formRef = useRef({});

    function handleSubmit(e) {
        e.preventDefault();
        console.log("🚀 ~ handleSubmit ~ formData:", formRef.current)
        const schema = {
            subscriptionType: {
                required: true,
                validator: (value) => {
                    return true;
                }
            },
            carType: {
                required: true,
            },
            startDate: {
                required: true,
            },
            timeSlot: {
                required: true,
            },
        };

        try{
            validateSchema(schema, formRef.current);
            invoke('schedules', formRef.current).then(result => {
                console.log("🚀 ~ invoke ~ result:", result)
                alert(result.message);
            })
        } catch(e) {
            console.log("🚀 ~ handleSubmit ~ e:", e)
            alert(e?.message);
        }
    }

    function handleChange(key) {
        return (value) => {
            formRef.current[key] = value;
        }
    };

    return (
        <div className="container">
            <div className="header">Create Subscription</div>
            <div className="form-container">
                <RadioButton options={[{ value: 'Daily' }, { value: 'Alternate' }]} name={'subscriptionType'} header={'Subscription Type'}
                    onChange={handleChange('subscriptionType')}
                />
                <DatePicker header={'Select Date'} onChange={handleChange('startDate')} />
                <Dropdown options={[{value:'Sedan'},{value:'SUV'}]} onChange={handleChange('carType')} header={'Car Type'} />
                <Dropdown options={[{value:'6-8 AM'},{value:'8-10 AM'},{value:'10-12 AM'}]} onChange={handleChange('timeSlot')} header={'Time Slot'} />

                <input type="button" className="input-field submit-button" onClick={handleSubmit} value={'Submit'} />
            </div>
        </div>
    )
}

export default Subscription;