import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppConsumer } from '../../ContextProvider';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AppConsumer>
    {context => (
      <Route
        {...rest}
        render={props =>
          context.state.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    )}
  </AppConsumer>
);

export default PrivateRoute;
