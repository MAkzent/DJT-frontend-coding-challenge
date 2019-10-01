import React, { useState } from 'react';
import axios from 'axios';

import './styles/Reset.scss';
import './styles/Styles.scss';
import Search from './components/Search.js';
import Results from './components/Results.js'

const App = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [repoLink, setRepoLink] = useState({});

  const getIssues = async (link) => {
    const { data } = await axios.get(`https://api.github.com/repos${link.pathname}/issues`);
    setIssuesData(data);
  }

  return (
    <div className="app">
      { issuesData.length > 0 ?
        <Results issuesData={issuesData} />
      : 
        <Search setRepoLink={setRepoLink} getIssues={getIssues} />
      }
    </div>
  );

}

export default App;
