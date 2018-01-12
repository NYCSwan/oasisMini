import React from 'react'; // eslint-disable-line
import { render } from 'react-dom';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

const renderApp = () => {
  render(routes, document.getElementById('app'));
}

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp();
  });
}
