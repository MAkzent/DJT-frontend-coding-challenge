import React, { useState, useRef, useEffect } from 'react';
import IssueItem from './IssueItem.js';
import '../styles/Results.scss';

const Results = ({ issuesData }) => {
  const [filteredData, setFilteredData] = useState(issuesData);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (filter === "All") setFilteredData(issuesData);
    if (filter === "Open") setFilteredData(issuesData.filter((issue) => issue.state === "open"));
    if (filter === "Closed") setFilteredData(issuesData.filter((issue) => issue.state === "closed"));
    if (filter === "Pull") setFilteredData(issuesData.filter((issue) => !!issue.pull_request));
  }, [filter, issuesData])

  return (
    <div className="results">
      <div className="results__filter">
          <button className="results__filterButton" aria-pressed={filter === "All"} onClick={()=>setFilter("All")}>
            All Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "Open"} onClick={()=>setFilter("Open")} >
            Open Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "Closed"} onClick={()=>setFilter("Closed")}>
            Closed Issues
          </button>
          <button className="results__filterButton" aria-pressed={filter === "Pull"} onClick={()=>setFilter("Pull")}>
            Pull Requests
          </button>
      </div>
      <div className="results__issues">
        {filteredData.map((issue, index) => <IssueItem issue={issue} key={index}/>)}
      </div>
    </div>
  )
}

export default Results;