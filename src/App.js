import React, { Component } from 'react'
import firebase from './firebase'
import Dashboard from 'views/Dashboard'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Loader from 'components/Loader'

class App extends Component {
  state = {
    items: []
  }

  componentWillMount() {
    const cachedNumbers = localStorage.getItem('lottoNumbers')
    const parsedNumbers = cachedNumbers && JSON.parse(cachedNumbers)

    if (parsedNumbers) {
      const dateString = parsedNumbers.timestamp
      const now = new Date().getTime().toString()
      const week = 7 * 24 * 60 * 60 * 1000

      if (dateString + week < now) {
        console.log('too old numbers, fetch and cache')
        this.getItems()
      } else {
        console.log('using cached numbers')

        this.setState({
          items: parsedNumbers.numbers,
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

      const parsedNumbers = {
        timestamp: new Date().getTime(),
        numbers: snapshot.val()
      }

      localStorage.setItem(
        'lottoNumbers',
        JSON.stringify(parsedNumbers)
      )
    })
  }

  render() {
    const { items } = this.state

    return (
      <main className='App'>
        <Header />

        {!items.length
          ? <Loader />
          : <div>
              <Dashboard items={items} />
              <Footer items={items} />
            </div>
        }
      </main>
    )
  }
}

export default App
