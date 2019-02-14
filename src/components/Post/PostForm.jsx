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
  state = {
    title: '',
    description: '',
    posts: [],
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
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
    this.createPost()
  }

  seeRandom = async () => {
    const { userSession } = this.props

    await userSession.getFile('random.json', { decrypt: false })
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Content>
            <Button onClick={this.seeRandom}>
              See Random
            </Button>
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
