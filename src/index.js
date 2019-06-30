import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import './styles/index.scss';
import reducers from './reducers';
import SearchPage from './pages/searchPage/searchPage';
import ResultsPage from './pages/resultsPage/resultsPage';

const middlewares = [thunk, promise];

ReactDOM.render(
  <Provider store={applyMiddleware(...middlewares)(createStore)(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/results/:owner/:repo" component={ResultsPage} />
        <Route path="/" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
