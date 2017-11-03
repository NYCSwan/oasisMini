import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './Homepage.react';
import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/newgrow" component={NewGrow} />
          <Route exact path="/existinggrow" component={ExistingGrow} />

          <Route component={FourOhFour} />
        </Switch>
      </div>
    </BrowserRouter>
);

render(<App />, document.getElementById('app'));
