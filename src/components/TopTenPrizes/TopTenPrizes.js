import React from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Article from 'components/Article'
import RoundedBar from 'components/RoundedBar'
import { getMaxInArray, getPrizes } from 'helpers/functions'
import { formatDate, formatEUR } from 'helpers/formatters'
import './TopTenPrizes.scss'

const TopTenPrizes = ({ body, className, items, sortDir, title }) => {
  const options = { count: 10, sortDir: sortDir, sortKey: '7 oikein' }
  const prizes = getPrizes(items, options)
  const prizesMap = prizes.map((item, i) => {
    const shares = item.prizes.filter(i => i.name === '7 oikein')
    const share = getMaxInArray(shares, 'share')
    return {
      share: share,
      date: formatDate(item.date)
    }
  })
  return (
    <Article
      body={body}
      className={`TopTenPrizes ${className}`}
      title={title}
      >
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={prizesMap} barCategoryGap='15%' layout='vertical'>
          <XAxis
            axisLine={false}
            dataKey='share'
            domain={[0, 'dataMax']}
            hide
            padding={{ left: 15, right: 5 }}
            tickSize={0}
            type='number'
          />
          <YAxis
            axisLine={false}
            color='#66829a'
            dataKey='date'
            interval={0}
            padding={{ top: 12, bottom: 5 }}
            tickSize={0}
            type='category'
            width={80}
          />
          <Bar
            dataKey='share'
            label={label => (
                <text
                  y={label.y}
                  dx={label.width / 2}
                  width={label.width}
                  height={label.height}
                  textAnchor='middle'
                >
                  <tspan
                    dy='1em'
                    x={label.x}
                  >
                    {formatEUR(label.value)}
                  </tspan>
                </text>
              )
            }
            shape={<RoundedBar vertical />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Article>
  )
}

TopTenPrizes.PropTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenPrizes.defaultProps = {
  body: '',
  className: '',
  sortDir: 'desc'
}

export default TopTenPrizes
