import React from 'react';
import PropTypes from 'prop-types';

export default class Provider extends React.Component {

  static propTypes = {
    refraction: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
  }

  static childContextTypes = {
    refraction: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      refraction: this.props.refraction,
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
