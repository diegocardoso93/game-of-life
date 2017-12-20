import React from 'react';
import GameOfLife from './GameOfLife';

const GameArea = () =>
  <section className="Game-container">
    <GameOfLife size={20} />
  </section>;

export default GameArea;
