import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export class Child extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.array,
    ]),
  }

  static defaultProps = {
    value: '',
  }

  static contextTypes = {
    refraction: React.PropTypes.object.isRequired,
  }

  render() {
    const { children, ...others } = this.props;
    return (
      <div>
        <input {...others} />
        {children}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export const configs = {
  actions: {
    onChange: 'onInputChange',
  },
  subscriptions: {
    onInputChange: (value, props) => ({
      value: props.value ? props.value + value : value,
    }),
  },
};
