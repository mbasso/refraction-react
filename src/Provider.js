import React from 'react';

export default class Provider extends React.Component {

  static propTypes = {
    refraction: React.PropTypes.object.isRequired,
    children: React.PropTypes.any.isRequired,
  }

  static childContextTypes = {
    refraction: React.PropTypes.object.isRequired,
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
