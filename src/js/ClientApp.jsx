import React from 'react';
import { render } from 'react-dom';
import Header from './Header.react';

const App = (props) => (
    <div className="app">
      <Header title='Oasis Mini Garden' />
    </div>
)

render(<App />, document.getElementById('app'))
