import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Cookies from 'js-cookie';

export function RequireLogin(BaseComponent) {
  class AuthenticatedComponent extends Component<RouteComponentProps<any>, {}> {
    componentWillMount() {
      const { history } = this.props;

      if (!Cookies.get('token')) {
        history.replace({ pathname: '/login' });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        const { history } = nextProps;

        if (!Cookies.get('token')) {
          history.replace({ pathname: '/login' });
        }
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(AuthenticatedComponent);
}

export default RequireLogin;
