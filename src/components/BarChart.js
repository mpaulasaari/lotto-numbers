import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { ReactFauxDOM } from 'react-faux-dom'

const BarChart = ({ body, items, sortDir, title }) => {
  // Create your element.
  var el = ReactFauxDOM.createElement('div')

  // Change stuff using actual DOM functions.
  // Even perform CSS selections!
  el.style.setProperty('color', 'red')
  el.setAttribute('class', 'box')

  // Render it to React elements.
  return el.toReact()
}

BarChart.PropTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default BarChart
