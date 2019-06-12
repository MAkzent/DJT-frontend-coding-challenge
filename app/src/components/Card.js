import React, {Component} from 'react';
import Tag from './Tag.js';

class Card extends Component {
  constructor() {
        super();
        this.state = { name: 'Waiting..',
                       info: '...',
                       tagnum: '...'}
    }

  render() {
    return(
      <div className="CardContent">
        <div className="CardHeader">
        <h3 className="TopCardText"> {this.state.name} </h3>
        </div>
        <div className="CardInfo">
        <p>  {this.state.info}</p>
        </div>
        <div className="CardBottom">
        <Tag/>
        </div>


      </div>
    );
  }
}

export default Card
