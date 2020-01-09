import React, { Component } from "react";
import axios from "axios";
class IssueSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const splitLink = link.split("/");
    const gitHubUser = splitLink[3];
    const repoName = splitLink[4];
    console.log(gitHubUser);
    axios
      .get(`https://api.github.com/repos/${gitHubUser}/${repoName}/issues`, {
        params: {
          state: "all",
          per_page: 100
        }
      })
      .then(res => {
        res.data.map(issue => {
          const issueInformation = {
            issueTitle: issue.title,
            issueBody: issue.body,
            issueState: issue.state,
            issueLabels: issue.labels,
            issueLink: issue.url
          };

          if (issue.pull_request) {
            issueInformation.pullRequest = true;
          } else {
            issueInformation.pullRequest = false;
          }

          const curGitHubLinks = this.state.gitHubIssues;
          curGitHubLinks.push(issueInformation);
          this.setState({ gitHubIssues: curGitHubLinks });
        });
        console.log(this.state.gitHubIssues);
      })
      .catch(err => {
        console.log(err); //TODO: Show error page
      });
  };

  updateGitHubLink = e => {
    this.setState({ currentGitHubLink: e.target.value });
  };

  render() {
    return (
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
  }
}

export default IssueSearchPage;
