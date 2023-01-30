import PropTypes from 'prop-types';

export default function Statistics({ good, neutral, bad, positivePercentage }) {
  return (
    <>
      <p>Good: {good} </p>
      <p>Neutral: {neutral} </p>
      <p>Bad: {bad}</p>
      <p>Positive feedback: {positivePercentage()} %</p>
    </>
  );
}

Statistics.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
  positivePercentage: PropTypes.func,
};
