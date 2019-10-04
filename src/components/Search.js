import React, { useState } from 'react';
import SearchIcon from '../assets/icons/search.svg';
import ReactSVG from 'react-svg';
import '../styles/Search.scss';

const Search = ({ setRepoLink, getIssues }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (e) => {
    e.preventDefault();
    try {
      const url = new URL(input);
      if (!url.hostname.includes("github.com")) return setError("Please enter a url from Github.");
      if ((url.pathname.match(/[/]/g) || []).length < 2) return setError("Please enter a url matching this format: http://www.github.com/$OWNER/$REPO")
      setRepoLink(url);
      getIssues({link: url});      
    } catch (err) {
      setError("Please enter a valid URL.");
    }
  }

  return (
    <div className="search">
      <h1 className="search__title">Github Issue Viewer</h1>
      <form className="search__form" onSubmit={(e) => validateUrl(e)}>
        <ReactSVG className="search__icon" src={SearchIcon} />
        <input type="text" className="search__input" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Paste a link to a Github repo!"/>
        { error && <div className="search__error">{ error }</div>}
      </form>
    </div>
  );
}
  
export default Search;