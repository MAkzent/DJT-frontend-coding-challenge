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
    console.log(offset);
    getIssues({link: repoLink, filter, append: true, offset: offset + 1});
    setOffset((prevOffset) => prevOffset + 1);
  }

  useEffect(() => {
    if (!!repoLink.pathname) getIssues({link: repoLink, filter});
  }, [repoLink, filter])

  return (
    <div className="app">
      { issuesData.length > 0 ?
        <>
        <Header repoLink={repoLink} />
        <Results issuesData={issuesData} filter={filter} setFilter={setFilter} getMoreIssues={getMoreIssues} offset={offset} />
        </>
      : 
        <Search setRepoLink={setRepoLink} getIssues={getIssues} />
      }
    </div>
  );

}

export default App;
