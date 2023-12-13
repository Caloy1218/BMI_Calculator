import "./Home.css"
import React, { useState} from 'react';
import TDEEResult from "./TDEEResult";
import { Link } from 'react-router-dom';


const TDEECalculator = () => {
    const [formData, setFormData] = useState({
        gender: 'male',
        age: 0,
        weight: 0, 
        height: 0, 
        activityLevel: 0,
    });

    const [tdeeResult, setTDEEResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log( typeof formData.age)
        try {
            const response = await fetch('/TDEE/calculateTDEE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setTDEEResult(data);
                <Link to='/api/TDEE/calculateTDEE' />
            } else {
                const errorMessage = await response.text();
                setError(`Error calculating TDEE: ${errorMessage}`);
            }
        } catch (error) {
            setError('Error calculating TDEE. Please try again.');
        }
    };



    return (
        <div>
            <form onSubmit={handleCalculate}>
                <div className="form-container">
                    <label>Gender</label>
                    <input
                        type="radio"
                        name="gender"
                        id="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                    />
                    Male
                    <input
                        type="radio"
                        name="gender"
                        id="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                    />
                    Female
                </div>
                <div className="form-container">
                    <label>Age</label>
                    <input
                        type="number"
                        name="Age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-container">
                    <label>Weight</label>
                    <input
                        type="number"
                        name="Weight"
                        id="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="kg"
                    />
                </div>
                <div className="form-container">
                    <label>Height</label>
                    <input
                        type="number"
                        name="Height"
                        id="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="cm"
                    />
                </div>
                <div className="form-container">
                    <label>Activity Level</label>
                    <select
                        name="myActivity"
                        id="activityLevel"
                        value={formData.activityLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value=""></option>
                        <option value="1.2">Sedentary(office job)</option>
                        <option value="1.375">Light(1-2 days/week)</option>
                        <option value="1.55">Moderate(3-5 days/week)</option>
                        <option value="1.75">Heavy(6-7 days/week)</option>
                    </select>
                </div>
                <div className="form-container">
                    <input type="submit" value="Calculate" id="submit" />
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {tdeeResult && <TDEEResult result={tdeeResult} />}
        </div>
    )
}

export default TDEECalculator;