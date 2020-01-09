import React, { Component } from "react";
import "./styles/issue.scss";
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
        <div>labels</div>
      </div>
    );
  }
}

export default Issue;
