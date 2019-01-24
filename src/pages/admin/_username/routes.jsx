import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class AdminUsernameRoute extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const { username } = this.props.match.params

    return (
      <Switch>
        <Route
          path={`/admin/${username}`}
          render={() => <div>Hello {username}</div>}
        />
      </Switch>
    )
  }
}

export default AdminUsernameRoute
