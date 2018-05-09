import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Categories from './Categories';
import Category from './Category';
import Questions from './Questions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      questions: []
    };
    this.updateCategories = this.updateCategories.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  updateCategories(categories) {
    this.setState(() => ({categories}));
  }

  updateQuestions(questions) {
    this.setState(() => ({questions}));
  }

  render() {
    return(
      <Router>
        <div className="container">
          <h1 className="trivia-title">React Trivia</h1>
          <Route exact path="/" render={(props) =>
            <Categories
              categories={this.state.categories}
              updateCategories={this.updateCategories}
              {...props}
            />
          } />
          <Route exact path="/:categorySlug" render={({props, match}) =>
            <Category
              category={this.state.categories.filter((category) =>
                category.slug === match.params.categorySlug)[0]}
              match={match}
              {...props}
            />
          } />
          <Route
            path="/:categorySlug/:questionsCount/:questionId"
            render={({props, match}) =>
              <Questions
                category={this.state.categories.filter((category) =>
                  category.slug === match.params.categorySlug)[0]}
                updateQuestions={this.updateQuestions}
                match={match}
                {...props}
              />
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;
