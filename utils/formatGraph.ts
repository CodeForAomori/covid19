type DataType = {
  日付: Date
  小計: number
}

export type GraphDataType = {
  label: string
  transition: number
  cumulative: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 * @param is_date_filter - enabled date filter
 */
export default (data: DataType[], is_date_filter: Boolean = true) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  data
    .filter(d => (!is_date_filter || new Date(d['日付']) < today))
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['小計']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          transition: subTotal,
          cumulative: patSum
        })
      }
    })
  return graphData
}
