import React from 'react'
import PropTypes from 'prop-types'
import AllNumbersChart from 'components/AllNumbersChart'
import AllPrizesChart from 'components/AllPrizesChart'
import NumberChecker from 'components/NumberChecker'
import TopTenPrizes from 'components/TopTenPrizes'
import './Dashboard.scss'

const Dashboard = ({ items }) => {
  return (
    <section className='Dashboard'>
      <AllNumbersChart
        body='How many times each individual number has been picked between 1980
        and 2017. Number 40 was introduced in 2017 and numbers 38 and 39 were
        introduced in 1986.'
        items={items}
        title='All Time Numbers'
      />
      <NumberChecker
        body='Check how many times your numbers have won.'
        items={items}
        title='Number Checker'
      />
      <AllPrizesChart
        body='Annual Totals of individually won Jackpots (7 match).'
        items={items}
        title='Won Jackpots Total'
      />
      <div className='row'>
        <div className='col-2'>
          <TopTenPrizes
            body='Biggest Jackpots won by individuals.'
            items={items}
            title='Biggest Jackpots'
          />
        </div>
        <div className='col-2'>
          <TopTenPrizes
            body='Smallest Jackpots won by individuals.'
            className='asc'
            items={items}
            sortDir='asc'
            title='Smallest Jackpots'
          />
        </div>
      </div>
    </section>
  )
}

Dashboard.propTypes = {
  items: PropTypes.array.isRequired
}

export default Dashboard
