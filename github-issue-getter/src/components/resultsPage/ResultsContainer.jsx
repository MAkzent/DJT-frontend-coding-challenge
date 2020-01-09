import React, { Component } from "react";
import Issue from "./Issue";
import ResultsNavBar from "./ResultsNavbar";
import "./styles/resultsContainer.scss";
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
          {this.props.issues.map(issueInfo => {
            console.log("info", issueInfo);
            return <Issue issueInfo={issueInfo} />;
          })}
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
