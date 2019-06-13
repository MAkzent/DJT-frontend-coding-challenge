import React, {Component} from 'react';
import Card from './Card.js';

// The searchbar has the both the button and search bar components
// This also contains the individual card components

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { 
      term: '',
      data: [],
      info: [],
      tag: []
    }
  }

  onInputChange(term) {
    this.setState({ term });
   }

  fetchurl(term){
     fetch(term)
     .then(response => response.json())
     .then(data => {
       console.log(data)
       let i = 0;
       for ( i = 0; i < 6; i++ ) {
         this.setState(
           {
              data:[...this.state.data, data[i].title],
              info:[...this.state.info, data[i].body],
              tag: [...this.state.tag, data[i].number]
          }
         )
       }
       console.log(this.state)
     })
     .catch(error => console.error(error))
   }

  shouldRenderCards() {
    return (
      <div className="CardMatrix">
        <div className="CardRow1">
          <button onClick={() => this.setState({ data: [] })}> Back </button>
          <Card data={this.state.data[0]} info={this.state.info[0]} tag={this.state.tag[0]}/>
          <Card data={this.state.data[1]} info={this.state.info[1]} tag={this.state.tag[1]}/>
          <Card data={this.state.data[2]} info={this.state.info[2]} tag={this.state.tag[2]}/>
          <Card data={this.state.data[3]} info={this.state.info[3]} tag={this.state.tag[3]}/>
          <Card data={this.state.data[4]} info={this.state.info[4]} tag={this.state.tag[4]}/>
          <Card data={this.state.data[5]} info={this.state.info[5]} tag={this.state.tag[5]}/>
        </div>
      </div>
    )
  }


  render() {
    return(
      <div className="Containter">
        <input className="SearchBar" type="text" placeholder="Paste a link to a Github repo!" onChange={event => this.onInputChange(event.target.value)}></input>
        <button className="Submit" onClick={event => this.fetchurl(this.state.term)}>Search</button>
        <p className="Example">(Example: https://api.github.com/repos/facebook/react/issues)</p>
        {!!this.state.data.length && this.shouldRenderCards()}
      </div>
    );
  }
}

//https://api.github.com/repos/facebook/react/issues

export default SearchBar
