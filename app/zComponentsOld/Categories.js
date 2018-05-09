import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Loading from './Loading';
import {getCategories} from '../utils/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      updateCategories: null,
      loading: true
    };
  }

  async componentDidMount() {
    const {categories, updateCategories} = this.props;
    if (categories.length === 0) {
      // Grab the categoires from the api.
      const response = await getCategories();
      updateCategories(response);
      this.setState(() => ({
        categories: response,
        loading: false
      }));
    }
    else {
      // Use the already cached categories.
      this.setState(() => ({
        categories,
        loading: false
      }));
    }
  }

  render() {
    const {loading, categories} = this.state;
    return (
      <div className="categories-container">
        <h3 className="category-title">Select a Category</h3>
        {loading === true
          ? <Loading />
          : <div className="categories">
              {categories.map((category) =>
                <Link
                  to={`/${category.slug}`}
                  key={category.slug}>
                    {category.name}
                </Link>
              )}
            </div>}
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  updateCategories: PropTypes.func.isRequired,
}

export default Categories;
