import React from 'react';
import { render } from 'react-dom';

const App = (props) => (
    <div className="app">
      <div className="landing">
        <h1>Oasis Mini Homepage</h1>
      </div>
    </div>
)

render(<App />, document.getElementById('app'))
