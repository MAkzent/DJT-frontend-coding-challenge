import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles/Reset.scss';
import './styles/Styles.scss';
import './styles/App.scss';
import Search from './components/Search.js';
import Results from './components/Results.js'
import Header from './components/Header.js';

const App = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [repoLink, setRepoLink] = useState(null);
  const [filter, setFilter] = useState("all");
  const [offset, setOffset] = useState(1);

  const getIssues = async ({link, filter = "all", append = false, offset = 1 }) => {
    if (filter === "pull") {
      const { data } = await axios.get(`https://api.github.com/repos${link.pathname}/issues?page=${offset}`);
      if (append) {
        setIssuesData((prevData) => [...prevData, ...data.filter((issue) => !!issue.pull_request)]);
      } else {
        setOffset(1);
        setIssuesData(data.filter((issue) => !!issue.pull_request))
      }
    } else {
      const { data } = await axios.get(`https://api.github.com/repos${link.pathname}/issues?state=${filter}&page=${offset}`);
      if (append) {
        setIssuesData((prevData => [...prevData, ...data]));
      } else {
        setOffset(1);
        setIssuesData(data);
      }
    }
  }
  const getMoreIssues = () => {
    getIssues({link: repoLink, filter, append: true, offset: offset + 1});
    setOffset((prevOffset) => prevOffset + 1);
  }
  const clearData = () => {
    setOffset(1);
    setRepoLink(null);
    setIssuesData([]);
    setFilter("all");
  }

  useEffect(() => {
    if (!!repoLink) getIssues({link: repoLink, filter});
  }, [repoLink, filter])

  return (
    <div className="app">
      { !!repoLink ?
        <>
        <Header repoLink={repoLink} />
        <Results issuesData={issuesData} filter={filter} setFilter={setFilter} getMoreIssues={getMoreIssues} offset={offset} clearData={clearData} />
        </>
      : 
        <Search setRepoLink={setRepoLink} getIssues={getIssues} />
      }
    </div>
  );

}

export default App;
