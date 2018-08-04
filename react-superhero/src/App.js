import React, { Component } from 'react'
import axios from 'axios'
import { CardDeck } from 'reactstrap'
import { chunk } from 'lodash'
import Hero from './Hero/Hero'
import './App.css'

class App extends Component {
  
  state = {
    heroes: []
  }
  
  async getHero(heroId) {
    const accessToken = '1814543451924953'
    
    return axios.get(`http://www.superheroapi.com/api.php/${accessToken}/${heroId}`)
      .then(res => res.data)
      .then(heroData => {
        return {
          name: heroData['name'],
          fullName: heroData['biography']['full-name'] || heroData['name'],
          photo: heroData['image']['url'],
        }
      })
  }

  async componentDidMount() {
    const numberOfHeroes = 3
    const largestHeroId = 731
    const heroes = []
    
    for(let i = 1; i <= numberOfHeroes; i++) {
      const randomHeroId = Math.floor(Math.random() * largestHeroId) + 1
      const hero = await this.getHero(randomHeroId)
      heroes.push(hero)
    }
    this.setState({heroes})  
  }

  async addHeroHandler() {
    const largestHeroId = 731
    const randomHeroId = Math.floor(Math.random() * largestHeroId) + 1
    const newHero = await this.getHero(randomHeroId)
    
    let heroes = [...this.state.heroes, newHero]
    this.setState({ heroes })
  }

  changeNameHelper = (id, name) =>
    this.state.heroes.map((h, index) => {
      if(index !== id) return h

      return {...h, name}
    })

  shoutNameHandler = (id) =>
    this.setState({
      heroes: this.changeNameHelper(id, this.state.heroes[id].name.toUpperCase() + '!')
    })

  nameChangedHandler = (id, e) =>
    this.setState({ heroes: this.changeNameHelper(id, e.currentTarget.value) })

  render() {
    const heroes = this.state.heroes.map( (h, index) => {
      return (
        <Hero
          name={h.name}
          fullName={h.fullName}
          photo={h.photo}
          key={index}
          id={index}
          click={this.shoutNameHandler}
          changed={this.nameChangedHandler}
        />
      )
    })

    const heroesPerRow = 4
    const rows = chunk(heroes, heroesPerRow).map(heroesInRow => {
      const colSize = `col-${12 / heroesPerRow * heroesInRow.length}`

      return (
        <div className="row">
          <div className={colSize}>
            <CardDeck> {heroesInRow} </CardDeck>
          </div>
        </div>
      )
    })
    
    return (
      <div className="App">
        <div className="content container">
          {rows}
        </div>
        <hr/>
        <button onClick={this.addHeroHandler.bind(this)}>Add a Hero</button>
      </div>
    )
  }
}

export default App
