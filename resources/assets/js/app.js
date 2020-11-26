// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
// use console.log to verify code step by step
var width = svgWidth - margin.left - margin.right;
console.log(`Width: %{width}`);
var height = svgHeight - margin.top - margin.bottom;
console.log(`Height: ${height}`);
// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3.select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// use + to indicate that poverty and healthcare are numbers
// =================================
d3.csv("./assets/data.csv").then(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data);
});  
  // Step 5: Create the scales for the chart
  // =================================
  var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.poverty)])
      .range([0, width]);
  // // Step 6: Set up the y-axis domain
  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

  // create axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  append axex to chartgroup
  chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

  chartGroup.append("g")
        .call(leftAxis);

        // create circles (use class from css'state circle')
  var circlesGroup = chartGroup.selectAll("circles")
      .data(data)
      .enter()
      .append("circles")
      .attr("cx", d => xLinearScale(d.povery))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("class", "stateCircle");
      // using version 9 of d3 tips (html) d3 tips class in css
      // step 10 intialize tool tip
  var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .html(function(d) {
          return (`${d.state}<br>Poverty: ${d.poverty}<br> Without Healthcare: ${d.healthcare}`);
      });
      // step 11 create tooltip chart; append 
      chartGroup.call(toolTip);

      // create event listener (when we click on circle we want it to take tool tip and show)
      circlesGroup.on("click", function(data) {
          toolTip.show(data, this);
      });
      // on mouseout event
          .on("mouseout", function (data, index){
          toolTip.hide(data);
          // step 12 create axes labes
          chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
          .attr("class", "aText")
          .text("In Pover (%)");
          // left axis
          chartgroup.append("text")
              .attr("transform", "rotate(-90")
              .attr("y", 0 - margin.left + 40)
              .attr("x", 0 - (height / 2))
              .attr("dy", "1em")
              .attr("class", "aText")
              .text("Without Access to Healthcare (%)");

        });
      , this);
      
      )
      
      
      )

        

  var yMax;
  if (morningMax > eveningMax) {
    yMax = morningMax;
  }
  else {
    yMax = eveningMax;
  }

  // var yMax = morningMax > eveningMax ? morningMax : eveningMax;

  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([0, yMax]);


  // Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Set up two line generators and append two SVG paths
  // ==============================================

  // Line generator for morning data
  var line1 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.morning));

  // Line generator for evening data
  var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.evening));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(donutData))
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([donutData])
    .append("path")
    .attr("d", line2)
    .classed("line orange", true);

}).catch(function(error) {
  console.log(error);
});
