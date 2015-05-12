define(
  [ 'd3'
  , 'underscore'
  , './row'
  , 'text!./grid.html'
  ]
  , function (d3, _, createRow, template) {

    var rowHeight = 29
      , id = _.property('id')

    return function gridFactory() {

      var columns

      function grid(s) {
        s.each(gridEach)
      }

      grid.columns = function (v) {
        if (!arguments.length) return columns
        columns = v
        return grid
      }

      function gridEach(d) {
        var target = d3.select(this).html(template).classed('r-grid', true)
          , current = target.select('.rows')
          , length = d.length 
          , scroll = _.debounce(render, 10)
          , rows = 1 + Math.ceil(this.clientHeight / rowHeight)
          , position = 0
          , rowComponent = createRow().columns(columns)

        scroll(0)

        target.on('scroll.rGrid', function () {
          position = Math.floor(this.scrollTop / rowHeight)
          scroll(this.scrollTop)
        })

        function render (scrollTop) {
          target.each(function () {
            this.scrollTop = scrollTop

            var from = Math.max(0, Math.min(length - rows, position))
              , to = from + rows
              , datum = d.slice(from, Math.min(to, length))

            target.select('.before').style('height', from * rowHeight + 'px')
            target.select('.after').style('height', (length - to) * rowHeight + 'px')

            var update = current.selectAll('div.row').data(datum, id)
            update.enter().append('div').classed('row', true)
            update.exit().remove()
            update.call(rowComponent).order()
          })
        }

      }

      return grid
    }

  }
)