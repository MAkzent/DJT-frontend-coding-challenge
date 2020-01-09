import React, { Component } from "react";
import "./styles/issueFilter.scss";
class IssueFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeFilter = () => {
    this.props.showSelectedIssueType(this.props.issueType);
  };
  render() {
    return (
      <div onClick={this.changeFilter} className="issueType">
        {this.props.issueType}
      </div>
    );
  }
}

export default IssueFilter;
