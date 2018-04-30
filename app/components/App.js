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
      categories: []
    };
    this.handleCategories = this.handleCategories.bind(this);
  }

  handleCategories(categories) {
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
                updateCategories={this.handleCategories}
                {...props}
              />
            );
          }.bind(this)} />
          <Route path="/:categoryId" component={Category} />
        </div>
      </Router>
    );
  }
}

module.exports = App;
