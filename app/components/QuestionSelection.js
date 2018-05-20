import React from 'react';
import PropTypes from 'prop-types';

const QuestionSelectionButton = (props) => {
  const {questionCount, setQuestionCount} = props;
  return (
    <button
      className="option-btn"
      onClick={() => setQuestionCount(questionCount)}>
      {`${questionCount} Questions`}
    </button>
  );
};

QuestionSelectionButton.propTypes = {
  questionCount: PropTypes.number.isRequired,
  setQuestionCount: PropTypes.func.isRequired
}

export default function QuestionSelection(props) {
  const {setQuestionCount} = props;
  const questionCounts = [10, 25, 50];
  console.log();
  return (
    <React.Fragment>
      {questionCounts.map((questionCount) =>
        <QuestionSelectionButton
          key={questionCount}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
        />)}
    </React.Fragment>
  );
}

QuestionSelection.propTypes = {
  setQuestionCount: PropTypes.func.isRequired
}
