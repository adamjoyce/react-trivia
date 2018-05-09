import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';

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

  async componentDidMount() {
    if (this.props.category) {
      this.setState(() => ({
        category: this.props.category,
        loading: false
      }));
    }
  }

  render() {
    const {category, loading} = this.state;
    const {match} = this.props;
    return (
      !this.props.category
        ? <Redirect to="/" />
        : <div className="categories-container">
            <h3 className="category-title">Select the Number of Questions</h3>
            {loading
              ? <Loading />
              : category
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
