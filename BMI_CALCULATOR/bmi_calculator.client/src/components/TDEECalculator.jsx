import { useState } from 'react';
import "./Home.css";

const TDEECalculator = () => {

    const initialFormData = {
        gender: 'male',
        age: '',
        weight: '',
        height: '',
        activityLevel: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [tdeeResult, setTDEEResult] = useState(null);
    const [error, setError] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
    };


    const handleCalculate = async (e) => {
        e.preventDefault();
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
                console.log('TDEE Result:', data);
                setFormSubmitted(true);
            } else {
                const errorMessage = await response.text();
                setError(`Error calculating TDEE: ${errorMessage}`);
            }
        } catch (error) {
            setError('Error calculating TDEE. Please try again.');
        }
    };

    const handleGoBack = () => {
        setFormSubmitted(false);
        setFormData(initialFormData);
    };

    return (
        <div className="home--container">
            {!formSubmitted && (
                <form onSubmit={handleCalculate}>
                    <div className="form-container">
                        <label className="genderLabel">Gender</label>
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
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {tdeeResult !== null && formSubmitted && (
                <div className="resultContainer ">
                    <table>
                        <tr>
                            <td colSpan="2">
                                <h2>Maintenance Calories</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>TDEE:</td>
                            <td>{(Math.ceil(tdeeResult).toLocaleString('en-US'))} Calories per Day</td>
                        </tr>
                        <tr>
                            <td>Weekly Calories:</td>
                            <td>{Math.ceil((tdeeResult * 7)).toLocaleString('en-US')} Calories per Week</td>
                        </tr>
                        <tr>
                            <td>Protein:</td>
                            <td>{Math.ceil(((tdeeResult * 0.3) / 4)).toLocaleString('en-US')} grams</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td>{Math.ceil(((tdeeResult * 0.4) / 9)).toLocaleString('en-US')} grams</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td>{Math.ceil(((tdeeResult * 0.3) / 4)).toLocaleString('en-US')} grams</td>
                        </tr>
                    </table>
                    <button className="goBack" onClick={handleGoBack}>Go Back</button>
                </div>
            )}
        </div>
    );
};

export default TDEECalculator;