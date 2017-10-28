import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getSortedPrizes } from 'helpers/functions'
import { formatEUR } from 'helpers/formatters'
import './AllPrizesChart.scss'

class AllPrizesChart extends Component {
  state = {
    options: {
      groupBy: 'year',
      sortKey: '7 oikein'
    }
  }
  render () {
    const { items, title } = this.props
    const { options } = this.state
    const prizesSorted = getSortedPrizes(items, options)
    return (
      <section className='AllPrizesChart section'>
        <h2>{title}</h2>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={prizesSorted}>
            <XAxis dataKey='year' interval='preserveStartEnd' />
            <YAxis dataKey='yearTotal' tickFormatter={d => d / 1000000} unit=' M€' />
            <Tooltip formatter={d => formatEUR(d)} />
            <Area dataKey='yearTotal' dot />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    )
  }
}

AllPrizesChart.PropTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default AllPrizesChart
