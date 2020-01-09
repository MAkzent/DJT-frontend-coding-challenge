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
      currentIssues: ""
    };
  }

  showSelectedIssueType = selectedType => {
    let selectedTypeIssues;
    //need to refactor this, just trying to get it working
    if (selectedType === "All Issues") {
      selectedTypeIssues = this.props.issues.map(issue => {
        return <Issue issueInfo={issue} />;
      });
    } else if (selectedType === "Closed Issues") {
      selectedTypeIssues = this.props.issues.map(issue => {
        if (issue.issueState === "closed") {
          return <Issue issueInfo={issue} />;
        }
      });
    } else if (selectedType === "Pull Requests") {
      selectedTypeIssues = this.props.issues.map(issue => {
        if (issue.pullRequest === true) {
          return <Issue issueInfo={issue} />;
        }
      });
    } else if (selectedType === "Open Issues") {
      selectedTypeIssues = this.props.issues.map(issue => {
        if (issue.issueState === "open") {
          return <Issue issueInfo={issue} />;
        }
      });
    }
    this.setState({ currentIssues: selectedTypeIssues });
  };
  render() {
    return (
      <div className="resultsContainer">
        <nav className="resultsNavbarContainer">
          <ResultsNavBar />
        </nav>

        <div className="issueFilterContainer">
          {this.state.issueTypeSelections.map(issueType => {
            return (
              <IssueFilter
                showSelectedIssueType={this.showSelectedIssueType}
                issueType={issueType}
              />
            );
          })}
        </div>
        <div className="issueContainer">{this.state.currentIssues}</div>
      </div>
    );
  }
}

export default ResultsContainer;
