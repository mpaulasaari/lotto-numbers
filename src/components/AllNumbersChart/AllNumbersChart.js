import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Article from 'components/Article'
import RoundedBar from './RoundedBar'
import { getNumbers } from 'helpers/functions'
import './AllNumbersChart.scss'

class AllNumbersChart extends Component {
  state = {
    options: {
      sortDir: 'asc',
      sortKey: 'number'
    }
  }
  render () {
    const { body, items, title } = this.props
    const { options } = this.state
    const numbers = getNumbers(items, options)
    return (
      <Article
        body={body}
        className='AllNumbersChart'
        title={title}
      >
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={numbers} barCategoryGap='15%' >
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
              dot
              shape={<RoundedBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Article>
    )
  }
}

AllNumbersChart.PropTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

AllNumbersChart.defaultProps = {
  body: ''
}

export default AllNumbersChart
