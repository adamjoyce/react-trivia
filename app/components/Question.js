import React from 'react';
import PropTypes from 'prop-types';

import {decodeHtml} from '../utils/helpers';

const QuestionInformation = (props) => {
  const {player, questionIndex, questionCount} = props;
  return (
    <div>
      <h1>{`Player ${player}`}</h1>
      <h1>{`Question ${questionIndex} of ${questionCount}`}</h1>
    </div>
  );
};

class Question extends React.Component {
  render() {
    const {player, question, questionIndex, questionCount} = this.props;
    console.log(question);
    return (
      <React.Fragment>
        <QuestionInformation
          player={player}
          questionIndex={questionIndex}
          questionCount={questionCount}
        />
        <h1 className="instruction">{decodeHtml(question.question)}</h1>
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  player: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired
}

export default Question;
