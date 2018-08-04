import React, { Component } from 'react';
import './App.css';
import Validation from './components/Validation'
import Char from './components/Char'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.changedHandler = this.changedHandler.bind(this)
  }

  changedHandler(e) {
    const input = e.currentTarget.value
    this.setState({
      input
    })
  }

  clickCharHandler(index) {
    const inputBeforeIndex = this.state.input.slice(0, index)
    const inputAfterIndex = this.state.input.slice(index + 1)
    this.setState({
      input: `${inputBeforeIndex}${inputAfterIndex}`
    })
  }

  render() {
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <hr/>
        {/* [1] */}
        <input onChange={this.changedHandler} value={this.state.input}></input>
        <p>Length: {this.state.input.length}</p>
        {/* [2, 3] */}
        <Validation length={this.state.input.length}/>
        {this.state.input
          /* [5] */
          .split('').map((letter, index) =>
            /* [4] */
            <Char
              onClick={/* [6] */ () => this.clickCharHandler(index)}
              key={index}
              letter={letter} />
          )
        }
      </div>
    );
  }
}

export default App;
