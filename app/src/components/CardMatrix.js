import React, {Component} from 'react';
import Card from './Card.js';
import SearchBar from './SearchBar.js';

// This

class CardMatrix extends Component {

  render() {
    return(
      <div className="CardMatrix">
        <div className="CardRow1">
          <h1>{SearchBar.props.data} </h1>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className="CardRow2">
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    );
  }
}

export default CardMatrix
