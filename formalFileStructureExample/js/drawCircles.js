// ***** Draw the circles *****
function drawCircles(thisData) {
  const groups = svgScatter.selectAll(".ufoGroup").data(thisData, function(d) {
    return d.month;
  });

  const enterGroups = groups
    .enter()
    .append("g")
    // will need to assign class and location to incoming data groups
    .attr("class", "ufoGroup")
    .attr("transform", function(d) {
      return (
        "translate(" +
        xScaleScatter(d.parsedDate) +
        "," +
        yScaleScatter(d.count) +
        ")"
      );
    })
    .on("mouseenter", function(d) {
      // ***** Define hover events *****

      // set text associated with hovered circle to full opacity
      d3.select(this)
        .select("text")
        .transition()
        .duration(0)
        .style("opacity", 1);

      // set all circles to half opacity
      d3.selectAll("circle").style("opacity", 0.5);

      // increase radius of hovered circle and set to full opacity
      d3.select(this)
        .select("circle")
        .transition()
        .ease(d3.easeElastic)
        .duration(transitionTime)
        .attr("r", radius * 2)
        .style("opacity", 1);
    })
    .on("mouseleave", function(d) {
      // ***** define mouseleave events *****

      // make all text transparent
      d3.select(this)
        .select("text")
        .transition()
        .style("opacity", 0);

      // set circle back to original radius
      d3.select(this)
        .select("circle")
        .transition()
        .ease(d3.easeElastic)
        .duration(transitionTime)
        .attr("r", radius);

      // make all circles fully opaque
      d3.selectAll("circle").style("opacity", 1);
    });

  // add new circles
  enterGroups
    .append("circle")
    .attr("class", "ufoCircle")
    .style("fill", "limegreen")
    .attr("r", radius);

  // add new text
  enterGroups
    .append("text")
    .attr("class", "ufoText")
    .attr("dx", radius)
    .attr("dy", -radius)
    .text(function(d) {
      return d.count;
    })
    .style("opacity", 0);

  // merge existing and new circles
  groups
    .merge(groups)
    .transition()
    .ease(d3.easeElastic)
    .duration(transitionTime)
    .attr("transform", function(d) {
      return (
        "translate(" +
        xScaleScatter(d.parsedDate) +
        "," +
        yScaleScatter(d.count) +
        ")"
      );
    });

  // remove old circles
  groups.exit().remove();
}
