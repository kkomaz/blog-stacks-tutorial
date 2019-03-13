import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MyContext } from 'components/User/UserProvider'
import { POST_FILENAME } from 'utils/constants'
import { lookupProfile } from 'blockstack'
import Error from 'components/Error'

class UsernamePostsRoute extends Component {
  state = {
    error: '',
    loading: true,
    posts: []
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
    const { match } = this.props
    const username = match.params.username

    try {
      const profile = await lookupProfile(username)

      if (profile) {
        return this.loadPosts()
      }
    } catch (e) {
      return this.setState({ error: e.message, loading: false })
    }
  }

  loadPosts = async () => {
    const { match } = this.props
    const username = match.params.username
    const { userSession } = this.context.state.currentUser

    // const options = { decrypt: false } -- it's always fetching information about yourself
    const options = { username, decrypt: false } // it's fetching information about a different user

    try {
      const posts = await userSession.getFile(POST_FILENAME, options)

      if (posts) {
        return this.setState({ posts: JSON.parse(posts), loading: false })
      }
    } catch (e) {
      return this.setState({ loading: false, error: 'User does not have any posts!' })
    }
  }

  render() {
    const { match } = this.props

    if (!this.state.loading && this.state.error) {
      return <Error errorMessage={this.state.error} />
    }

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
