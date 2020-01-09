import React, { Component, Fragment } from "react";
import axios from "axios";
import ResultsContainer from "../resultsPage/ResultsContainer";

import "./issueSearchPage.scss";
class IssueSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: "",
      currentGitHubLink: "",
      gitHubIssues: []
    };
  }

  callGitHubIssuesGetter = e => {
    if (e.key === "Enter") {
      let curLink = this.state.currentGitHubLink;

      if (curLink.includes("github.com")) {
        this.GitHubIssuesGetter(curLink);
      } else {
        alert("Please enter a valid GitHub URL.");
      }
    }
  };

  GitHubIssuesGetter = link => {
    //split link and get the user/reponame
    const splitLink = link.split("/");
    const gitHubUser = splitLink[3];
    const repoName = splitLink[4];

    this.changeViewToLoading();
    axios
      .get(`https://api.github.com/repos/${gitHubUser}/${repoName}/issues`, {
        params: {
          state: "all",
          per_page: 20
        }
      })
      .then(res => {
        //filter information for what is needed to show
        res.data.map(issue => {
          const issueInformation = {
            issueTitle: issue.title,
            issueBody: issue.body,
            issueState: issue.state,
            issueLabels: issue.labels,
            issueLink: issue.url
          };
          //set a parameter if it is a pull request
          if (issue.pull_request) {
            issueInformation.pullRequest = true;
          } else {
            issueInformation.pullRequest = false;
          }
          //update state with filtered issue
          const curGitHubLinks = this.state.gitHubIssues;
          curGitHubLinks.push(issueInformation);
          this.setState({ gitHubIssues: curGitHubLinks });
          return "Found Issues";
        });
        this.changeViewToResults();
      })
      .catch(err => {
        console.log(err); //TODO: Show error page
      });
  };

  updateGitHubLink = e => {
    this.setState({ currentGitHubLink: e.target.value });
  };

  changeViewToResults = () => {
    this.setState({ isLoading: false });
  };

  changeViewToLoading = () => {
    this.setState({ isLoading: true });
  };

  render() {
    let currentView;

    if (this.state.isLoading === "") {
      currentView = (
        <div className="searchBarContainer">
          <div id="searchBarLabel">Github Issue Viewer</div>
          <input
            onKeyPress={this.callGitHubIssuesGetter}
            onChange={this.updateGitHubLink}
            type="text"
            placeholder="Paste a link to a GitHub repo!"
            value={this.state.value}
            className="searchBar"
          ></input>
        </div>
      );
    } else if (this.state.isLoading === true) {
      currentView = (
        <div id="loadingImageContainer">
          <img
            alt="Loading..."
            id="loadingImage"
            placeholder="loading..."
            src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
          ></img>
        </div>
      );
    } else {
      currentView = (
        <ResultsContainer
          gitHubLink={this.state.currentGitHubLink}
          issues={this.state.gitHubIssues}
        />
      );
    }
    return <Fragment>{currentView}</Fragment>;
  }
}

export default IssueSearchPage;
