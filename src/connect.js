import React from 'react';
import RefractionConnector from './RefractionConnector';

export default ({ actions, subscriptions }) => ConnectedComponent => {
  let Component = ConnectedComponent;
  if (!ConnectedComponent.prototype.render) {
    // eslint-disable-next-line
    class RefractionConnectorWrapper extends React.Component {
      render() {
        return <ConnectedComponent {...this.props} />;
      }
    }
    Component = RefractionConnectorWrapper;
  }
  return props => (
    <RefractionConnector
      actions={actions}
      subscriptions={subscriptions}
      Component={Component}
      {...props}
    />
  );
};
