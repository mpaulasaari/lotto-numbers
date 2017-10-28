import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
          <LineChart data={prizesSorted}>
            <defs>
              <linearGradient id='linear' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%'    stopColor='#1770af'/>
                <stop offset='12.5%' stopColor='#267fb3'/>
                <stop offset='25%'   stopColor='#2d8190'/>
                <stop offset='37.5%' stopColor='#479493'/>
                <stop offset='50%'   stopColor='#9ac5a0'/>
                <stop offset='62.5%' stopColor='#f6dd9f'/>
                <stop offset='75%'   stopColor='#ec756a'/>
                <stop offset='87.5%' stopColor='#e94755'/>
                <stop offset='100%'  stopColor='#f187c7'/>
              </linearGradient>
            </defs>
            <XAxis
              axisLine={false}
              color='#66829a'
              dataKey='year'
              interval='preserveStartEnd'
              padding={{ left: 25, right: 15 }}
              tickSize={0}
            />
            <YAxis
              axisLine={false}
              dataKey='yearTotal'
              padding={{ top: 20, bottom: 10 }}
              tickFormatter={d => d / 1000000}
              tickSize={0}
              unit=' M€'
              width={60}
            />
            <Tooltip
              animationDuration={200}
              formatter={d => formatEUR(d)}
              offset={20}
              separator=''
            />
            <Line
              dataKey='yearTotal'
              dot
              stroke='url(#linear)'
              type='monotone'
            />
          </LineChart>
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
