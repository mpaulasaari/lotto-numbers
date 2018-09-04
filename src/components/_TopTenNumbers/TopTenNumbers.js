import React from 'react'
import PropTypes from 'prop-types'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'
import Article from 'components/Article'
import RoundedBar from 'components/RoundedBar'
import { getNumbers } from 'helpers/functions'
import './TopTenNumbers.scss'

const TopTenNumbers = ({
  body,
  items,
  sortDir,
  title
}) => {
  const options = {
    count: 10,
    sortDir: sortDir,
    sortKey: 'count'
  }
  const numbers = getNumbers(items, options)

  return (
    <Article
      body={body}
      className='TopTenNumbers'
      title={title}
    >
      <ResponsiveContainer
        width='100%'
        height={300}
      >
        <BarChart
          data={numbers}
          barCategoryGap='15%'
          layout='vertical'
        >
          <XAxis
            axisLine={false}
            dataKey='count'
            domain={[0, 'dataMax']}
            hide
            padding={{ left: 10, right: 5 }}
            tickSize={0}
            type='number'
          />
          <YAxis
            axisLine={false}
            color='#66829a'
            dataKey='number'
            interval={0}
            padding={{ top: 12, bottom: 5 }}
            tickSize={0}
            ticks={numbers.map(num => num.number)}
            type='category'
            width={10}
          />
          <Bar
            dataKey='count'
            label
            shape={<RoundedBar vertical />}
          />
        </BarChart>
      </ResponsiveContainer>

      <ul>
        {numbers.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {item.number}: {item.count}
          </li>
        ))}
      </ul>
    </Article>
  )
}

TopTenNumbers.propTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenNumbers.defaultProps = {
  body: '',
  sortDir: 'desc'
}

export default TopTenNumbers
