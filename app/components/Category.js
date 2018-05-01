var React = require('react');
var PropTypes = require('prop-types');

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      loading: true
    }
  }

  componentDidMount() {
    if (!this.props.category) {
      // User didn't come from home page - must recalculate category details
      // using the api and url slug.
    }
    else {
      this.setState(function() {
        return {
          category: this.props.category,
          loading: false
        }
      });
    }
  }

  render() {
    var category = this.state.category;
    return (
      this.state.loading
        ? <div>Loading</div>
        : <div>
          <p>Category: {category.name}</p>
          <p>Slug: {category.slug}</p>
          <p>ID: {category.id}</p>
          </div>
    );
  }
}

Category.proptypes = {
  category: PropTypes.object.isRequired
}

module.exports = Category;
