import React from 'react';

const Button = (props) =>
  <button className={props.className}
    onClick={props.onClick}
    value={props.value}>{props.label}</button>;

export default Button;
