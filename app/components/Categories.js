import React from 'react';
import PropTypes from 'prop-types';

import CategorySelection from './CategorySelection';
import Questions from './Questions';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCategories: [],
      currentPlayer: 1,
      categoriesPerPlayer: 3,
      categoriesSelected: false
    }
    this.areCategoriesSelected = this.areCategoriesSelected.bind(this);
    this.togglePlayerCategory = this.togglePlayerCategory.bind(this);
  }

  // Determines when all players have selected their categories.
  areCategoriesSelected(currentPlayer) {
    if (currentPlayer === this.props.playerCount) {
      // Ok to continue to next step of app.
      this.setState(() => ({categoriesSelected: true}));
    }
  }

  // Builds player category arrays.
  togglePlayerCategory(playerNumber, category) {
    const {categoriesPerPlayer} = this.state;
    const {playerCategories, currentPlayer} = this.state;
    const playerIndex = playerNumber - 1;

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

      // Flags when all categories have been selected by all players to
      // continue.
      this.areCategoriesSelected(currentPlayer);
    }
  }

  render() {
    const {playerCount} = this.props;
    const {playerCategories,
           currentPlayer,
           categoriesPerPlayer,
           categoriesSelected} = this.state;

    return (
      !categoriesSelected
        ? <CategorySelection
            playerCount={playerCount}
            currentPlayer={currentPlayer}
            categoriesPerPlayer={categoriesPerPlayer}
            toggleCategory={this.togglePlayerCategory}
          />
        : <Questions playerCategories={playerCategories} />
    );
  }
}

Categories.propTypes = {
  playerCount: PropTypes.number.isRequired
}

export default Categories;
