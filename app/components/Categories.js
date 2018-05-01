var React = require('react');
var PropTypes = require('prop-types');
var ReactRouter = require('react-router-dom');
var Link = ReactRouter.Link;

var api = require('../utils/api');
var slugify = require('slugify');
var sortByProp = require('../utils/helpers').sortByProp;

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      updateCategories: null,
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      // Grab the categoires from the api.
      api.getCategories().then(function(response) {
        for (var i = 0; i < response.length; i++) {
          // Truncate unecessary identifer if present.
          var truncatedName = response[i].name.split(/:\s/, 2)[1];
          if (truncatedName) {
            response[i].name = truncatedName.charAt(0).toUpperCase()
              + truncatedName.slice(1);
          }

          // Give all categories a slug for url identification.
          response[i].slug = slugify(response[i].name, {lower: true});
        }

        // For presentation purposes.
        var categories = sortByProp(response, 'slug');
        console.log(categories);

        // Cache categories in the parent component.
        this.props.updateCategories(response);

        // Update local categories.
        this.setState(function() {
          return {
            categories: response,
            loading: false
          };
        });
      }.bind(this));
    }
    else {
      // Use the already cached categories.
      this.setState(function() {
        return {
          categories: this.props.categories,
          loading: false
        };
      });
    }
  }

  render() {
    return (
      <div className="categories-container">
        <h3 className="category-title">Select a Category</h3>
        {this.state.loading === true
          ? <div>Loading</div>
          : <div className="categories">
              {this.state.categories.map(function(category) {
                return (
                  <Link
                    to={'/' + category.slug}
                    key={category.slug}>
                      {category.name}
                  </Link>
                );
              }.bind(this))}
            </div>}
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  updateCategories: PropTypes.func.isRequired,
}

module.exports = Categories;
