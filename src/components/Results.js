import React from 'react';
import IssueItem from './IssueItem.js'

const Results = ({ issuesData }) => {
  return (
    <div className="results">
      {issuesData.map((issue, index) => <IssueItem issue={issue} key={index}/>)}
    </div>
  )
}

export default Results;