import React from 'react';

export default class RefractionConnector extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    subscriptions: React.PropTypes.object,
    Component: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.string,
    ]).isRequired,
  };

  static contextTypes = {
    refraction: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    actions: {},
    subscriptions: {},
    Component: 'div',
  };

  constructor(props, context) {
    super(props, context);
    Object.keys(props.subscriptions).forEach(key => {
      this[key] = param => {
        const newProps = props.subscriptions[key](
          param,
          Object.assign({}, this.refs.element.props)
        );
        if (newProps && typeof newProps.then === 'function') {
          newProps.then(this.mergeState);
        } else {
          this.mergeState(newProps);
        }
      };
    });

    this.alias = {};
    Object.keys(props.actions).forEach(key => {
      const { refraction } = this.context;
      if (refraction[props.actions[key]]) {
        this.alias[key] = refraction[props.actions[key]].bind(refraction);
      } else {
        this.alias[key] = refraction.publish.bind(
          refraction,
          props.actions[key]
        );
      }
    });

    this.context.refraction.subscribe(this);
    this.state = {};
  }

  componentWillUnmount() {
    this.context.refraction.unsubscribe(this);
  }

  mergeState = obj => {
    this.setState(Object.assign({}, this.state, obj));
  };

  render() {
    const props = Object.assign({}, this.props);
    delete props.actions;
    delete props.subscriptions;
    const { Component, ...others } = props;
    return (
      <Component {...others} {...this.alias} {...this.state} ref="element" />
    );
  }
}
