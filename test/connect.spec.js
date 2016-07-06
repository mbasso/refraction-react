import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { connect } from '../src/';
import { Child, configs } from './common';
import RefractionConnector from '../src/RefractionConnector';

describe('connect', () => {
  it('should connect a component', () => {
    const ConnectedComponent = connect({
      ...configs,
    })(Child);

    const renderer = TestUtils.createRenderer();
    renderer.render(<ConnectedComponent test="It works!" />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(RefractionConnector);
    expect(result.props).toEqual({
      ...configs,
      Component: Child,
      test: 'It works!',
    });
  });
});
