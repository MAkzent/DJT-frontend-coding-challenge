import React, {Component} from 'react';
import Tag from './Tag.js';

class Card extends Component {
  constructor() {
        super();
        this.state = { term: '' }
    }

  render() {
    return(
      <div className="CardContent">
        <div className="CardHeader">
        <h3 className="TopCardText"> Pull Request </h3>
        </div>
        <div className="CardInfo">
        <p> We need to create a very nice and suitable card</p>
        </div>
        <div className="CardBottom">
        <Tag/>
        </div>


      </div>
    );
  }
}

export default Card
