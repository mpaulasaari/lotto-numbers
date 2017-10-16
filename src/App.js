import React, { Component } from 'react'
import firebase from './firebase'
import Dashboard from './modules/Dashboard'

class App extends Component {
  state = {
    items: []
  }
  componentWillMount() {
    const cachedNumbers = JSON.parse(localStorage.getItem('lottoNumbers'))
    if (cachedNumbers) {
      const dateString = cachedNumbers.timestamp
      const now = new Date().getTime().toString()
      const week = 7 * 24 * 60 * 60 * 1000
      if (dateString + week < now) {
        console.log('too old numbers, fetch and cache')
        this.getItems()
      } else {
        console.log('using cached numbers')
        this.setState({
          items: cachedNumbers.numbers,
        })
      }
    } else {
      console.log('first time loading, no cached numbers')
      this.getItems()
    }
  }
  getItems = () => {
    const fbRef = firebase.database().ref()
    fbRef.on('value', snapshot => {
      this.setState({
        items: snapshot.val(),
      })
      const cachedNumbers = {timestamp: new Date().getTime(), numbers: snapshot.val()}
      localStorage.setItem('lottoNumbers', JSON.stringify(cachedNumbers))
    })
  }
  render() {
    return (
      <Dashboard items={this.state.items} />
    )
  }
}

export default App
