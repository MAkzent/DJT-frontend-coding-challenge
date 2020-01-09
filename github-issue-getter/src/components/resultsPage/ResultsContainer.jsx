import React, { Component } from "react";
import Issue from "./Issue";
import ResultsNavBar from "./ResultsNavbar";
import IssueFilter from "./IssueFilter";
import "./styles/resultsContainer.scss";
class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIssueType: "All Issues",
      issueTypeSelections: [
        "All Issues",
        "Open Issues",
        "Closed Issues",
        "Pull Requests"
      ],
      currentIssues: "",
      noIssues: false
    };
  }
  componentDidMount() {
    this.showSelectedIssueType("All Issues");
  }
  showSelectedIssueType = selectedType => {
    let selectedTypeIssues;
    //need to refactor this, just trying to get it working
    if (selectedType === "All Issues") {
      selectedTypeIssues = this.props.issues.map((issue, index) => {
        return <Issue issueInfo={issue} key={index} />;
      });
    } else if (selectedType === "Closed Issues") {
      selectedTypeIssues = this.props.issues.map((issue, index) => {
        if (issue.issueState === "closed") {
          return <Issue issueInfo={issue} key={index} />;
        }
        return "Not closed issue";
      });
    } else if (selectedType === "Pull Requests") {
      selectedTypeIssues = this.props.issues.map((issue, index) => {
        if (issue.pullRequest === true) {
          return <Issue issueInfo={issue} key={index} />;
        }
        return "Not pull request";
      });
    } else if (selectedType === "Open Issues") {
      selectedTypeIssues = this.props.issues.map((issue, index) => {
        if (issue.issueState === "open") {
          return <Issue issueInfo={issue} key={index} />;
        }
        return "Not open issue";
      });
    }
    if (selectedTypeIssues.length === 0) {
      console.log(this.state.currentIssues);
      this.setState({ noIssues: true });
    }
    this.setState({ currentIssues: selectedTypeIssues });
  };
  render() {
    let issueViewer;
    if (this.state.noIssues === true) {
      issueViewer = <div>No issues for this repo...</div>;
    } else if (this.state.noIssues === false) {
      issueViewer = (
        <div className="issuesContainer">{this.state.currentIssues}</div>
      );
    }
    return (
      <div className="resultsContainer">
        <nav className="resultsNavbarContainer">
          <ResultsNavBar />
        </nav>
        {
          <div className="issueFilterContainer">
            {this.state.issueTypeSelections.map((issueType, index) => {
              return (
                <IssueFilter
                  key={index}
                  showSelectedIssueType={this.showSelectedIssueType}
                  issueType={issueType}
                />
              );
            })}
          </div>
        }
        {issueViewer}
      </div>
    );
  }
}

export default ResultsContainer;
