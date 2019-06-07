import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Button,
  Card,
  Content,
  Columns
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'

class AdminUsername extends Component {
  state = {
    searchedWord: ''
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  navigateToCreatePost = () => {
    const { history, username } = this.props

    history.push(`/admin/${username}/posts/create`)
  }

  onChange = (evt) => {
    this.setState({ searchedWord: evt.target.value })
  }

  onKeyPress = (evt) => {
    const { searchedWord } = this.state
    const { history } = this.props

    if (evt.key === 'Enter') {
      // Navigate to the user's public posts routes

      return history.push(`/${searchedWord}/posts`)
    }
  }

  render() {
    const { username } = this.props


    return (
      <div className="admin-username">
        {
          username === 'kkomaz.id' &&
          <p>
            OPEN NODE API URL: {process.env.REACT_APP_OPEN_NODE_API_URL}
            TEST_VARIABLE: {process.env.REACT_APP_TEST_VARIABLE}
          </p>
        }
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h2">Hello {username}</Heading>

              <Button
                color="primary"
                onClick={this.navigateToCreatePost}
              >
                Create Post
              </Button>
              <div className="mt-one">
                <Columns>
                  <Columns.Column size={6}>
                    <div className="field">
                      <label className="label">Explore User's posts!</label>
                      <input
                        className="input"
                        type="text"
                        placeholder="Type here"
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                      />
                    </div>
                  </Columns.Column>
                </Columns>
              </div>
            </Content>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default withRouter(AdminUsername)
