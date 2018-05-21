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

const QuestionButton = (props) => {
  const {player, question, answer, setAnswer} = props;
  return (
    <button
      className="option-btn streamlined"
      onClick={() => setAnswer(player, question, answer)}>
      {answer}
    </button>
  );
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount() {
    const {question} = this.props;
    const answers = this.formatAnswers(question);
    this.setState(() => ({answers}));
  }

  componentDidUpdate(prevProps) {
    const {question} = this.props;
    if (prevProps.question !== question) {
      const answers = this.formatAnswers(question);
      this.setState(() => ({answers}));
    }
  }

  formatAnswers(question) {
    // Grab and sort the potential answers to the question.
    let answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    answers.sort();

    // Decode any HTML codes.
    answers = answers.map((answer) => decodeHtml(answer));

    return answers;
  }

  render() {
    const {player,
           question,
           questionIndex,
           questionCount,
           setAnswer} = this.props;
    const {answers} = this.state;

    return (
      <React.Fragment>
        <QuestionInformation
          player={player}
          questionIndex={questionIndex}
          questionCount={questionCount}
        />
        <h1 className="instruction">{decodeHtml(question.question)}</h1>
        {answers.map((answer) =>
          <QuestionButton
            key={answer}
            player={player}
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />)}
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  player: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  setAnswer: PropTypes.func.isRequired
}

export default Question;
