function setScales(thisData) {
  xScaleScatter.domain(
    d3.extent(thisData, function(d) {
      return d.parsedDate;
    })
  );

  yScaleScatter.domain([
    0,
    d3.max(thisData, function(d) {
      return d.count;
    })
  ]);
}
