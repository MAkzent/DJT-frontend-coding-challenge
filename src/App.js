import React from 'react';
import useIssues from './hooks/useIssues.js'

import './styles/Reset.scss';
import './styles/Styles.scss';
import './styles/App.scss';
import Search from './components/Search.js';
import Results from './components/Results.js'
import Header from './components/Header.js';

const App = () => {
  const { 
    repoLink, setRepoLink, 
    issuesData, getIssues, getMoreIssues, clearData,
    filter, setFilter, 
    offset
  } = useIssues();

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
