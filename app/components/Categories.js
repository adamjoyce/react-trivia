import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import Category from './Category';
import {getCategories} from '../utils/api';
import {wordifyNumber} from '../utils/helpers';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      playerCategories: [],
      currentPlayer: 1,
      loading: true
    }
    this.togglePlayerCategory = this.togglePlayerCategory.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();

    this.setState(() => ({
      categories,
      loading: false
    }));
  }

  togglePlayerCategory(playerNumber, category) {
    const {categoriesPerPlayer} = this.props;
    const {playerCategories, currentPlayer} = this.state;
    const playerIndex = playerNumber - 1;

    console.log('PlayerCats: ', categoriesPerPlayer);
    console.log('PlayerIndex: ', playerIndex);

    if (playerCategories.length < playerNumber) {
      // Add an empty player category array to avoid undefined errors.
      playerCategories.push([]);
    }

    // Toggle category.
    const categoryIndex = playerCategories[playerIndex].indexOf(category);
    if (categoryIndex === -1) {
      playerCategories[playerIndex].push(category);
    }
    else {
      playerCategories[playerIndex].splice(categoryIndex, 1);
    }

    this.setState(() => ({playerCategories}));

    // Increment the player when three categories have been picked.
    if (playerCategories[playerIndex].length === categoriesPerPlayer) {
      this.setState(() => ({currentPlayer: currentPlayer + 1}));
    }
  }

  render() {
    const {playerCount, categoriesPerPlayer} = this.props;
    const {categories, playerCategories, currentPlayer, loading} = this.state;
    const wordifiedCategoriesPerPlayer = wordifyNumber(categoriesPerPlayer);
    let categoryPlurality = 'categories'
    if (categoriesPerPlayer === 1) {categoryPlurality = 'category';}
    console.log(playerCategories);

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
                  togglePlayerCategory={this.togglePlayerCategory}
                />)}
            </React.Fragment>
          : <div>Categories Loaded</div>
    );
  }
}

Categories.propTypes = {
  playerCount: PropTypes.number.isRequired,
  categoriesPerPlayer: PropTypes.number.isRequired
}

export default Categories;
