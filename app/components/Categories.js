import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import {getCategories} from '../utils/api';
import {wordifyNumber} from '../utils/helpers';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      playerCategories: [],
      loading: true
    }
  }

  addPlayerCategory(playerNumber, categoryName) {
    console.log()
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState(() => ({
      categories,
      loading: false
    }));
  }

  render() {
    console.log(this.state.categories);
    const {playerCount} = this.props;
    const {categories, playerCategories, loading} = this.state;
    const currentPlayer = playerCategories.length + 1;
    return (
      loading
        ? <Loading />
        : <React.Fragment>
            <h1 className="instruction">
              {playerCount > 1
                ? `Player ${wordifyNumber(currentPlayer)},
                   choose three categories:`
                : 'Please choose three categories:'}
            </h1>
            {categories.map((category) =>
              <button
                key={category.id}
                onClick={this.addPlayerCategory(currentPlayer, category.name)}>
                {category.name}
              </button>)}
          </React.Fragment>
    );
  }
}

Categories.propTypes = {
  playerCount: PropTypes.number.isRequired
}

export default Categories;
