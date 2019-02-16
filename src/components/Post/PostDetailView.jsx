import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Heading, Content } from 'react-bulma-components'

class PostDetailView extends Component {
  state = {
    post: {}
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
    const { userSession, match } = this.props
    const options = { decrypt: false }

    const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)

    if (result) {
      return this.setState({ post: JSON.parse(result) })
    }

    return null
  }

  render() {
    const { post } = this.state

    return (
      <Card>
        <Card.Content>
          <Content>
            <Heading renderAs="h1">{post.title}</Heading>
            <Heading renderAs="h3">ID - {post.id}</Heading>
            <p>{post.description}</p>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default PostDetailView
