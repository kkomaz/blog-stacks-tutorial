import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MyContext } from 'components/User/UserProvider'
import { POST_FILENAME } from 'utils/constants'
import { lookupProfile } from 'blockstack'

class UsernamePostsRoute extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const { match } = this.props
    return (
      <Switch>
        <Route
          path={`/${match.params.username}/posts`}
          render={() => <div>Posts Table</div>}
          exact
        />
        <Route
          path={`/${match.params.username}/posts/:post_id`}
          render={() => <div>Post Detail View</div>}
        />
      </Switch>
    )
  }
}

export default UsernamePostsRoute
UsernamePostsRoute.contextType = MyContext
