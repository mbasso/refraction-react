import expect from 'expect';
import React from 'react';
import Refraction from 'refraction';
import TestUtils from 'react-addons-test-utils';
import { Provider } from '../src/';
import { Child, configs } from './common';
import RefractionConnector from '../src/RefractionConnector';

describe('RefractionConnector', () => {
  class CustomRefraction extends Refraction {
    onInputChange = (e) => {
      this.publish('onInputChange', e.target.value);
    }
  }
  let refraction = new CustomRefraction();

  const testConnector = (actions, subscriptions) => {
    const rendered = TestUtils.renderIntoDocument(
      <Provider refraction={refraction}>
        <RefractionConnector
          Component={Child}
          test="It works!"
          actions={actions}
          subscriptions={subscriptions}
        />
      </Provider>
    );
    const connector = TestUtils.findRenderedComponentWithType(rendered, RefractionConnector);
    expect(connector.props).toEqual({
      actions,
      subscriptions,
      Component: Child,
      test: 'It works!',
    });
    expect(connector.context.refraction).toBe(refraction);
    expect(connector.state).toEqual({});
    expect(connector.alias.onChange).toExist();
    expect(connector.onInputChange).toExist();
    expect(refraction.mediator.subscribers.indexOf(connector)).toEqual(0);
    const connected = connector.refs.element;
    expect(connected).toExist();
    expect(connected.props).toEqual({
      onChange: connector.alias.onChange,
      test: 'It works!',
      value: '',
    });

    const input = TestUtils.findRenderedDOMComponentWithTag(rendered, 'input');
    TestUtils.Simulate.change(input, { target: { value: 'test1' } });
    expect(connector.state).toEqual({ value: 'test1' });
    expect(connected.props.value).toEqual('test1');
    TestUtils.Simulate.change(input, { target: { value: 'test2' } });
    expect(connector.state).toEqual({ value: 'test1test2' });
    expect(connected.props.value).toEqual('test1test2');

    connector.componentWillUnmount();
    expect(refraction.mediator.subscribers.indexOf(connector)).toEqual(-1);
  };

  afterEach(() => {
    refraction = new CustomRefraction();
  });

  it('should create a connector with publisher', () => {
    testConnector(configs.actions, configs.subscriptions);
  });

  it('should create a connector with new publish function', () => {
    refraction = new Refraction();
    testConnector(configs.actions, {
      onInputChange: (e, props) => ({
        value: e.target.value ? props.value + e.target.value : e.target.value,
      }),
    });
  });
});
