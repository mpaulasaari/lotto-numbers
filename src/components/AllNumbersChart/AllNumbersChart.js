import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Article from 'components/Article'
import Button from 'components/Button'
import RoundedBar from 'components/RoundedBar'
import { getNumbers } from 'helpers/functions'
import './AllNumbersChart.scss'

const INITIAL_OPTIONS = {
  sortDir: 'asc',
  sortKey: 'number'
}

class AllNumbersChart extends Component {
  state = {
    animateButton: true,
    options: INITIAL_OPTIONS
  }
  onSort = () => {
    const { sortKey } = this.state.options
    const options = Object.assign({}, this.state.options)
    if (sortKey === 'number') {
      options.sortKey = 'count'
      this.setState({
        options
      })
    } else {
      this.setState({
        options: INITIAL_OPTIONS
      })
    }
    this.setState({
      animateButton: false
    })
  }
  render () {
    const { body, items, title } = this.props
    const { animateButton, options } = this.state
    const numbers = getNumbers(items, options)
    return (
      <Article className='AllNumbersChart'>
        <h2>
          {title}
          <Button
            className={`sort ${animateButton ? 'animate' : ''}`}
            onClick={this.onSort}
          >
            Sort
          </Button>
        </h2>
        <p className='Article-body'>{body}</p>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={numbers} barCategoryGap='15%'>
            <XAxis
              axisLine={false}
              color='#66829a'
              dataKey='number'
              interval='preserveStartEnd'
              padding={{ left: 10, right: 5 }}
              tickSize={0}
            />
            <YAxis
              axisLine={false}
              dataKey='count'
              padding={{ top: 12, bottom: 5 }}
              tickSize={0}
              width={30}
            />
            <Tooltip
              animationDuration={200}
              formatter={d => `${d} times`}
              offset={20}
              separator=''
            />
            <Bar
              dataKey='count'
              shape={<RoundedBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Article>
    )
  }
}

AllNumbersChart.propTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

AllNumbersChart.defaultProps = {
  body: ''
}

export default AllNumbersChart
