import React, { Component } from "react";
import "./styles/issue.scss";
import IssueLabel from "./IssueLabel";

class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="issueContainer">
        <div className="issueTitle">
          <div className="issueTitleText">
            {this.props.issueInfo.issueTitle}
          </div>
        </div>
        <div className="issueBody">{this.props.issueInfo.issueBody}</div>
        <div className="issueLabelsContainer">
          {this.props.issueInfo.issueLabels.map((label, index) => {
            return <IssueLabel label={label} key={index} />;
          })}
        </div>
      </div>
    );
  }
}

export default Issue;
