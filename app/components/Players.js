import React from 'react';

import Categories from './Categories';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 0
    }
  }

  selectPlayers(playerCount) {
    console.log('PLAYERS SELECTED');
    this.setState(() => ({playerCount}));
  }

  render() {
    const {playerCount} = this.state;
    return(
      !playerCount
        ? <div>
            <h1>How many of you want to play?</h1>
            <button onClick={() => this.selectPlayers(1)}>One Player</button>
            <button onClick={() => this.selectPlayers(2)}>Two Players</button>
            <button onClick={() => this.selectPlayers(3)}>Three Players</button>
            <button onClick={() => this.selectPlayers(4)}>Four Players</button>
          </div>
        : <Categories playerCount={playerCount} />
    );
  }
}

export default Players;
