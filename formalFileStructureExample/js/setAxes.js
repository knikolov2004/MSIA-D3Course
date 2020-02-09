// ***** set axes *****
function setAxes() {
  xAxisScatter.scale(xScaleScatter);

  yAxisScatter.scale(yScaleScatter);

  xAxisScatterGroup.call(xAxisScatter);

  yAxisScatterGroup
    .transition()
    .duration(transitionTime)
    .call(yAxisScatter);
}
