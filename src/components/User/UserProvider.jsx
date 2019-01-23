import React, { Component } from 'react'
import PropTypes from 'prop-types'
export const MyContext = React.createContext()

class UserProvider extends Component {
  constructor(props) {
    super(props)

    const userData = props.userSession.loadUserData()

    this.state = {
      currentUser: {
        userData,
        userSession: props.userSession,
        username: userData.username
      }
    }
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default UserProvider
