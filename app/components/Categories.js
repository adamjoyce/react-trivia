var React = require('react');
var PropTypes = require('prop-types');

var api = require('../utils/api');

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      updateCategories: null
    };
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      // Grab the categoires from the api.
      api.getCategories().then(function(response) {
        var sortedCategories = this.sortSubCategories(response);

        // Cache categories in the parent component.
        this.props.updateCategories(sortedCategories);

        // Update local categories.
        this.setState(function() {
          return {
            categories: sortedCategories
          };
        });
        console.log(sortedCategories);
      }.bind(this));
    }
    else {
      // Use the already cached categories.
      this.setState(function() {
        return {
          categories: this.props.categorites
        };
      });
    }
  }

  // Sorts categories into sub-categories if they are similar.
  sortSubCategories(categories) {
    var newCategories = [];
    var categoryNames = [];
    for (var i = 0; i < categories.length; i++) {
      var name = categories[i].name.split(' ')[0];
      var lastIndex = name.length - 1;
      if (name[lastIndex] === ':') {
        // Truncate the trailing semicolon.
        name = name.substring(0, lastIndex);
      }
      else {
        // Restore the full name.
        // Note: this assumes the trivia api will continue using semicolons
        // for related categories.
        name = categories[i].name;
      }

      if (!categoryNames.includes(name)) {
        var category = {
          name: name,
          data: [categories[i]],
          hasSubCategories: false
        };
        newCategories.push(category);
        categoryNames.push(name);
      }
      else {
        // Add to the existing entry as a sub-category.
        var existingEntry = newCategories.filter(function(entry) {
          return entry.name === name;
        })[0];
        existingEntry.data.push(categories[i]);
        existingEntry.hasSubCategories = true;
      }
    }

    return newCategories;
  }

  render() {
    return (
      <div className="categories-container">
        <h3 className="category-title">Select a Category</h3>
        <div className="categories">
          {this.state.categories.map(function(category) {
            return <button key={category.name}>{category.name}</button>;
          })}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  updateCategories: PropTypes.func.isRequired
}

module.exports = Categories;
