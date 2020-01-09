import React, { Component, Fragment } from "react";
import axios from "axios";
import ResultsContainer from "../resultsPage/ResultsContainer";
class IssueSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
    //https://github.com/forbesd7/guitarPractice

    //split link and get the user/reponame
    const splitLink = link.split("/");
    const gitHubUser = splitLink[3];
    const repoName = splitLink[4];
    console.log(gitHubUser);

    this.changeViewToLoading();
    axios
      .get(`https://api.github.com/repos/${gitHubUser}/${repoName}/issues`, {
        params: {
          state: "all",
          per_page: 100
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
        });
        console.log(this.state.gitHubIssues);
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
        <div>
          <input
            onKeyPress={this.callGitHubIssuesGetter}
            onChange={this.updateGitHubLink}
            type="text"
            placeholder="Paste a link to a GitHub repo!"
            value={this.state.value}
          ></input>
        </div>
      );
    } else if (this.state.isLoading === true) {
      currentView = <div>loading</div>;
    } else {
      currentView = <ResultsContainer issues={this.state.gitHubIssues} />;
    }
    return <Fragment>{currentView}</Fragment>;
  }
}

export default IssueSearchPage;
