import React from 'react';

class Questions extends React.Component {
  render() {
    const {categorySlug, questionsCount, questionId} = this.props.match.params;
    return (
      <div>
        <p>Category: {categorySlug}</p>
        <p>QuestionCount: {questionsCount}</p>
        <p>QuestionId: {questionId}</p>
      </div>
    );
  }
}

export default Questions;
