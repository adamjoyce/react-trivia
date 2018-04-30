var React = require('react');

class Category extends React.Component {
  render() {
    var match = this.props.match;
    return (
      <div>
        ID: {match.params.categoryId}
      </div>
    );
  }
}

module.exports = Category;
