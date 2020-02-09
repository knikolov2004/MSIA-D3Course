function dataSwap(datasetGroup, fullData) {
  const thisDataGroup = fullData.filter(function(d) {
    return d.year == datasetGroup;
  });

  console.log(thisDataGroup);

  setScales(thisDataGroup);

  setAxes();

  svgScatter
    .selectAll(".ufoLine")
    .transition()
    .ease(d3.easeElastic) //if you use the same ease here as you do with the circles, the line and circles will move together.
    .duration(transitionTime)
    .attr("d", lineGenerator(thisDataGroup));

  drawCircles(thisDataGroup);

  d3.select("#scatterTitleText").text("UFO Sightings in " + datasetGroup);
}
