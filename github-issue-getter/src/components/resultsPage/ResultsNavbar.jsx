import React, { Component, Fragment } from "react";
import "./styles/ResultsNavbar.scss";
class ResultsNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="navBarTitle">GitHub Issue Viewer</div>
        <div>link</div>
      </Fragment>
    );
  }
}

export default ResultsNavbar;
