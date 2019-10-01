import React from 'react';
import ClampLines from 'react-clamp-lines';
import '../styles/IssueItem.scss';

const IssueItem = ({ issue }) => {
  const { title, body, labels } = issue;
  return (
    <div className="issueItem">
      <div className="issueItem__top">
        <ClampLines text={title} lines={2} ellipsis="..." buttons={false} />
      </div>
      <div className="issueItem__bottom">
        <div className="issueItem__bodyText">
          <p>{ body }</p>
        </div>
        <div className="issueItem__labels">
          { labels.map((label) => <div className="issueItem__label">• { label.name }</div> )}
        </div>
      </div>
    </div>
  );
}

export default IssueItem;