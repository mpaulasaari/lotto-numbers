import React, { Component } from 'react'
import firebase from './firebase'
import Dashboard from 'views/Dashboard'
import Footer from 'components/Footer'
import Header from 'components/Header'

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
    fbRef.once('value', snapshot => {
      this.setState({
        items: snapshot.val(),
      })
      const cachedNumbers = {timestamp: new Date().getTime(), numbers: snapshot.val()}
      localStorage.setItem('lottoNumbers', JSON.stringify(cachedNumbers))
    })
  }
  render() {
    const { items } = this.state
    if (!items.length) return null
    return (
      <main className='App'>
        <Header />
        <Dashboard items={items} />
        <Footer items={items} />
      </main>
    )
  }
}

export default App
