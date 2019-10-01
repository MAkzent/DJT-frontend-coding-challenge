import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles/Reset.scss';
import './styles/Styles.scss';
import Search from './components/Search.js';
import Results from './components/Results.js'
import Header from './components/Header.js';

const App = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [repoLink, setRepoLink] = useState({});
  const [filter, setFilter] = useState("all");

  const getIssues = async ({link, filter = "all" }) => {
    if (filter === "pull") {
      const { data } = await axios.get(`https://api.github.com/repos${link.pathname}/issues`);
      setIssuesData(data.filter((issue) => !!issue.pull_request))
    } else {
      const { data } = await axios.get(`https://api.github.com/repos${link.pathname}/issues?state=${filter}`);
      setIssuesData(data);
    }
  }

  useEffect(() => {
    if (!!repoLink.pathname) getIssues({link: repoLink, filter});
  }, [repoLink, filter])

  return (
    <div className="app">
      { issuesData.length > 0 ?
        <>
        <Header repoLink={repoLink} />
        <Results issuesData={issuesData} filter={filter} setFilter={setFilter} />
        </>
      : 
        <Search setRepoLink={setRepoLink} getIssues={getIssues} />
      }
    </div>
  );

}

export default App;
