import React from "react";
import "./styles/issueLabel.scss";
const IssueLabel = props => {
  return (
    <div className="label">
      <div className="labelText">•{props.label.name}</div>
    </div>
  );
};

export default IssueLabel;
