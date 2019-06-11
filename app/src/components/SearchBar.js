import React, {Component} from 'react';
import search from '../icons/search.svg';

class SearchBar extends Component {
  render() {
    return(
      <div>
      <img src={search} className="search-icon" alt="logo" />
      <input className="SearchBar" type="text" placeholder="Paste a link to a Github repo!"></input>
      </div>
    );
  }
}

export default SearchBar
