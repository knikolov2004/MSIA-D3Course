function dataSwap(dataYear, fullData) {
  const filteredData = fullData.filter(function(d) {
    return d.year == dataYear;
  });

  console.log(dataYear);

  setScales(filteredData, dataYear);

  setAxes();

  svgScatter
    .selectAll(".ufoLine")
    .transition()
    .ease(d3.easeElastic) //if you use the same ease here as you do with the circles, the line and circles will move together.
    .duration(transitionTime)
    .attr("d", lineGenerator(filteredData));

  drawCircles(filteredData);

  d3.select("#scatterTitleText").text("UFO Sightings in " + dataYear);
}
