import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'
import { MyContext } from 'components/User/UserProvider'

class AdminPostCreate extends Component {
  render() {
    const { userSession, username } = this.context.state.currentUser

    return (
      <PostForm
        username={username}
        userSession={userSession}
        type="create"
      />
    )
  }
}

AdminPostCreate.contextType = MyContext
export default AdminPostCreate
