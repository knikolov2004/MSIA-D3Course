// let janDate;
// let decDate;
function setScales(thisData, dataYear) {
  const janDate = new Date(dataYear, 0);
  const decDate = new Date(dataYear, 11);
  console.log(janDate, decDate);
  xScaleScatter.domain([janDate, decDate]);
  console.log(xScaleScatter.domain());

  yScaleScatter.domain([
    0,
    d3.max(thisData, function(d) {
      return d.count;
    })
  ]);
}
