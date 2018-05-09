import React from 'react';
import {Redirect, Link} from 'react-router-dom';

import Loading from './Loading';
import {getSessionToken, getQuestions} from '../utils/api';

function Question(props) {
  const {question} = props.question;
  const {match} = props;
  const {categorySlug, questionsCount} = match.params;
  console.log(match);
  const nextQuestion = parseInt(match.params.questionId) + 1;
  return (
    <div>
      <p>{question}</p>
      <Link to={`${categorySlug}/${questionsCount}/${nextQuestion}`}>
        Next Question
      </Link>
    </div>
  );
}

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: '',
      categoryId: null,
      questions: null,
      loading: true
    }
  }

  async componentDidMount() {
    const {category, questions, updateQuestions} = this.props;
    const {questionsCount} = this.props.match.params;
    if (category) {
      const categoryId = category.id;
      const sessionToken = await getSessionToken();

      let questionList;
      if (questions) {
        console.log('Grabbed Questions from Cache');
        questionList = questions;
      }
      else {
        console.log('Question API Call');
        questionList = await getQuestions(
          categoryId, questionsCount, sessionToken
        );
        updateQuestions(questionList);
      }

      this.setState(() => ({
        sessionToken,
        categoryId,
        questions: questionList,
        loading: false
      }));
    }
  }

  render() {
    const {categorySlug, questionsCount, questionId} = this.props.match.params;
    const {sessionToken, categoryId, questions, loading} = this.state;
    return (
      !this.props.category
        ? <Redirect to="/" />
        : loading
          ? <Loading />
          : <Question
              question={questions[questionId - 1]}
              match={this.props.match}
             />
    );
  }
}

export default Questions;
