import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatEUR, formatMatch } from 'helpers/formatters'
import { parsePrizes, sortByKey } from 'helpers/functions'
import NumberInput from './NumberInput'

const BIGGEST_WIN = { name: '', date: 0, share: 0 }

class NumberChecker extends Component {
  state = {
    biggestWin: null,
    errors: '',
    inputNumbers: [],
    prizesWon: []
  }
  onCheckNumbers = () => {
    let prizesWon = []
    let biggestWin = Object.assign({}, BIGGEST_WIN)
    const numberArr = this.state.inputNumbers.slice()
    this.props.items.forEach(item => {
      const matchingPrimaries = item.primary.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const matchingSecondaries = item.secondary.filter(itemNumber => numberArr.some(number => number === itemNumber))
      const prizes = parsePrizes(item.prizes, item.date)
      prizes.forEach(prize => {
        if (
          prize.values.primary === matchingPrimaries.length
          && prize.values.secondary === matchingSecondaries.length
        ) {
          if (prizesWon.find(prizeWon => prizeWon.name === prize.name)) {
            prizesWon[prizesWon.findIndex((prizeWon => prizeWon.name === prize.name))].count += 1
          } else {
            prizesWon.push({ name: prize.name, count: 1 })
          }
          if (
            (prize.name > biggestWin.name)
            || (
              prize.name === biggestWin.name
              && prize.share === biggestWin.share
              && prize.date > biggestWin.date
            )
          ) {
            biggestWin = { name: prize.name, date: prize.date, share: prize.share }
          }
        }
      })
    })
    biggestWin = JSON.stringify(biggestWin) === JSON.stringify(BIGGEST_WIN) ? {} : biggestWin
    this.setState({
      biggestWin,
      prizesWon: prizesWon.sort(sortByKey('desc', 'name'))
    })
  }
  onInputChange = (index, e) => {
    let value = parseInt(e.target.value, 10)
    if (value > 40) value = 40
    if (value < 1) value = 1
    if (typeof value !== 'number') value = ''
    const newNumbers = this.state.inputNumbers.slice()
    newNumbers[index] = value
    this.validateNumbers(newNumbers)
    this.setState({
      inputNumbers: newNumbers
    })
  }
  arrayHasDuplicates = (arr) => {
    const sorted_arr = arr.slice().sort();
    let hasDuplicates = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (sorted_arr[i + 1] && sorted_arr[i + 1] === sorted_arr[i]) {
        hasDuplicates = true
      }
    }
    return hasDuplicates
  }
  validateNumbers = (numbers) => {
    const errorMsg = this.arrayHasDuplicates(numbers)
      ? 'Choose unique numbers' : ''
    this.setState({
      errors: errorMsg
    })
  }
  render () {
    const { title } = this.props
    const { biggestWin, errors, inputNumbers, prizesWon } = this.state
    return (
      <section className='NumberChecker section'>
        <h2>{title}</h2>
        <NumberInput onChange={(e) => this.onInputChange(0, e)} value={inputNumbers[0] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(1, e)} value={inputNumbers[1] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(2, e)} value={inputNumbers[2] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(3, e)} value={inputNumbers[3] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(4, e)} value={inputNumbers[4] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(5, e)} value={inputNumbers[5] || ''} />
        <NumberInput onChange={(e) => this.onInputChange(6, e)} value={inputNumbers[6] || ''} />
        <button onClick={this.onCheckNumbers} disabled={errors}>
          Check
        </button>
        {errors}
        {biggestWin ?
          <div>
            <h3>The biggest match or win with these numbers:</h3>
            <p>{formatDate(biggestWin.date)}: {formatMatch(biggestWin.name)} {formatEUR(biggestWin.share)}</p>
          </div>
        : null }
        {prizesWon.length ?
          <div>
            <h3>All wins matches these numbers:</h3>
            {prizesWon.map((prizeWon, i) => {
              return <p key={i}>{formatMatch(prizeWon.name)}: {prizeWon.count} times</p>
            })}
          </div>
        : null}
      </section>
    )
  }
}

NumberChecker.PropTypes = {
  items: PropTypes.array.isRequired
}

export default NumberChecker
