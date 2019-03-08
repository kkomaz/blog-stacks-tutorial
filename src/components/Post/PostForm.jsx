import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
} from 'react-bulma-components/lib/components/form'
import {
  Button,
  Card,
  Content,
} from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'
import generateUUID from 'utils/generateUUID'

class PostForm extends Component {
  constructor(props) {
    super(props)

    const { post = {} } = props

    this.state = {
      title: post.title || '', // returns an edited post or starting a new post
      description: post.description || '', // returns an edited post or starting a new post
      posts: [],
    }
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object,
    type: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const { userSession } = this.props
    const options = { decrypt: false }

    const result = await userSession.getFile(POST_FILENAME, options)

    if (result) {
      return this.setState({ posts: JSON.parse(result) })
    }

    return null
  }

  editPost = async () => {
    const options = { encrypt: false }
    const { title, description, posts } = this.state
    const { history, userSession, username, post } = this.props

    // for posts.json
    const params = {
      id: post.id,
      title,
    }

    // for post-${post-id}.json
    const detailParams = {
      ...params,
      description,
    }

    const editedPostsForIndex = _.map(posts, (p) => {
      if (p.id === post.id) {
        return params
      }

      return p
    })

    try {
      await userSession.putFile(POST_FILENAME, JSON.stringify(editedPostsForIndex), options)
      await userSession.putFile(`post-${post.id}.json`, JSON.stringify(detailParams), options)

      this.setState({
        description: '',
        title: ''
      }, () => {
        history.push(`/admin/${username}/posts`)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  createPost = async () => {
    const options = { encrypt: false }
    const { title, description, posts } = this.state
    const { history, userSession, username } = this.props
    const id = generateUUID()

    // for posts.json
    const params = {
      id,
      title,
    }

    // for post-${post-id}.json
    // { id, title, description }
    const detailParams = {
      ...params,
      description
    }

    try {
      await userSession.putFile(POST_FILENAME, JSON.stringify([...posts, params]), options)
      await userSession.putFile(`post-${id}.json`, JSON.stringify(detailParams), options)
      this.setState({
        title: '',
        description: ''
      }, () => history.push(`/admin/${username}/posts`))
    } catch (e) {
      console.log(e)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { type } = this.props

    return type === 'edit' ? this.editPost() : this.createPost()
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Content>
            <form onSubmit={this.onSubmit} className="post-form">
              <Field>
                <Label>Title</Label>
                <Control>
                  <Input
                    name="title"
                    onChange={this.onChange}
                    placeholder="Title of the Post"
                    value={this.state.title}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Post Description</Label>
                <Control>
                  <Textarea
                    name="description"
                    onChange={this.onChange}
                    placeholder="Create Posts here!"
                    rows={20}
                    value={this.state.description}
                  />
                </Control>
              </Field>
              <Field kind="group">
                 <Control>
                   <Button>Cancel</Button>
                 </Control>
                 <Control>
                   <Button
                     color="link"
                     type="submit"
                    >
                      Submit
                  </Button>
                 </Control>
               </Field>
            </form>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default withRouter(PostForm)
