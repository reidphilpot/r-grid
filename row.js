define(
  [ 'd3'
  , 'underscore'
  ]
  , function (d3, _) {

    var value = _.property('value')
      , width = _.property('width')

    return function rowFactory() {

      var columns = {}

      function row(s) {
        s.each(rowEach)
      }

      row.columns = function (v) {
        if (!arguments.length) return columns
        columns = v
        return row
      }

      function rowEach(d) {
        var target = d3.select(this)
          , values = columns.map(function (v) { return _.extend(v, { value: d[v.field] }) }) 
          , cells = target.selectAll('div.cell').data(values)

        cells.enter().append('div').classed('cell', true)
        cells.exit().remove()

        cells
          .text(value)  
          .style('width', width)
      }

      return row
    }

  }
)