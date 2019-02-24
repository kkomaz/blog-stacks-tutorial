import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import AdminPostCreate from 'pages/admin/_username/posts/create'
import AdminPosts from 'pages/admin/_username/posts'
import AdminPostView from 'pages/admin/_username/posts/_post_id'
import AdminPostEdit from 'pages/admin/_username/posts/_post_id/edit'

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
          render={() => <AdminPosts />}
        />
        <Route
          path={`${this.props.match.url}/create`}
          render={() => <AdminPostCreate />}
        />
        <Route
          exact
          path={`${this.props.match.url}/:post_id`}
          render={({ match }) => <AdminPostView match={match} />}
        />
        <Route
          path={`${this.props.match.url}/:post_id/edit`}
          render={({ match }) => <AdminPostEdit match={match} />}
        />
      </Switch>
    )
  }
}

export default AdminUsernamePostsRoutes
