import React from 'react';
import ReactDOM from 'react-dom';
import search from './icons/search.svg';
import './App.css';
import SearchBar from './components/SearchBar.js'
import Card from './components/Card.js'
import Tag from './components/Tag.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Github Issue Viewer</h1>
        <SearchBar/>
        <Card/>
      </header>
    </div>
  );
}

export default App;
