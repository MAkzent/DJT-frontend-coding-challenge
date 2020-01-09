import React, { Component, Fragment } from "react";
import "./styles/resultsNavbar.scss";
class ResultsNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="navBarTitle">GitHub Issue Viewer</div>
        <div className="navBarLink">{this.props.gitHubLink}</div>
      </Fragment>
    );
  }
}

export default ResultsNavbar;
