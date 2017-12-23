import React from 'react';
import Button from './Button';

const GameButtons = (props) =>
  <div className="Game-buttons">
    <Button className="game-button" label="Random" value="random" onClick={props.changeGameState} />
    <Button className="game-button" label="Start"  value="start"  onClick={props.changeGameState} />
    <Button className="game-button" label="Stop"   value="stop"   onClick={props.changeGameState} />
    <Button className="game-button" label="Reset"  value="reset"  onClick={props.changeGameState} />
  </div>;

export default GameButtons;
