import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'react-bulma-components'

const error = (props) => (
  <Message color="danger">
    <Message.Header>
      Title
    </Message.Header>

    <Message.Body>
      {props.errorMessage}
    </Message.Body>
  </Message>
)

error.propTypes = {
  errorMessage: PropTypes.string.isRequired
}

export default error
