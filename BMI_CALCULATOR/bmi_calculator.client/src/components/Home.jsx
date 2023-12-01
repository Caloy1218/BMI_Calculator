import "./Home.css"
import React, { useState } from 'react';
function Home() {
    const [gender, setGender] = useState('');
    const [isMetric, setIsMetric] = useState(true);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    

    const handleUnitToggle = () => {
        setIsMetric(!isMetric);
    };
    return (
        <div className="home--container">
            <hi className="title">BMI Calculator</hi>
            <div className="home--genderMetric">
                <div className ="genderContainer">
                    <label>
                        <input type="radio"
                                name="gender"
                                value="female"
                                className="female"
                                checked={gender === 'female'}
                            onChange={handleGenderChange} />
                                
                         Female
                    </label>
                    <label>
                        <input type="radio"
                          name="gender"
                          value="male"
                          className="male"
                          checked={gender === 'male'}
                          onChange={handleGenderChange}
                        />
                        Male
                  </label>
                </div>
                <div className="metricContainer">
                    <label>
                        <button onClick={handleUnitToggle} className="toggle--units">{isMetric ? 'Metric' : 'Imperial'}</button>
                    </label>
                </div>
            </div>
            <div className="home--AgeHW">
                <div className="comp-container">
                    <label>Age: </label>
                    <input type="number" />
                </div>
                <div className="comp-container">
                    <label>Weight ({isMetric ? 'kg' : 'lb'}): </label>
                    <input type="number" />
                </div>
                <div className="comp-container">
                    <label>Height ({isMetric ? 'cm' : `Ft' in`})</label>
                    <input type="number" />
                </div>
                
                
               
                <button className="calculate">Calculate</button>
            </div>
        </div>
    )
}

export default Home;