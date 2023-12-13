
import PropTypes from 'prop-types';

const TDEEResult = ({ result }) => {
    return (
        <div>
            <h2>TDEE Result</h2>
            {result !== undefined && (
                <p>Your calculated TDEE is: {result}</p>
            )}
        </div>
    );
};

TDEEResult.propTypes = {
    result: PropTypes.number,
};

export default TDEEResult;