import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'components/Article'
import Button from 'components/Button'
import NumberInput from './NumberInput'
import { formatDate, formatEUR, formatMatch } from 'helpers/formatters'
import { parsePrizes, sortByKey } from 'helpers/functions'
import './NumberChecker.scss'

const BIGGEST_WIN = { name: '', date: 0, share: 0 }
const KEYCODES = { ENTER: 13, ESC: 27, SPACE: 32 }

class NumberChecker extends Component {
  state = {
    biggestWin: null,
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
    this.setState({
      inputNumbers: newNumbers
    })
  }
  onKeyDown = (e) => {
    const keyCode = e.keyCode
    if (keyCode === KEYCODES.ENTER || keyCode === KEYCODES.SPACE) {
      this.onCheckNumbers()
    } else if (keyCode === KEYCODES.ESC) {
      this.onResetNumbers()
    }
  }
  onResetNumbers = () => {
    this.setState({
      biggestWin: null,
      inputNumbers: [],
      prizesWon: []
    })
  }
  renderInputs = () => {
    const { inputNumbers } = this.state
    const inputs = []
    for(let i = 0; i < 7; i++) {
      inputs.push(
        <NumberInput
          key={`NumberInput-${i}`}
          onChange={(e) => this.onInputChange(i, e)}
          onKeyDown={(this.onKeyDown)}
          value={inputNumbers[i] || ''}
        />
      )
    }
    return inputs
  }
  render () {
    const { body, title } = this.props
    const { biggestWin, prizesWon } = this.state
    return (
      <Article
        body={body}
        className='NumberChecker'
        title={title}
      >
        <div className='col-1'>
          {this.renderInputs()}
          <Button
            className='check'
            onClick={this.onCheckNumbers}
          >
            Check
          </Button>
          <Button
            className='reset'
            onClick={this.onResetNumbers}
          >
            Reset
          </Button>
        </div>
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
      </Article>
    )
  }
}

NumberChecker.PropTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

NumberChecker.defaultProps = {
  body: ''
}

export default NumberChecker
