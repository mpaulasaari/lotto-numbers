import React from 'react'
import PropTypes from 'prop-types'
import AllNumbersChart from '../components/AllNumbersChart'
import TopTenNumbers from '../components/TopTenNumbers'
import TopTenPrizes from '../components/TopTenPrizes'

const Dashboard = ({ items }) => {
  return (
    <div>
      <AllNumbersChart items={items} title='All Time' />
      <TopTenNumbers items={items} title='Most Frequent Numbers' />
      <TopTenNumbers items={items} sortDir='asc' title='Least Frequent Numbers' body='Number 40 was introduced in 2017. Numbers 38 and 39 were introduced in 1986.' />
      <TopTenPrizes items={items} title='Biggest Jackpots' />
      <TopTenPrizes items={items} sortDir='asc' title='Smallest Jackpots' />
    </div>
  )
}

Dashboard.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Dashboard
