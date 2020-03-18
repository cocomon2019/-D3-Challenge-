// @TODO: YOUR CODE HERE!

// setting up boarders in SVG
var svgWidth = 800;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append a div clas to the scatter element 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then(function (data) {

  // convert data to numbers
  data.forEach(function (xdata) {
    xdata.poverty = +xdata.poverty;
    xdata.healthcare = +xdata.healthcare;
    //console.log(xdata.state,xdata.abbr,xdata.poverty,xdata.healthcare);
  });

  // set x scale function
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty) * 0.9,
    d3.max(data, d => d.poverty) * 1.1])
    .range([0, width]);

  // set y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare) * 1.1])
    .range([height, 0]);

  // axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "18px")
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .style("font-size", "18px")
    .call(leftAxis);

  // circles
  chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 18)
    .attr("fill", "purple")
    .attr("opacity", ".3");

  // text with in circles
  chartGroup.selectAll("text.text-circles")
    .data(data)
    .enter()
    .append("text")
    .classed("text-circles", true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px");

  // set y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 40 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Lacking Healthcare (%)");

  // set x axis
  chartGroup.append("text")
    .attr("y", height + margin.bottom / 2 - 10)
    .attr("x", width / 2)
    .attr("dy", "1em")
    .classed("aText", true)
    .text("Poverty Rate (%)");


});
