import React, { Component } from "react";
import "../../Style/css/issueExplorer.css";
// Issue Explorer Page
import { Link } from "react-router-dom";
// Importing Issue Component
import Issue from "../../Component/Issue";


class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            issues:Issues,
            filteredIssues:[],
            activeFilter:[
                filterOption.All
            ]
        }
    }

    checkIfActive = (value) => {
        return this.state.activeFilter.includes(value) === true ? "active" : ""
    }

    checkFilterOption = (Selection) => {
        if(Selection === filterOption.All){
            // Deselect other 3 options and enable All Issues
            if(this.state.activeFilter.length >= 1){
                let newFilter = [filterOption.All];
                this.setState({ activeFilter: newFilter})
            }
        } else {
            var newFilter;
            // Select or Deselect the selected option
            if(this.state.activeFilter.includes(Selection) === false){

                // Select filter
                this.state.activeFilter[this.state.activeFilter.length] = Selection;
                newFilter = this.state.activeFilter;
                // Remove All Issues from selection Filter
                if(this.state.activeFilter.indexOf(filterOption.All) !== -1)
                    newFilter.splice(this.state.activeFilter.indexOf(filterOption.All), 1);

            } else {
                if(this.state.activeFilter.length > 1){
                    // Deselect filter
                    let index = this.state.activeFilter.indexOf(Selection);
                    this.state.activeFilter.splice(index, 1);
                    newFilter = this.state.activeFilter;
                } else {
                    newFilter = [ filterOption.All ]
                }
            }

            // Apply Filter to the issues
            let filteredIssues = this.state.issues.filter((item => {
                return newFilter.includes(item.state)
            }))
            this.setState({ 
                activeFilter: newFilter,
                filteredIssues:  filteredIssues
            })
        }
    }

    renderIssues = () => {
        if(this.state.issues.length > 0)
            if(this.state.activeFilter == filterOption.All){
                return this.state.issues.map((item,key) => {
                    return <Issue 
                                title={item.title}
                                description={item.description}
                                tags={item.tags}
                                status={item.state}
                            />
                })
            } else {
                // In case filtered has been applied, Show the filtered issues
                return this.state.filteredIssues.map((item,key) => {
                    return <Issue 
                                title={item.title}
                                description={item.description}
                                tags={item.tags}
                                status={item.state}
                            />
                })
            }
    }
    render(){
        return(
            <div id="page">
                <div id="header">
                    <h3 id="logo">GitHub Issue Viewer</h3>
                    <Link to={this.props.match.params.repo} id="repo">{this.props.match.params.repo}</Link>
                </div>
                <div id="list-wrapper">
                    <div id="filter">
                        <ul>
                            <li className={this.checkIfActive(filterOption.All)} onClick={() => {this.checkFilterOption(filterOption.All)}}>All Issues</li>
                            <li className={this.checkIfActive(filterOption.Open)} onClick={() => {this.checkFilterOption(filterOption.Open)}}>Open Issues</li>
                            <li className={this.checkIfActive(filterOption.Closed)} onClick={() => {this.checkFilterOption(filterOption.Closed)}}>Closed Issues</li>
                            <li className={this.checkIfActive(filterOption.PullRequest)} onClick={() => {this.checkFilterOption(filterOption.PullRequest)}}>Pull Requests</li>
                        </ul>
                    </div>
                    <div id="list">
                        { this.renderIssues() }
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;

const IssueState = {
    Open: "Open",
    Closed: "Closed",
    PullRequest: 'PullRequest'
}

const filterOption = {
    All: "All",
    Open: "Open",
    Closed: "Closed",
    PullRequest: "PullRequest",
}

const Issues = [
    {
        title: 'Issue viewer issue number one is right here!',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Priority", "Bug"],
        state: "Open"
    },
    {
        title: 'How About Second Issue',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Low Priority", "Optimization"],
        state: "Open"
    },
    {
        title: 'Third',
        description: '',
        tags: ["Label", "Bug"],
        state: "Closed"
    },
    {
        title: 'This issue is a pull request so make sure the icon is there',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Pull request"],
        state: 'PullRequest'
    },
    {
        title: 'Oh my goodness yet another issue for this ﬁne repo.',
        description: 'This is an extremely long body, but because I don’t want to damage my design, I will make sure it d...',
        tags: ["Priority", "Bug"],
        state: "Open"
    },
    {
        title: 'Issue viewer issue number one is right here!',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Priority", "Bug"],
        state: "Closed"
    },
    {
        title: 'Issue viewer issue number one is right here!',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Priority", "Bug"],
        state: "Closed"
    },
    {
        title: 'Issue viewer issue number one is right here!',
        description: 'Hi there, I noticed you have a problem with the code in this repo. Can you please ﬁx it?',
        tags: ["Priority", "Bug"],
        state: 'PullRequest'
    }
]