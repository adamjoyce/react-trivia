import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import QuestionSelection from './QuestionSelection';
import Question from './Question';
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
    const {questionCount, playerQuestions} = this.state;
    console.log('PlayerQuestions: ', this.state.playerQuestions);
    return (
      questionCount === null
        ? <QuestionSelection setQuestionCount= {this.setQuestionCount} />
        : playerQuestions.length === 0
            ? <Loading />
            : // Example for visual testing.
              <Question
                player={1}
                question={playerQuestions[0][0]}
                questionIndex={0}
                questionCount={playerQuestions[0].length}
              />
    );
  }
}

Questions.propTypes = {
  playerCategories: PropTypes.array.isRequired
}

export default Questions;
