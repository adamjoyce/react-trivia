import React from 'react';
import PropTypes from 'prop-types';

import PlayerSelection from './PlayerSelection';
import Categories from './Categories';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 0
    }
    this.setPlayers = this.setPlayers.bind(this);
  }

  setPlayers(playerCount) {
    this.setState(() => ({playerCount}));
  }

  render() {
    const {maxPlayers} = this.props;
    const {playerCount} = this.state;

    return (
      <React.Fragment>
        <a className="app-title" href="/"><h1>React Trivia</h1></a>
        <div className="question-wrapper">
          {!playerCount
            ? <PlayerSelection
                maxPlayers={maxPlayers}
                setPlayers={this.setPlayers}
              />
            : <Categories playerCount={playerCount} />}
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
