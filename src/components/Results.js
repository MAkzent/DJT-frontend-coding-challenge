import React from 'react';
import IssueItem from './IssueItem.js';
import '../styles/Results.scss';

const Results = ({ issuesData, filter, setFilter }) => {

  return (
    <div className="results">
      <div className="results__filter">
          <button className="results__filterButton" aria-pressed={filter === "all"} onClick={()=>setFilter("all")}>
            All Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "open"} onClick={()=>setFilter("open")} >
            Open Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "closed"} onClick={()=>setFilter("closed")}>
            Closed Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "pull"} onClick={()=>setFilter("pull")}>
            Pull Requests
          </button>
      </div>
      <div className="results__issues">
        {issuesData.map((issue, index) => <IssueItem issue={issue} key={index}/>)}
      </div>
    </div>
  )
}

export default Results;