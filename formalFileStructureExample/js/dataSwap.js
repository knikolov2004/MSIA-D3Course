// ***** swaps data in scatter plot when you click a button *****
function dataSwap(dataYear, fullData) {
  // filter for data that corresponds to the year you clicked
  const filteredData = fullData.filter(function(d) {
    return d.year == dataYear;
  });

  // set scales
  setScales(filteredData, dataYear);

  // set axes
  setAxes();

  // move line
  svgScatter
    .selectAll(".ufoLine")
    .transition()
    .ease(d3.easeElastic) //if you use the same ease here as you do with the circles, the line and circles will move together.
    .duration(transitionTime)
    .attr("d", lineGenerator(filteredData));

  // redraw the circles
  drawCircles(filteredData);

  //update title
  d3.select("#scatterTitleText").text("UFO Sightings in " + dataYear);
}
