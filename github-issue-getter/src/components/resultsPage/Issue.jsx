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
        <div className="issueTitle">{this.props.issueInfo.issueTitle}</div>
        <div className="issueBody">{this.props.issueInfo.issueBody}</div>
        <div className="issueLabelsContainer">
          {this.props.issueInfo.issueLabels.map(label => {
            return <IssueLabel label={label} />;
          })}
        </div>
      </div>
    );
  }
}

export default Issue;
