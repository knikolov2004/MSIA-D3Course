const parseTime = d3.timeParse("%m/%Y");
const marginScatter = { top: 20, right: 30, bottom: 20, left: 30 };
const outerWidth = 700;
const outerHeight = 300;
const innerWidth = outerWidth - marginScatter.left - marginScatter.right;
const innerHeight = outerHeight - marginScatter.top - marginScatter.bottom;
const transitionTime = 1000;
const radius = 10;
const startYear = 2018;

const SVG = d3
  .select("#scatterChart")
  .append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);

const svgScatter = SVG.append("g").attr(
  "transform",
  "translate(" + marginScatter.left + "," + marginScatter.top + ")"
);

const xScaleScatter = d3.scaleTime().range([0, innerWidth]);

const xAxisScatter = d3.axisBottom(xScaleScatter).tickSize(-innerHeight);

const yScaleScatter = d3.scaleLinear().range([innerHeight, 0]);

const yAxisScatter = d3.axisLeft(yScaleScatter).tickSize(-innerWidth);

const lineGenerator = d3.line().curve(d3.curveCardinal);

const xAxisScatterGroup = svgScatter
  .append("g")
  .attr("class", "x axis scatter")
  .attr("transform", "translate(0," + innerHeight + ")")
  .call(xAxisScatter);

const yAxisScatterGroup = svgScatter
  .append("g")
  .attr("class", "y axis scatter") //gives group the classes 'y' and 'axis'
  .call(yAxisScatter);

d3.csv(
  "https://raw.githubusercontent.com/molliemarie/MSIA-D3Course-2019/master/Projects%26Exercises/generalUpdatePattern/data/ufo.csv",
  function(d) {
    return {
      date: d.date,
      count: +d.count,
      month: +d.date.split("/")[0],
      parsedDate: parseTime(d.date),
      year: parseTime(d.date).getYear() + 1900
    };
  }
).then(ready);

function ready(fullData) {
  const yearList = d3
    .set(
      fullData.map(function(d) {
        return d.year;
      })
    )
    .values();

  const startData = fullData.filter(function(d) {
    return d.year == startYear;
  });

  console.log(startData);

  d3.select("#buttonsDiv")
    .selectAll("button")
    .data(yearList)
    .enter()
    .append("button")
    .text(function(d) {
      return d;
    })
    .on("click", function(d) {
      dataSwap(d, fullData);
    });

  setScales(startData, startYear);

  setAxes();

  lineGenerator
    .x(function(d) {
      return xScaleScatter(d.parsedDate);
    })
    .y(function(d) {
      return yScaleScatter(d.count);
    });

  svgScatter
    .append("path")
    .attr("class", "ufoLine")
    .attr("d", lineGenerator(startData));

  drawCircles(startData);
}
