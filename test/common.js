import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class Child extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    value: '',
  }

  static contextTypes = {
    refraction: PropTypes.object.isRequired,
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
