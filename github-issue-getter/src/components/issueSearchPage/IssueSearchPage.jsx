import React, { Component } from "react";
import axios from "axios";
class IssueSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGitHubLink: "",
      gitHubIssues: {
        issueTitle: "",
        issueBody: "",
        issueState: "",
        issueLabels: []
      }
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
        console.log(res.data);
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
