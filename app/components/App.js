import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Players from './Players';

class App extends React.Component {
  render() {
    return(
      <Players />
    );
  }
}

export default App;
