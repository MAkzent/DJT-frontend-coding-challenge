import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Importing Pages
import Home from './Pages/Home';
import IssueExplorer from "./Pages/IssueExplorer";

class Index extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <BrowserRouter>
                <Route path={`/`} exact component={Home} />
                <Route path={`/repo/:repo/issues`} component={IssueExplorer} />
            </BrowserRouter>
        )
    }
}

export default Index;