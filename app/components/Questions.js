import React from 'react';
import PropTypes from 'prop-types';

import {getPlayerQuestions} from '../utils/api';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: null,
      playerQuestions: []
    }
    this.setQuestionCount = this.setQuestionCount.bind(this);
  }

  async componentDidUpdate(prevProps, prevState) {
    const {playerCategories} = this.props;
    const {questionCount} = this.state;
    if (prevState.questionCount !== questionCount) {
      // Grab all player's questions from the api.
      const playerQuestions = await getPlayerQuestions(
        playerCategories, questionCount
      );
      this.setState(() => ({playerQuestions}));
    }
  }

  setQuestionCount(questionCount) {
    this.setState(() => ({questionCount}));
  }

  render() {
    const {questionCount} = this.state;
    console.log('PlayerQuestions: ', this.state.playerQuestions);
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
