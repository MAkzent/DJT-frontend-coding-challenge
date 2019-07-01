import React, { Component } from "react";
import "../../Style/css/issue.css";
// Importing SVGS
import { ReactComponent as PullRequestSVG } from "../../_assets/icons/pull-request.svg"
import { ReactComponent as IssueClosedSVG } from "../../_assets/icons/issue-closed.svg"

const IssueState = {
    Open: "Open",
    Closed: "Closed",
    PullRequest: 'PullRequest'
}

class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            title: '',
            description: '',
            tags:["Priority", "Bug"]
        }
    }

    renderTags = () => {
        if(this.props.tags.length > 1) {
            return this.props.tags.map((item,index) => {
                return <li className="tag" key={index}>{item}</li>
            })
        }
    }

    renderDescription = () => {
        if(this.props.description === '')
            return <span>No description provided</span>
        else 
            return this.props.description
    }

    renderIssueType = () => {
        if(this.props.status != IssueState.Open && this.props.state !== '' ){
            console.log("State: ", this.props)
            if(this.props.status === IssueState.PullRequest){
                return  <div className="stateIcon">
                            <PullRequestSVG />
                        </div>
            }
            else{
                return  <div className="stateIcon">
                            <IssueClosedSVG />
                        </div>
            }
        }
    }
    render(){
        return(
            <div className="issue">
                <div className="titleWrapper">
                    {this.props.title}
                    {
                        this.renderIssueType()
                    }
                </div>
                <div className="descriptionWrapper">{ this.renderDescription() }</div>
                <ul className="tagWrapper">
                    {
                        this.renderTags()
                    }
                </ul>
            </div>
        )
    }
}

export default Index;