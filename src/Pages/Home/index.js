import React, { Component } from "react";
import "../../Style/css/home.css";
// Importing Logo
import { ReactComponent as Search } from "../../_assets/icons/search.svg"
// Importing Routes
import RouteHandler from "../../Routes";
import Routes from "../../Routes";

class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            inputValue: '',
        }
    }

    InputHandler = (value) => {
        this.setState({
            inputValue: value
        })
    }

    submitHandler = () => {
        this.props.history.push(RouteHandler.IssueExplorer(this.state.inputValue));
    }

    render(){
        return(
            <div id="page">
                <div id="home">
                    <h1 id="title">GitHub Issue Viewer</h1>
                    <form id="searchBar" onSubmit={()=> { this.submitHandler() }}>
                        <div className="searchIcon">
                            <Search className="Icon"/>
                        </div>
                        <input 
                            className="inputField"
                            type="text" 
                            placeholder="Paste a link to a GitHub repo! " 
                            onChange={(e)=>{ this.InputHandler(e.target.value)}}
                            />
                    </form>
                </div>
            </div>
        );
    }
}

export default Index;