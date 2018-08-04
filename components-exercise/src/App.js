import React, { Component } from 'react';
import './App.css';
import UserInput from './User/UserInput/UserInput'
import UserOutput from './User/UserOutput/UserOutput'

class App extends Component {
  state = {
    username: 'anderson silva'
  }

  changeUsername(newUsername) {
    this.setState({
      username: newUsername
    })
  }

  render() {
    return (  
      <div className="App">
        <UserInput value={this.state.username} changeHandler={this.changeUsername.bind(this)} />
        <UserOutput username={this.state.username} />
        <UserOutput username='joao' />
        <UserOutput username='eduardo' />
        <UserOutput username='lucas' />
      </div>
    );
  }
}

export default App;
