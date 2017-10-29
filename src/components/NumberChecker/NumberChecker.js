import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'components/Article'
import Button from 'components/Button'
import NumberInput from './NumberInput'
import { formatDate, formatEUR, formatMatch } from 'helpers/formatters'
import { parsePrizes, sortByKey } from 'helpers/functions'
import './NumberChecker.scss'

const BIGGEST_WIN = { name: '', date: 0, share: 0 }
const EXAMPLE_NUMBERS = [22, 23, 24, 25, 31, 33, 36]
const INITIALSTATE = {
  biggestWin: null,
  inputNumbers: [],
  matchingPrimaries: [],
  matchingSecondaries: [],
  prizesWon: []
}
const KEYCODES = { ENTER: 13, ESC: 27, SPACE: 32 }

class NumberChecker extends Component {
  state = {
    ...INITIALSTATE
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
          && prize.values.secondary <= matchingSecondaries.length
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
              && prize.share > biggestWin.share
            )
            || (
              prize.name === biggestWin.name
              && prize.share === biggestWin.share
              && prize.date > biggestWin.date
            )
          ) {
            biggestWin = { name: prize.name, date: prize.date, share: prize.share }
            this.setState({
              matchingPrimaries,
              matchingSecondaries
            })
          }
        }
      })
    })
    biggestWin = JSON.stringify(biggestWin) === JSON.stringify(BIGGEST_WIN) ? null : biggestWin
    this.setState({
      biggestWin,
      prizesWon: prizesWon.sort(sortByKey('desc', 'name'))
    })
  }
  onExample = () => {
    this.setState({
      inputNumbers: EXAMPLE_NUMBERS
    }, this.onCheckNumbers)
  }
  onInputChange = (index, e) => {
    let value = parseInt(e.target.value, 10)
    if (value > 40) value = 40
    if (value < 1) value = 1
    if (typeof value !== 'number') value = ''
    let newNumbers = this.state.inputNumbers.slice()
    newNumbers[index] = value
    if (newNumbers.every(val => !val)) newNumbers = []
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
      ...INITIALSTATE
    })
  }
  renderInputs = () => {
    const { inputNumbers, matchingPrimaries, matchingSecondaries } = this.state
    const inputs = []
    for(let i = 0; i < 7; i++) {
      const primaryClass = matchingPrimaries.some(num => num === inputNumbers[i])
        ? 'primaryMatch' : ''
      const secondaryClass = matchingSecondaries.some(num => num === inputNumbers[i])
        ? 'secondaryMatch' : ''
      const duplicateClass = inputNumbers.filter(num => num === inputNumbers[i]).length > 1
        ? 'duplicateMatch' : ''
      const classNames = `${primaryClass} ${secondaryClass} ${duplicateClass}`
      inputs.push(
        <NumberInput
          className={classNames}
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
    const { biggestWin, inputNumbers, prizesWon } = this.state
    return (
      <Article
        body={<span>{body} <a onClick={this.onExample}>Example</a></span>}
        className='NumberChecker'
        title={title}
      >
        {this.renderInputs()}
        <div className='NumberChecker-buttons'>
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
        <div className='NumberChecker-results'>
          <h3>Best match with these numbers</h3>
          {biggestWin && inputNumbers.length !== 0
            ? <div className='NumberChecker-BiggestWin'>
                <div className='BiggestWin-name'>
                  {formatMatch(biggestWin.name)}
                </div>
                <div className='BiggestWin-share'>
                  {formatEUR(biggestWin.share)}
                  {biggestWin.share === 0
                    ? <span className='noWin'>(No one won)</span>
                    : null
                  }
                </div>
                <div className='BiggestWin-date'>
                  {formatDate(biggestWin.date)}
                </div>
              </div>
            : <p>No matches with the selected numbers</p>
          }
        </div>
        <div>
          <h4>All matches with these numbers</h4>
            {prizesWon.length && inputNumbers.length !== 0
              ? <div className='NumberChecker-AllMatches'>
                  <div className='AllMatches-grid'>
                    {prizesWon.map((prizeWon, i) => {
                      return ([
                        <div className='AllMatches-name' key={`name-${i}`}>
                          {formatMatch(prizeWon.name)}
                        </div>,
                        <div className='AllMatches-count' key={`count-${i}`}>
                          {prizeWon.count} {prizeWon.count > 1 ? 'times' : 'time'}
                        </div>
                      ])
                    })}
                  </div>
                </div>
              : <p>No matches with the selected numbers</p>
            }
        </div>
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
