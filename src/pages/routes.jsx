import React, { Component } from 'react'
import _ from 'lodash'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserProvider from 'components/User/UserProvider'
import Loader from 'components/Loader'
import AdminUsernameRoute from 'pages/admin/_username/routes'
import UsernamePostsRoute from 'pages/_username/routes'

class Routes extends Component {
  state = { user: {} }

  componentDidMount() {
    const { userSession } = this.props

    const user = userSession.loadUserData()

    this.setState({ user })
  }

  render() {
    const { user } = this.state
    const { userSession } = this.props

    if (_.isEmpty(user)) {
      return <Loader />
    }

    return (
      <UserProvider userSession={userSession}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`/admin/${user.username}`}/>}
          />
          <Route
            path="/admin/:username"
            render={({ match }) => <AdminUsernameRoute match={match} />}
          />
          <Route
            path="/:username/posts"
            render={({ match }) => <UsernamePostsRoute match={match} />}
          />
        </Switch>
      </UserProvider>
    )
  }
}

export default Routes
