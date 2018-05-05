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
    };
    this.updateCategories = this.updateCategories.bind(this);
  }

  updateCategories(categories) {
    this.setState(() => categories);
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
            render={(props) => <Questions {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
