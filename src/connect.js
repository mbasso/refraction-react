import React from 'react';
import RefractionConnector from './RefractionConnector';

export default ({ actions, subscriptions }) => (Component) => (props) => (
  <RefractionConnector
    actions={actions}
    subscriptions={subscriptions}
    Component={Component}
    {...props}
  />
);
