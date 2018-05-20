import React from 'react';
import PropTypes from 'prop-types';

import {wordifyNumber} from '../utils/helpers';

class PlayerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerButtons: []
    }
  }

  componentDidMount() {
    const {maxPlayers, setPlayers} = this.props;
    const playerButtons = [];

    // Setup player selection buttons.
    for (let i = 0; i < maxPlayers; i++) {
      const playerNumber = i + 1;
      const wordifiedNumber = wordifyNumber(playerNumber);

      playerButtons.push(
        <button
          key={playerNumber}
          className="option-btn"
          onClick={() => setPlayers(playerNumber)}>
          {/* Deal with singular player instance. */}
          {wordifiedNumber !== 'One'
            ? `${wordifiedNumber} Players`
            : `One Player`}
        </button>
      );
    }

    this.setState(() => ({playerButtons}));
  }

  render() {
    const {playerButtons} = this.state;
    return (
      <React.Fragment>
        <h2 className="instruction">How many of you want to play?</h2>
        {playerButtons}
      </React.Fragment>
    );
  }
}

PlayerSelection.propTypes = {
  maxPlayers: PropTypes.number.isRequired,
  setPlayers: PropTypes.func.isRequired
}

export default PlayerSelection;
