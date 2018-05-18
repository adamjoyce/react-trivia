import React from 'react';
import PropTypes from 'prop-types';

import {getPlayerQuestions} from '../utils/api';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: null
    }
    this.setQuestionCount = this.setQuestionCount.bind(this);
  }

  setQuestionCount(questionCount) {
    this.setState(() => ({questionCount}));
    getPlayerQuestions(this.props.playerCategories, questionCount);
  }

  render() {
    const {questionCount} = this.state;
    return (
      questionCount === null
        ? <React.Fragment>
            <h1 className="instruction">How many questions will you answer?</h1>
            <button
              className="option-btn"
              onClick={() => this.setQuestionCount(10)}>
              10 Questions
            </button>
            <button
              className="option-btn"
              onClick={() => this.setQuestionCount(25)}>
              25 Questions
            </button>
            <button
              className="option-btn"
              onClick={() => this.setQuestionCount(50)}>
              50 Questions
            </button>
          </React.Fragment>
        : <div>QUESTIONS!</div>
    );
  }
}

Questions.propTypes = {
  playerCategories: PropTypes.array.isRequired
}

export default Questions;
