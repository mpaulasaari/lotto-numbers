/* eslint-disable no-undef */

import { Selector } from 'testcafe'

fixture('Dashboard').page('http://localhost:3000')

test('AllNumbersChart should sort items', async t => {
  const initialItems = await Selector('.AllNumbersChart .xAxis').textContent
  console.log('initialItems: ', initialItems)

  await t.click('.Button-sort')

  const sortedItems = await Selector('.AllNumbersChart .xAxis').textContent
  console.log('sortedItems: ', sortedItems)

  await t.expect(sortedItems).notEql(initialItems)
})

test('NumberChecker should populate example numbers', async t => {
  const NumberInputs = await Selector('.NumberChecker .NumberInput')
  await t.click(NumberInputs) // hack to make inputs visible to testcafe
  const NumberInputsLength = await NumberInputs.count

  await t.expect(NumberInputsLength).eql(7)

  for (let i = 0; i < NumberInputsLength; i++) {
    await t.expect(NumberInputs.nth(i).value).eql('')
  }

  await t.click('.NumberChecker-example')
  for (let i = 0; i < NumberInputsLength; i++) {
    await t.expect(NumberInputs.nth(i).value).notEql('')
  }
})

test('NumberChecker should check/reset numbers', async t => {
  const initialResults = await Selector('.NumberChecker-results').textContent
  const NumberInputs = await Selector('.NumberChecker .NumberInput')
  const NumberInputsLength = await NumberInputs.count

  await t.expect(NumberInputsLength).eql(7)
  for (let i = 0; i < NumberInputsLength; i++) {
    await t.typeText(NumberInputs.nth(i), `${i + 1}`)
  }

  await t.click('.NumberChecker .Button-check')
  const checkedResults = await Selector('.NumberChecker-results').textContent
  await t.expect(initialResults).notEql(checkedResults)

  await t.click('.NumberChecker .Button-reset')
  const resettedResults = await Selector('.NumberChecker-results').textContent
  await t.expect(initialResults).eql(resettedResults)
})
