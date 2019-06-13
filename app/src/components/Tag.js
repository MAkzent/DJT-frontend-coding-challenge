import React, {Component} from 'react';

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
