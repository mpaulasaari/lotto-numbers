import React from 'react'
import PropTypes from 'prop-types'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getSortedPrizes } from '../helpers/functions'
import { formatEUR } from '../helpers/formatters'

const AllPrizesChart = ({ items, title }) => {
  const options = { groupBy: 'year', sortKey: '7 oikein' }
  const prizesSorted = getSortedPrizes(items, options)
  return (
    <section className='AllPrizesChart'>
      <h2>{title}</h2>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          data={prizesSorted}
          height={300}
          width={1400}>
          <XAxis dataKey='year' interval={1} />
          <YAxis dataKey='yearTotal' unit=' €' />
          <Tooltip formatter={d => formatEUR(d)} />
          <Area dataKey='yearTotal' fill='#8884d8' dot />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}

AllPrizesChart.PropTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default AllPrizesChart
