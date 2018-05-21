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
      playerQuestions: [],
      answeredQuestions: []
    }
    this.setQuestionCount = this.setQuestionCount.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
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

  setAnswer(player, question, answer) {
    const {playerQuestions, answeredQuestions} = this.state;
    const playerIndex = player - 1;

    if (answeredQuestions.length < playerQuestions.length) {
      // Add an empty questions array to avoid undefined errors.
      answeredQuestions.push([]);
    }

    // Add to player's array of answered questions.
    let answeredQuestion = {question, answer};
    answeredQuestions[playerIndex].push(answeredQuestion);

    // Remove answered question from the player's remaining questions.
    playerQuestions[playerIndex].splice(0, 1);

    console.log('Answered: ', answeredQuestions[playerIndex]);
    console.log('Remaining: ', playerQuestions[playerIndex]);

    this.setState(() => ({
      playerQuestions,
      answeredQuestions
    }));
  }

  render() {
    const {questionCount, playerQuestions} = this.state;
    const playerCount = playerQuestions.length;

    // Determines the current player based on empty question arrays.
    // let currentPlayer = 0;
    // for (let i = 0; i < playerCount; ++i) {
    //   if (playerQuestions[i].length > 0) {
    //     currentPlayer = i + 1;
    //     break;
    //   }
    // }
    //
    // let allAnswered = false;
    // if (playerCount > 0 && currentPlayer === 0) {
    //   // All players have answered their questions.
    //   allAnswered = true;
    // }
    // else {
    //   const currentQuestions = playerQuestions[currentPlayer - 1];
    // }

    return (
      questionCount === null
        ? <QuestionSelection setQuestionCount={this.setQuestionCount} />
        : !allAnswered
            ? playerCount === 0
                ? <Loading />
                : <Question
                     player={currentPlayer}
                     question={currentQuestions[0]}
                     questionIndex={(questionCount - currentQuestions.length) + 1}
                     questionCount={questionCount}
                     setAnswer={this.setAnswer}
                   />
            : <div>All Questions Answered!</div>
    );
  }
}

Questions.propTypes = {
  playerCategories: PropTypes.array.isRequired
}

export default Questions;
