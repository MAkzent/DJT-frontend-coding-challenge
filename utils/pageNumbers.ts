function generateArray1ToN(n: number) {
  return Array.from({ length: n }, (_v, i) => i + 1)
}

/**
 * 0 represents the pagination gap.
 */
export function generatePageNumbers(currentPage: number, lastPage: number) {
  const pageNumbers: number[] = []

  if (currentPage - 1 > 5) {
    pageNumbers.push(
      ...[1, 2, 0, currentPage - 2, currentPage - 1, currentPage]
    )
  } else {
    pageNumbers.push(...generateArray1ToN(currentPage))
  }

  if (lastPage - currentPage > 5) {
    pageNumbers.push(
      ...[currentPage + 1, currentPage + 2, 0, lastPage - 1, lastPage]
    )
  } else {
    pageNumbers.push(...generateArray1ToN(lastPage).slice(currentPage))
  }

  return pageNumbers
}
