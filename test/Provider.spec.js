import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Refraction from 'refraction';
import { Provider } from '../src/';
import { Child } from './common';

describe('Provider', () => {
  const refraction = new Refraction();

  it('should render a Provider', () => {
    const propTypes = Provider.propTypes;
    Provider.propTypes = {};

    try {
      expect(() => TestUtils.renderIntoDocument(
        <Provider refraction={refraction}>
          <div />
        </Provider>
      )).toNotThrow();

      expect(() => TestUtils.renderIntoDocument(
        <Provider refraction={refraction} />
      )).toNotThrow();

      expect(() => TestUtils.renderIntoDocument(
        <Provider refraction={refraction}>
          <div />
          <div />
        </Provider>
      )).toNotThrow();
    } finally {
      Provider.propTypes = propTypes;
    }
  });

  it('should add refraction to the child context', () => {
    const spy = expect.spyOn(console, 'error');
    const tree = TestUtils.renderIntoDocument(
      <Provider refraction={refraction}>
        <Child />
      </Provider>
    );
    spy.destroy();
    expect(spy.calls.length).toBe(0);

    const child = TestUtils.findRenderedComponentWithType(tree, Child);
    expect(child.context.refraction).toBe(refraction);
  });
});
