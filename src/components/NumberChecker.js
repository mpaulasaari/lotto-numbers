import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatEUR, formatMatch } from '../helpers/formatters'
import { parsePrizes, sortStringsByKey } from '../helpers/functions'

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
    const { items } = this.props
    let prizesWon = []
    let biggestWin = { name: '', date: 0, share: 0 }
    const numberArr = this.numberInput.value.split(',').map(num => parseInt(num, 10))
    items.forEach(item => {
      const itemPrimaries = item.primary
      const itemSecondaries = item.secondary
      const matchingPrimaries = itemPrimaries.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const matchingSecondaries = itemSecondaries.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const prizes = parsePrizes(item.prizes, item.date)
      prizes.forEach(prize => {
        if (prize.values.primary === matchingPrimaries.length && prize.values.secondary === matchingSecondaries.length) {
          if (prizesWon.find(prizeWon => prizeWon.name === prize.name)) {
            const prizeWonIndex = prizesWon.findIndex((prizeWon => prizeWon.name === prize.name))
            prizesWon[prizeWonIndex].count += 1
          } else {
            prizesWon.push({ name: prize.name, count: 1 })
          }
          if ((prize.share >= biggestWin.share) || (prize.share === biggestWin.share && prize.date > biggestWin.date)) {
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
        <input type='text' ref={(input) => { this.numberInput = input; }} value='1,2,3,4,5,6,7' />
        <button onClick={this.onCheckNumbers}>Check</button>
        {biggestWin ?
          <div>
            <h3>The biggest win with these numbers:</h3>
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
