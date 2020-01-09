import React, { Component, Fragment } from "react";
import IssueSearchPage from "./components/issueSearchPage/IssueSearchPage";
import "./App.scss";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <IssueSearchPage />
      </Fragment>
    );
  }
}

export default App;
