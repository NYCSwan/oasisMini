import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Header from './Header.react';

const App = () => (
    <HashRouter>
        <div className="app">
          <Route path="/" component={Header} />
          <div>New Grow</div>
          <div>Existing Grow</div>
          <div>tutorials</div>
        </div>
    </HashRouter>
)

render(<App />, document.getElementById('app'));
