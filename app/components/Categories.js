import React from 'react';

import Loading from './Loading';
import {getCategories} from '../utils/api';

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
        : <div>
            <h1>
              {playerCount > 1
                ? `Player ${playerCategories.length + 1}, choose three categories:`
                : 'Please choose three categories:'}
            </h1>
            {categories.map((category) =>
              <button
                key={category.id}
                onClick={this.addPlayerCategory(currentPlayer, category.name)}>
                {category.name}
              </button>)}
          </div>
    );
  }
}

export default Categories;
