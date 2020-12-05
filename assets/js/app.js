// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100,
};
// use console.log to verify code step by step
var width = svgWidth - margin.left - margin.right;
console.log(`Width: ${width}`);
var height = svgHeight - margin.top - margin.bottom;
console.log(`Height: ${height}`);
// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("class", "chart");

// Step 3:
// Import data from the donuts.csv file
// use + to indicate that poverty and healthcare are numbers
// =================================
d3.csv("assets/data.csv").then(function (data) {
    console.log(data);

    data.forEach(function(data) {
    data.age = +data.age;
    data.healthcare = +data.healthcare;
  });

  // Step 5: Create the scales for the chart
  // =================================
  var xLinearScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.age))
    .range([0, width]);
  // // Step 6: Set up the y-axis domain
  var yLinearScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.healthcare))
    .range([height, 0]);

  // create axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //   append axex to chartgroup
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);
  // create axis labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Healthcare");

   chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age"); 
  // create circles (use class from css'state circle')
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xLinearScale(d.age))
    .attr("cy", (d) => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("class", "stateCircle");
  
  var textGroup = chartGroup
    .append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => xLinearScale(d.age)-0.5)
    .attr("y", (d) => yLinearScale(d.healthcare)+5)
    .attr("class", "stateText")
    .html(function (d){
      return `${d.abbr}`
    });
  // using version 9 of d3 tips (html) d3 tips class in css
  // step 10 intialize tool tip
  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .html(function (d) {
      return `${d.state}<br>Age: ${d.age}<br> Without Healthcare: ${d.healthcare}`;
    });
  // step 11 create tooltip chart; append
  chartGroup.call(toolTip);

  // create event listener (when we click on circle we want it to take tool tip and show)
  circlesGroup
    .on("click", function (data) {
      toolTip.show(data, this);
    })
    // on mouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
      // step 12 create axes labels
      
    });
});
