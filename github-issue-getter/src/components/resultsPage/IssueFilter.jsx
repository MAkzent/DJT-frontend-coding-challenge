import React, { Component } from "react";
import "./styles/issueFilter.scss";
class IssueFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeColor = e => {
    this.props.showSelectedIssueType(this.props.issueType);
  };
  render() {
    return (
      <div onClick={this.changeColor} className="issueType">
        {this.props.issueType}
      </div>
    );
  }
}

export default IssueFilter;
