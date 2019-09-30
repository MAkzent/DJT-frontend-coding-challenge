import React, { useState } from 'react';

const Search = ({ setRepoLink, getIssues }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (e) => {
    e.preventDefault();
    try {
      const url = new URL(input);
      setRepoLink(url);
      getIssues(url);
    } catch (err) {
      setError("Please enter a valid URL.");
    }
  }

  return (
    <div className="search">
      <h1>Github Issue Viewer</h1>
      <form className="search__form" onSubmit={(e) => validateUrl(e)}>
        <input type="text" className="search__input" value={input} onChange={(e)=>setInput(e.target.value)} />
      </form>
    </div>
  )
}
  

export default Search;