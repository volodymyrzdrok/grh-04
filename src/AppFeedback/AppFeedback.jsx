import React, { useState } from 'react';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Section from './components/Section/Section';
import Notification from './components/Notification/Notification';
import Statistics from './components/Statistics/Statistics';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'hooks/useLocalStorage';

const AppFeedback = () => {
  const initialFeedback = { good: 0, neutral: 0, bad: 0 };
  const [optionsObj, setOptionsObj] = useLocalStorage(
    'feedback',
    initialFeedback
  );
  const resetFeedback = () => {
    setOptionsObj(initialFeedback);
  };
  const changeCounter = e => {
    const { name } = e.target;
    setOptionsObj({ ...optionsObj, [name]: optionsObj[name] + 1 });
  };
  const countTotalFeedback = () => {
    return Object.values(optionsObj).reduce((calc, el) => (calc += el));
  };

  const countPositiveFeedbackPercentage = () => {
    const totalCount = countTotalFeedback();
    const { good } = optionsObj;
    return Math.round((good / totalCount) * 100);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: 20,
        backgroundColor: ' #222',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          style={{
            marginTop: '20px',
          }}
        >
          <Link to="/">Home</Link>
        </button>

        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(optionsObj)}
            onLeaveFeedback={changeCounter}
          />
        </Section>
        <Section>
          <button onClick={resetFeedback}>reset feedback</button>
        </Section>
        {countTotalFeedback() > 0 ? (
          <Section title="Statistics">
            <Statistics
              good={optionsObj.good}
              neutral={optionsObj.neutral}
              bad={optionsObj.bad}
              total={countTotalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    </div>
  );
};

export default AppFeedback;

// export default class AppFeedback extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

// changeCounter = e => {
//   const { name } = e.target;
//   this.setState(prevState => ({ [name]: prevState[name] + 1 }));
// };

// countTotalFeedback = () => {
//   return Object.values(this.state).reduce((calc, el) => (calc += el));
// };
// countPositiveFeedbackPercentage = () => {
//   const totalCount = this.countTotalFeedback();
//   const { good } = this.state;
//   return Math.round((good / totalCount) * 100);
// };

//   render() {
//     const { good, neutral, bad } = this.state;

//     return (
// <div
//   style={{
//     display: 'flex',
//     justifyContent: 'space-around',
//     fontSize: 20,
//     backgroundColor: ' #222',
//     color: '#fff',
//     minHeight: '100vh',
//   }}
// >
//   <div
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//     }}
//   >
//     <button
//       style={{
//         marginTop: '20px',
//       }}
//     >
//       <Link to="/">Home</Link>
//     </button>
//     <Section title="Please leave feedback">
//       <FeedbackOptions
//         options={Object.keys(this.state)}
//         onLeaveFeedback={this.changeCounter}
//       />
//     </Section>
//     {this.countTotalFeedback() > 0 ? (
//       <Section title="Statistics">
//         <Statistics
//           good={good}
//           neutral={neutral}
//           bad={bad}
//           total={this.countTotalFeedback}
//           positivePercentage={this.countPositiveFeedbackPercentage}
//         />
//       </Section>
//     ) : (
//       <Notification message="There is no feedback" />
//     )}
//   </div>
// </div>
//     );
//   }
// }
