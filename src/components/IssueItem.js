import React from 'react';
import ClampLines from 'react-clamp-lines';
import ReactSVG from 'react-svg';
import PullRequestIcon from "../assets/icons/pull-request.svg";
import ClosedIcon from "../assets/icons/issue-closed.svg";
import '../styles/IssueItem.scss';

const IssueItem = ({ issue }) => {
  const { title, body, labels } = issue;
  return (
    <div className="issueItem">
      <div className="issueItem__top">
        <div className="issueItem__icons">
          { !!issue.pull_request && <ReactSVG className="issueItem__icon" src={PullRequestIcon} /> }
          { issue.state === "closed" && <ReactSVG className="issueItem__icon" src={ClosedIcon} /> }
        </div>
        <ClampLines text={title} lines={2} ellipsis="..." buttons={false} />
      </div>
      <div className="issueItem__bottom">
        <div className="issueItem__bodyText">
          { !!body ? <p>{ body }</p> : <p aria-disabled="true">No description provided.</p> }
        </div>
        <div className="issueItem__labels">
          { labels.map((label, index) => 
            <div key={index} className="issueItem__label">
              <svg><circle fill="white" cx="6" cy="6" r="3" /></svg>
              <p>{ label.name }</p>
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueItem;