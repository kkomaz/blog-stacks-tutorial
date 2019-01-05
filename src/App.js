import React, { Component } from 'react';
import 'stylesheets/main.scss';
import { Button } from 'react-bulma-components'
import { appConfig } from 'utils/constants'
import { UserSession } from 'blockstack'

class App extends Component {
  state = {
    userSession: new UserSession({ appConfig })
  }

  handleSignIn = () => {
    const { userSession } = this.state
    userSession.redirectToSignIn()
  }

  handleSignOut = () => {
    console.log('handle sign out')
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
