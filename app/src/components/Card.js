import React, {Component} from 'react';
import Tag from './Tag.js';

// The Card componts are the cards showcasing the issues

class Card extends Component {

  render() {
    return(
      <div className="CardContent">
        <div className="CardHeader">
          <h3 className="TopCardText"> {this.props.data} </h3>
        </div>
        <div className="CardInfo">
          <p> {this.props.info} </p>
        </div>
        <div className="CardBottom">
          <Tag tag={this.props.tag}/>
        </div>
      </div>
    );
  }
}

export default Card
