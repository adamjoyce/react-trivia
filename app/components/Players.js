import React from 'react';
import PropTypes from 'prop-types';

import Categories from './Categories';
import {wordifyNumber} from '../utils/helpers'

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 0
    }
  }

  selectPlayers(playerCount) {
    console.log(playerCount + ' player(s) selected');
    this.setState(() => ({playerCount}));
  }

  render() {
    const {maxPlayers} = this.props;
    const {playerCount} = this.state;
    const playerButtons= [];

    // Setup the player button options.
    if (!playerCount) {
      for (let i = 0; i < maxPlayers; i++) {
        const playerNumber = i + 1;
        const wordifiedNumber = wordifyNumber(playerNumber);

        playerButtons.push(
          <button
            key={playerNumber}
            className="option-btn"
            onClick={() => this.selectPlayers(playerNumber)}>
            {/* Deal with singular player instance. */}
            {wordifiedNumber !== 'One'
              ? `${wordifiedNumber} Players`
              : `One Player`}
          </button>
        );
      }
    }

    return(
      <React.Fragment>
        <a className="app-title" href="/"><h1>React Trivia</h1></a>
        <div className="question-wrapper">
          {!playerCount
            ? <React.Fragment>
                <h2 className="instruction">How many of you want to play?</h2>
                {playerButtons}
              </React.Fragment>
            : <Categories playerCount={playerCount} categoriesPerPlayer={3} />}
        </div>
      </React.Fragment>
    );
  }
}

Players.propTypes = {
  maxPlayers: PropTypes.number.isRequired
}

Players.defaultProps = {
  maxPlayers: 4
}

export default Players;
