import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Loading from './Loading';
import {getCategories} from '../utils/api';

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
      getCategories().then((response) => {
        const category = response.filter((category) =>
          category.slug === this.props.match.params.categorySlug)[0];

        this.setState(() => ({
          category,
          loading: false
        }));

        console.log(this.state.category);
      });
    }
    else {
      this.setState(() => ({
        category: this.props.category,
        loading: false
      }));
    }
  }

  render() {
    const category = this.state.category;
    const match = this.props.match;
    return (
      <div className="categories-container">
        <h3 className="category-title">Select the Number of Questions</h3>
        {this.state.loading
          ? <Loading />
          : this.state.category
            ? <div className="categories">
                <Link to={`${match.url}/10/1`}>
                  10 Questions
                </Link>
                <Link to={`${match.url}/25/1`}>
                  25 Questions
                </Link>
                <Link to={`${match.url}/50/1`}>
                  50 Questions
                </Link>
              </div>
            : <p>'{match.params.categorySlug}' is not a valid category.</p>}
      </div>
    );
  }
}

Category.proptypes = {
  category: PropTypes.object.isRequired
}

export default Category;
