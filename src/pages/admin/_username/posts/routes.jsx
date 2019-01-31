import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class AdminUsernamePostsRoutes extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.url}
          render={() => <div>Admin posts</div>}
        />
        <Route
          path={`${this.props.match.url}/create`}
          render={() => <div>Admin create post page</div>}
        />
        <Route
          exact
          path={`${this.props.match.url}/:post_id`}
          render={() => <div>Admin view page</div>}
        />
        <Route
          path={`${this.props.match.url}/:post_id/edit`}
          render={() => <div>Admin edit page</div>}
        />
      </Switch>
    )
  }
}

export default AdminUsernamePostsRoutes
