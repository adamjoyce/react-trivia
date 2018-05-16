import React from 'react';
import PropTypes from 'prop-types';
import converter from 'number-to-words';

import Categories from './Categories';

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

        // 'Wordify' the number of players and give it a capital.
        let convertedNumber = converter.toWords(playerNumber);
        convertedNumber = convertedNumber[0].toUpperCase()
          + convertedNumber.substring(1);

        playerButtons.push(
          <button
            key={playerNumber}
            onClick={() => this.selectPlayers(playerNumber)}>
            {/* Deal with singular player instance. */}
            {convertedNumber !== 'One'
              ? `${convertedNumber} Players`
              : `${convertedNumber} Player`}
          </button>
        );
      }
    }

    return(
      !playerCount
        ? <div>
            <h1>How many of you want to play?</h1>
            {playerButtons}
          </div>
        : <Categories playerCount={playerCount} />
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
