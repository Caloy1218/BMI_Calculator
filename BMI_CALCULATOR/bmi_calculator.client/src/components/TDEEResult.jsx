import PropTypes from 'prop-types';

const TDEEResult = ({ result }) => {
    console.log('Result prop:', result);
    return (
        <div>
            <h2>TDEE Result</h2>
            {result !== undefined ? (
                <p>Your calculated TDEE is: {result}</p>
            ) : (
                <p>No result available</p>
            )}
        </div>
    );
};

TDEEResult.propTypes = {
    result: PropTypes.number,
};

export default TDEEResult;