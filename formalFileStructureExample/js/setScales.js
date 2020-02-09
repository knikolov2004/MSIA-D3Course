// ***** set scales *****
function setScales(thisData, dataYear) {
  // For year passed in, find the jan date and dec date in datetime
  // This way, if the data is incomplete, it still will represent all 12 months on the plot
  const janDate = new Date(dataYear, 0);
  const decDate = new Date(dataYear, 11);

  // set xScale domain
  xScaleScatter.domain([janDate, decDate]);

  // set yScale domain; [0, max count in thisData]
  yScaleScatter.domain([
    0,
    d3.max(thisData, function(d) {
      return d.count;
    })
  ]);
}
