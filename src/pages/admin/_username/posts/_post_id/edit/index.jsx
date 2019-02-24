import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostForm from 'components/Post/PostForm'
import Loader from 'components/Loader'
import { MyContext } from 'components/User/UserProvider'

class AdminPostEdit extends Component {
  state = {
    post: {},
    loading: true
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
    const { userSession } = this.context.state.currentUser
    const { match } = this.props

    const options = { decrypt: false }

    const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)

    if (result) {
      return this.setState({ post: JSON.parse(result), loading: false })
    }

    return null
  }

  render() {
    const { loading, post } = this.state
    const { userSession, username } = this.context.state.currentUser

    if (loading) {
      return <Loader />
    }

    return (
      <PostForm
        userSession={userSession}
        username={username}
        post={post}
        type="edit"
      />
    )
  }
}

export default AdminPostEdit
AdminPostEdit.contextType = MyContext
