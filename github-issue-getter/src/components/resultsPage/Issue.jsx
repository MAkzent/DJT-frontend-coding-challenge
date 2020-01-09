import React, { Component } from "react";
import "./styles/issue.scss";
class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="issue">{this.props.issueInfo.issueTitle}</div>;
  }
}

export default Issue;
