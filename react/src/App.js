import React, { Component } from 'react';
import './App.css';
import GameHeader from './GameHeader';
import GameArea from './GameArea';
import GameFooter from './GameFooter';
import GameButtons from "./GameButtons";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameHeader />
        <GameArea />
        <GameButtons />
        <GameFooter />
      </div>
    );
  }
}

export default App;
