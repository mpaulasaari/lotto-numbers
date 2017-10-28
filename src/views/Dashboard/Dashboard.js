import React from 'react'
import PropTypes from 'prop-types'
import AllNumbersChart from 'components/AllNumbersChart'
import AllPrizesChart from 'components/AllPrizesChart'
import NumberChecker from 'components/NumberChecker'
import SecondaryNumbers from 'components/SecondaryNumbers'
import Statistics from 'components/Statistics'
import TopTenNumbers from 'components/TopTenNumbers'
import TopTenPrizes from 'components/TopTenPrizes'
import './Dashboard.scss'

const Dashboard = ({ items }) => {
  return (
    <section className='Dashboard'>
      <Statistics items={items} title='Statistics' />
      <AllNumbersChart items={items} title='Numbers All Time' />
      <NumberChecker items={items} title='Number Checker' />
      <TopTenNumbers items={items} title='Most Frequent Numbers' />
      <TopTenNumbers items={items} sortDir='asc' title='Least Frequent Numbers' body='Number 40 was introduced in 2017. Numbers 38 and 39 were introduced in 1986.' />
      <AllPrizesChart items={items} title='Individually Won Jackpots Total by Year' />
      <TopTenPrizes items={items} title='Biggest Jackpots' />
      <TopTenPrizes items={items} sortDir='asc' title='Smallest Jackpots' />
      <SecondaryNumbers items={items} title='Amount of Secondary Numbers' />
    </section>
  )
}

Dashboard.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Dashboard
