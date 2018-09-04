import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AllMatches from './AllMatches'
import Article from 'components/Article'
import BiggestWin from './BiggestWin'
import Button from 'components/Button'
import NumberInput from './NumberInput'
import {
  parsePrizes,
  sortByKey
} from 'helpers/functions'
import './NumberChecker.scss'

const BIGGEST_WIN = {
  name: '',
  date: 0,
  share: 0
}
const INITIALSTATE = {
  biggestWin: null,
  inputNumbers: [],
  matchingPrimaries: [],
  matchingSecondaries: [],
  prizesWon: []
}
const KEYCODES = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32
}
const NO_MATCHES = 'No matches with the selected numbers'
const NOT_SELECTED = 'Select numbers and click CHECK'

class NumberChecker extends Component {
  state = {
    animateLink: true,
    ...INITIALSTATE
  }

  onCheckNumbers = () => {
    let prizesWon = []
    let biggestWin = Object.assign({}, BIGGEST_WIN)
    const numberArr = this.state.inputNumbers.slice()

    this.props.items.forEach(item => {
      const matchingPrimaries = item.primary
        .filter(itemNumber => numberArr.some(number => number === itemNumber))
      const matchingSecondaries = item.secondary
        .filter(itemNumber => numberArr.some(number => number === itemNumber))
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
            biggestWin = {
              name: prize.name,
              date: prize.date,
              share: prize.share
            }

            this.setState({
              matchingPrimaries,
              matchingSecondaries
            })
          }
        }
      })
    })

    biggestWin = JSON.stringify(biggestWin) === JSON.stringify(BIGGEST_WIN)
      ? NO_MATCHES
      : biggestWin

    prizesWon = prizesWon.length === 0
      ? NO_MATCHES
      : prizesWon.sort(sortByKey('desc', 'name'))

    this.setState({
      biggestWin,
      prizesWon
    })
  }

  onExample = () => {
    const exampleNumbers = []

    while (exampleNumbers.length < 7) {
      const random = Math.ceil(Math.random() * 37)

      if (exampleNumbers.every(num => num !== random)) {
        exampleNumbers.push(random)
      }
    }

    this.setState({
      animateLink: false,
      inputNumbers: exampleNumbers
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
      ...INITIALSTATE,
      inputNumbers: newNumbers,
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
    const {
      inputNumbers,
      matchingPrimaries,
      matchingSecondaries
    } = this.state
    const inputs = []

    for (let i = 0; i < 7; i++) {
      const primaryClass = matchingPrimaries.some(num => num === inputNumbers[i])
        ? 'primaryMatch'
        : ''
      const secondaryClass = matchingSecondaries.some(num => num === inputNumbers[i])
        ? 'secondaryMatch'
        : ''
      const duplicateClass = inputNumbers.filter(num => num === inputNumbers[i]).length > 1
        ? 'duplicateMatch'
        : ''
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
    const {
      body,
      title
    } = this.props
    const {
      animateLink,
      biggestWin,
      inputNumbers,
      prizesWon
    } = this.state
    const numbersFilled = inputNumbers.length === 7 && !inputNumbers.includes(undefined)
    const articleBody = (
      <span>
        {`${body} `}

        <a
          className={`NumberChecker-example ${animateLink ? 'animate' : ''}`}
          onClick={this.onExample}>
          Example
        </a>
      </span>
    )

    return (
      <Article
        body={articleBody}
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
          <h3>Highest match with these numbers</h3>

          {numbersFilled && biggestWin
            ? <BiggestWin biggestWin={biggestWin} />
            : <p>{NOT_SELECTED}</p>
          }
        </div>

        <div>
          <h4>All matches with these numbers</h4>

          {numbersFilled && prizesWon.length
            ? <AllMatches prizesWon={prizesWon} />
            : <p>{NOT_SELECTED}</p>
          }
        </div>
      </Article>
    )
  }
}

NumberChecker.propTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

NumberChecker.defaultProps = {
  body: ''
}

export default NumberChecker
