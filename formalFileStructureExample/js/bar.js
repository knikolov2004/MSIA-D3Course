// margins and svg
var marginBar = { top: 20, right: 60, bottom: 150, left: 40 };

var width = 960 - marginBar.left - marginBar.right;
var height = 500 - marginBar.top - marginBar.bottom;

var svgBar = d3
  .select("#barChart")
  .append("svg")
  .attr("width", width + marginBar.left + marginBar.right)
  .attr("height", height + marginBar.top + marginBar.bottom)
  .append("g")
  .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

// xscale, yscale, xaxis, and yaxis
var xScaleBar = d3
  .scaleBand()
  .padding([0.1])
  .rangeRound([0, width]);

var yScaleBar = d3.scaleLinear().range([height, 0]);

var xAxisBar = d3.axisBottom(xScaleBar);

var yAxisBar = d3.axisLeft(yScaleBar).tickFormat(d3.format(`.2s`));

// Reading in data here, then calling "ready" function:
d3.csv("data/chicagoCrime.csv", function(d) {
  return {
    count: +d.count,
    year: +d.year,
    violation: titleCase(d["Primary Type"])
  };
}).then(ready);

// Ready Function
function ready(data) {
  var data2018 = data.filter(function(d) {
    return d.year == 2018;
  });

  // assigning domain to scales
  yScaleBar.domain([
    0,
    d3.max(data2018, function(d) {
      return d.count;
    })
  ]);
  xScaleBar.domain(
    data2018.map(function(d) {
      return d.violation;
    })
  );

  // defining and formatting axis groups
  var xAxisBarGroup = svgBar
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisBar);

  xAxisBarGroup
    .selectAll("text")
    .attr("transform", "rotate(45) translate(7, -8)")
    .style("text-anchor", "start");

  var yAxisBarGroup = svgBar
    .append("g")
    .attr("class", "y axis")
    .call(yAxisBar);

  // creating rectangles
  svgBar
    .selectAll(".bar")
    .data(data2018)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return xScaleBar(d.violation);
    })
    .attr("y", function(d) {
      return yScaleBar(d.count);
    })
    .attr("width", xScaleBar.bandwidth())
    .attr("height", function(d) {
      return height - yScaleBar(d.count);
    })
    .style("fill", "FireBrick")
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "red");

      //Get this bar's x/y values, then augment for the tooltip
      var xPosition =
        parseFloat(d3.select(this).attr("x")) + xScaleBar.bandwidth() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) - 5;

      //Create the tooltip label
      svgBar
        .append("text")
        // .data(dataset)
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .text(d.count);
    })

    // set back to normal when no longer mousing over bar
    .on("mouseout", function(d) {
      d3.select("#tooltip").remove();
      d3.select(this)
        .transition()
        .duration(250)
        .style("fill", "FireBrick");
    });
}
