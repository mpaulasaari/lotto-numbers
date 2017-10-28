import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
    const { items, title } = this.props
    const { options } = this.state
    const numbers = getNumbers(items, options)
    return (
      <section className='AllNumbersChart'>
        <h2>{title}</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={numbers}>
            <XAxis dataKey='number' interval='preserveStartEnd' />
            <YAxis dataKey='count' />
            <Tooltip />
            <Bar dataKey='count' dot />
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
