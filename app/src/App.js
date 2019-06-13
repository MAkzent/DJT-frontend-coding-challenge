import React from 'react';
import ReactDOM from 'react-dom';
import search from './icons/search.svg';
import './App.css';
import SearchBar from './components/SearchBar.js';


function App() {
  return (
      <header className="App-header">
      <h1 className="MainTitle">Github Issue Viewer</h1>
        <SearchBar/>
      </header>
  );
}


export default App;
