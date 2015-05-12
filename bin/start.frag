(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3', 'underscore'], factory);
  } else {
    root.createRGrid = factory(root.d3, root._);
  }
}(this, function (d3, _) {