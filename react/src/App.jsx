import React, { Component } from 'react';
import './App.css';
import GameHeader from './GameHeader';
import GameArea from './GameArea';
import GameFooter from './GameFooter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameHeader />
        <GameArea />
        <GameFooter />
      </div>
    );
  }
}

export default App;
