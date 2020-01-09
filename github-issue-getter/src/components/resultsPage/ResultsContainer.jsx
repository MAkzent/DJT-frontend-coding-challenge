import React, { Component } from "react";
import Issue from "./Issue";
import ResultsNavBar from "./ResultsNavbar";
import "./styles/ResultsContainer.scss";
class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="resultsContainer">
        <nav className="resultsNavbarContainer">
          <ResultsNavBar />
        </nav>
        <div className="issueContainer">
          <Issue />
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
