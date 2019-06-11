import React from 'react';
import search from './icons/search.svg';
import './App.css';
import SearchBar from './components/SearchBar.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Github Issue Viewer</h1>
        <SearchBar/>
      </header>
    </div>
  );
}

export default App;
