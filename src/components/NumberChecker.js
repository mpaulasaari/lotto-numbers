import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatEUR, formatMatch } from 'helpers/formatters'
import { parsePrizes, sortStringsByKey } from 'helpers/functions'

class NumberChecker extends Component {
  constructor(props) {
    super(props)
    this.numberInput = null
  }
  state = {
    biggestWin: null,
    prizesWon: []
  }
  onCheckNumbers = () => {
    let prizesWon = []
    let biggestWin = { name: '', date: 0, share: 0 }
    const numberArr = this.numberInput.value.split(',').map(num => parseInt(num, 10))
    this.props.items.forEach(item => {
      const matchingPrimaries = item.primary.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const matchingSecondaries = item.secondary.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const prizes = parsePrizes(item.prizes, item.date)
      prizes.forEach(prize => {
        if (prize.values.primary === matchingPrimaries.length && prize.values.secondary === matchingSecondaries.length) {
          if (prizesWon.find(prizeWon => prizeWon.name === prize.name)) {
            prizesWon[prizesWon.findIndex((prizeWon => prizeWon.name === prize.name))].count += 1
          } else {
            prizesWon.push({ name: prize.name, count: 1 })
          }
          if ((prize.name > biggestWin.name) || (prize.name === biggestWin.name && prize.share === biggestWin.share && prize.date > biggestWin.date)) {
            biggestWin = { name: prize.name, date: prize.date, share: prize.share }
          }
        }
      })
    })
    this.setState({
      biggestWin,
      prizesWon: prizesWon.sort(sortStringsByKey('desc', 'name'))
    })
  }
  render () {
    const { title } = this.props
    const { biggestWin, prizesWon } = this.state
    return (
      <div>
        <h2>{title}</h2>
        <input type='text' ref={(input) => { this.numberInput = input; }} />
        <button onClick={this.onCheckNumbers}>Check</button>
        {biggestWin ?
          <div>
            <h3>The biggest match or win with these numbers:</h3>
            <p>{formatDate(biggestWin.date)}: {formatMatch(biggestWin.name)} {formatEUR(biggestWin.share)}</p>
          </div>
        : null }
        {prizesWon.length ?
          <div>
            <h3>All wins with these numbers:</h3>
            {prizesWon.map((prizeWon, i) => {
              return <p key={i}>{formatMatch(prizeWon.name)}: {prizeWon.count} times</p>
            })}
          </div>
        : null}
      </div>
    )
  }
}

NumberChecker.PropTypes = {
  items: PropTypes.array.isRequired
}

export default NumberChecker
