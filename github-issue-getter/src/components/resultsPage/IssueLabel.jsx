import React from "react";
import "./styles/issueLabel.scss";
const IssueLabel = props => {
  return <div className="label">•{props.label.name}</div>;
};

export default IssueLabel;
