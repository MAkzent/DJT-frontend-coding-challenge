import React, { useEffect} from 'react';
import ReactSVG from 'react-svg';
import CloseIcon from '../assets/icons/close.svg'
import IssueItem from './IssueItem.js';
import '../styles/Results.scss';

const Results = ({ issuesData, filter, setFilter, getMoreIssues, offset, clearData }) => {

  const onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) getMoreIssues();
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll, false);
    return () => window.removeEventListener("scroll", onScroll, false);
  }, [filter, offset]);

  return (  
    <div className="results">
      <button className="results__closeButton" onClick={clearData}><ReactSVG src={CloseIcon} /></button>
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