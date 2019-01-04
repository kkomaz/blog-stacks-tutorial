import React, { Component } from 'react';
import './stylesheets/main.scss';
import { Button } from 'react-bulma-components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button color="primary">
          This is a bulma component button
        </Button>
      </div>
    );
  }
}

export default App;
