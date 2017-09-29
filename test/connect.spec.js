import expect from 'expect';
import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { connect } from '../src/';
import { Child, configs } from './common';
import RefractionConnector from '../src/RefractionConnector';

describe('connect', () => {
  it('should connect a component', () => {
    const ConnectedComponent = connect({
      ...configs,
    })(Child);

    const renderer = createRenderer();
    renderer.render(<ConnectedComponent test="It works!" />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(RefractionConnector);
    expect(result.props).toEqual({
      ...configs,
      Component: Child,
      test: 'It works!',
    });
  });

  it('should connect a functional component', () => {
    const component = props => (
      <div>
        <input {...props} />
      </div>
    );
    const ConnectedComponent = connect({
      ...configs,
    })(component);

    const renderer = createRenderer();
    renderer.render(<ConnectedComponent test="It works!" />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(RefractionConnector);
    expect(result.props).toMatch({
      ...configs,
      test: 'It works!',
    });
  });
});
