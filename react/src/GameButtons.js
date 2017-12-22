import React from 'react';
import Button from './Button';

const GameButtons = (props) =>
  <div style={{ width: '100%' }}>
    <Button className="game-button" label="random" onClick={props.actionRandom} />
    <Button className="game-button" label="reset" onClick={props.actionReset} />
    <Button className="game-button" label="start" onClick={props.actionStart} />
  </div>;

export default GameButtons;
