import React from 'react'
import PropTypes from 'prop-types'
import AllNumbersChart from 'components/AllNumbersChart'
import AllPrizesChart from 'components/AllPrizesChart'
import NumberChecker from 'components/NumberChecker'
// import SecondaryNumbers from 'components/SecondaryNumbers'
// import TopTenNumbers from 'components/TopTenNumbers'
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
      {/*<div className='row'>
        <div className='col-2'>
          <TopTenNumbers
            items={items}
            title='Most Frequent Numbers'
          />
        </div>
        <div className='col-2'>
          <TopTenNumbers
            items={items}
            sortDir='asc'
            title='Least Frequent Numbers'
          />
        </div>
      </div>*/}
      <AllPrizesChart
        items={items}
        title='Won Jackpots Total'
      />
      <div className='row'>
        <div className='col-2'>
          <TopTenPrizes
            items={items}
            title='Biggest Jackpots'
          />
        </div>
        <div className='col-2'>
          <TopTenPrizes
            items={items}
            sortDir='asc'
            title='Smallest Jackpots'
          />
        </div>
      </div>
      {/*<SecondaryNumbers
        items={items}
        title='Amount of Secondary Numbers'
      />*/}
    </section>
  )
}

Dashboard.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Dashboard
