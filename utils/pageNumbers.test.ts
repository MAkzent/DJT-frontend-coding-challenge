import { generatePageNumbers } from './pageNumbers'

test('show 1 page correctly', () => {
  const pageNumbers = generatePageNumbers(1, 1)
  expect(pageNumbers).toEqual([1])
})

test('show 100 page correctly', () => {
  const pageNumbers = generatePageNumbers(50, 100)
  expect(pageNumbers).toEqual([1, 2, 0, 48, 49, 50, 51, 52, 0, 99, 100])
})

test('show 11 page with current page at 6 correctly', () => {
  const pageNumbers = generatePageNumbers(6, 11)
  expect(pageNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
})

test('show every page before current page if current page is not more first page + 5', () => {
  const pageNumbers = generatePageNumbers(6, 6)
  expect(pageNumbers).toEqual([1, 2, 3, 4, 5, 6])
})

test('show gap 2 pages before current page if current page is more first page + 5', () => {
  const pageNumbers = generatePageNumbers(7, 7)
  expect(pageNumbers).toEqual([1, 2, 0, 5, 6, 7])
})

test('show every page after current page if current page is not less than last page - 5', () => {
  const pageNumbers = generatePageNumbers(2, 7)
  expect(pageNumbers).toEqual([1, 2, 3, 4, 5, 6, 7])
})

test('show gap 2 pages after from current page if current page is less than last page - 5', () => {
  const pageNumbers = generatePageNumbers(1, 7)
  expect(pageNumbers).toEqual([1, 2, 3, 0, 6, 7])
})
