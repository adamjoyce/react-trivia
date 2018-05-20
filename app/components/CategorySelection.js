import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import Category from './Category';
import {getCategories} from '../utils/api';
import {wordifyNumber} from '../utils/helpers';

class CategorySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true
    }
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState(() => ({
      categories,
      loading: false
    }));
  }

  render() {
    const {playerCount,
           currentPlayer,
           categoriesPerPlayer,
           toggleCategory} = this.props;
    const {categories, loading} = this.state;
    const wordifiedCategoriesPerPlayer = wordifyNumber(categoriesPerPlayer);
    let categoryPlurality = 'categories'
    if (categoriesPerPlayer === 1) {categoryPlurality = 'category';}

    return (
      loading
        ? <Loading />
        : currentPlayer <= playerCount
          ? <React.Fragment>
              <h1 className="instruction">
                {playerCount > 1
                  ? `Player ${wordifyNumber(currentPlayer)},
                     choose ${wordifiedCategoriesPerPlayer}
                     ${categoryPlurality}:`
                  : `Please choose ${wordifiedCategoriesPerPlayer}
                     ${categoryPlurality}:`}
              </h1>
              {categories.map((category) =>
                <Category
                  key={category.id}
                  category={category}
                  player={currentPlayer}
                  toggleCategory={toggleCategory}
                />)}
            </React.Fragment>
          : null
    );
  }
}

CategorySelection.propTypes = {
  playerCount: PropTypes.number.isRequired,
  currentPlayer: PropTypes.number.isRequired,
  categoriesPerPlayer: PropTypes.number.isRequired,
  toggleCategory: PropTypes.func.isRequired
}

export default CategorySelection;
