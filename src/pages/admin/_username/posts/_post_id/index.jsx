import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MyContext } from 'components/User/UserProvider'
import PostDetailView from 'components/Post/PostDetailView'

class AdminPostView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props
    const { userSession } = this.context.state.currentUser

    return (
      <div className="admin-post-view">
        <PostDetailView match={match} userSession={userSession} />
      </div>
    )
  }
}

export default AdminPostView
AdminPostView.contextType = MyContext
