import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getNumbers } from 'helpers/functions'
import RoundedBar from './RoundedBar'
import './AllNumbersChart.scss'

class AllNumbersChart extends Component {
  state = {
    options: {
      sortDir: 'asc',
      sortKey: 'number'
    }
  }
  render () {
    const { items, title } = this.props
    const { options } = this.state
    const numbers = getNumbers(items, options)
    return (
      <section className='AllNumbersChart section'>
        <h2>{title}</h2>
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
              padding={{ top: 12, bottom: 12 }}
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
              shape={<RoundedBar/>}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    )
  }
}

AllNumbersChart.PropTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default AllNumbersChart
