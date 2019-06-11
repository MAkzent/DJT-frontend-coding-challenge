import React, {Component} from 'react';
import search from '../icons/search.svg';

class SearchBar extends Component {
  constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
       this.setState({term});
       this.props.onTermChange(term);
   }

  render() {
    return(
      <input className="SearchBar" type="text" placeholder="Paste a link to a Github repo!" onChange={event => this.onInputChange(event.target.value)}></input>
    );
  }
}

export default SearchBar
