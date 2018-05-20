import React from 'react';
import PropTypes from 'prop-types';

import {decodeHtml} from '../utils/helpers';

class Question extends React.Component {
  render() {
    const {question} = this.props;
    console.log(question);
    return (
      <React.Fragment>
        <h1 className="instruction">{decodeHtml(question.question)}</h1>
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired
}

export default Question;
