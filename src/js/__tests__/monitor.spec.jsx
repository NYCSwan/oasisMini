import React from 'react';
import renderer from 'react-test-renderer';
import Monitor from '../monitor.react';

test('Monitor renders correctly', () => {
  const component = renderer.create(<Monitor />)
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
