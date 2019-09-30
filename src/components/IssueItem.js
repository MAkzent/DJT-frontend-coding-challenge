import React from 'react';

const IssueItem = ({ issue }) => {
  const { title, body } = issue;
  return (
    <div className="issueItem">
      <div className="issueItem__top">
        <h2>{ title }</h2>
      </div>
      <div className="issueItem__bottom">
        <p>{ body }</p>
      </div>
    </div>
  )
}

export default IssueItem;