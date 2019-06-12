import React, {Component} from 'react';
import search from '../icons/search.svg';

class SearchBar extends Component {
  constructor() {
        super();
        this.state = { term: '' }
    }


    onInputChange(term) {
       this.setState({term});
       console.log({term})
   }

     fetchurl(term){
     fetch(term)
     .then(response => response.json())
     .then(data => {
       console.log(data)
     })
     .catch(error => console.error(error))
   }


  render() {
    return(
      <div className="Containter">
      <input className="SearchBar" type="text" placeholder="Paste a link to a Github repo!" onChange={event => this.onInputChange(event.target.value)}></input>
    <button className="Submit" onClick={event => this.fetchurl(this.state.term)}>Search</button>
    </div>
    );
  }
}

//'https://api.github.com'


export default SearchBar
