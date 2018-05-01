var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var Categories = require('./Categories');
var Category = require('./Category');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
    this.updateCategories = this.updateCategories.bind(this);
  }

  updateCategories(categories) {
    this.setState(function() {
      return {
        categories: categories
      }
    });
  }

  render() {
    return(
      <Router>
        <div className="container">
          <h1 className="trivia-title">React Trivia</h1>
          <Route exact path="/" render={function(props) {
            return (
              <Categories
                categories={this.state.categories}
                updateCategories={this.updateCategories}
                {...props}
              />
            );
          }.bind(this)} />
          <Route path="/:categorySlug" render={function({props, match}) {
            return (
              <Category
                category={this.state.categories.filter(function(category) {
                  return category.slug === match.params.categorySlug;
                })[0]}
                {...props}
              />
            );
          }.bind(this)} />
        </div>
      </Router>
    );
  }
}

module.exports = App;
