import React, { Component } from 'react';
import 'stylesheets/main.scss';
import { Button } from 'react-bulma-components'
import { appConfig } from 'utils/constants'
import { UserSession } from 'blockstack'

class App extends Component {
  state = {
    userSession: new UserSession({ appConfig })
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username')
      }

      window.location = '/'
    }
  }

  handleSignIn = () => {
    const { userSession } = this.state
    userSession.redirectToSignIn()
  }

  handleSignOut = () => {
    const { userSession } = this.state
    userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const { userSession } = this.state

    return (
      <div className="App">
        {
          userSession.isUserSignedIn() ?
          <Button color="primary" onClick={this.handleSignOut}>
            Sign Out
          </Button> :
          <Button color="primary" onClick={this.handleSignIn}>
            Sign In
          </Button>
        }
      </div>
    );
  }
}

export default App;
