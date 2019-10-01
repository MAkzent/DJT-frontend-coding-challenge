import React from 'react';
import IssueItem from './IssueItem.js';
import '../styles/Results.scss';

const Results = ({ issuesData }) => {
  return (
    <div className="results">
      {issuesData.map((issue, index) => <IssueItem issue={issue} key={index}/>)}
    </div>
  )
}

export default Results;