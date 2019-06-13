import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import CardMatrix from './CardMatrix.js';

class Tag extends Component {
  constructor() {
        super();
        this.state = { term: '' }
    }

  render() {
    return(
      <div className="TagContent">
      <p className="TagInfo">{this.props.tag} </p>
      </div>
    );
  }
}

export default Tag
