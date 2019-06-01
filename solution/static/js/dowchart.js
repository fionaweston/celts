/*
Contains functionality to power the Day Of Week bar chart
*/


console.log("--> dowchart.js 1");



function initializeDowChart(sourceAgencyDetails){
    /* Creates the day of week chart.

    Accepts : sourceAgencyDetails (dictionary) contains metadata for selected agency used to populate chart
                id: (string) unique identifier for the agency the details are for
                year: (int) year for which the agency details are for
                summarydayofweek: (List)
                    day: (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count: (int)
                summaryhour: (List)
                    hour: (string)
                    count: (int)
                meters: (list) List of the top meters, by count, for the agency
                    location: (string)
                    id: (string)
                    count: (int)
                    latitude: (number)
                    longitude: (number)
    
    Returns : undefined
    */

    console.log("--> initializeDowChart");

    let chartDiv = d3.select("#dowChart");

    var dowdata = sourceAgencyDetails.summarydayofweek;
    var dow = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
    
    // Define SVG area dimensions
    var svgWidth = getDivWidth("#dowChart");
    var svgHeight = 360;
    
    // Define the chart's margins as an object
    var chartMargin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 80
    };
    
    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    
    // Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("#dowChart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
    
    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
    
    // Cast the day of week number and count values to a number for each piece of dowdata
    dowdata.forEach(function(d) {
      d.day = +d.day;
      d.count = +d.count;
    });
    
    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(dowdata.map(d => d.day))
      .range([0, chartWidth])
      .padding(0.1);
    
    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(dowdata, d => d.count)])
      .range([chartHeight, 0]);
    
    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale)
                       .tickFormat((d,i) => dow[i]);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
    
    // initialize tool tip
    var toolTip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([40, 0])
                    .html(function(d) {
                        return ("<div>" + d.count + "</div>");
                    });
    
    // create tooltip in the chart
    chartGroup.call(toolTip);
    
    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .style("font-weight", 700)
      .style("font-size", "12px")
      .call(leftAxis);
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .style("font-weight", 700)
      .style("font-size", "12px")
      .call(bottomAxis);
    
    // Create one SVG rectangle per piece of dowdata
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(dowdata)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.day))
      .attr("y", d => yLinearScale(d.count))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.count))
      .on("mouseover", function(d) {
            toolTip.show(d,this);
      })
      .on("mouseout", function(d) {
            toolTip.hide(d);
      });

    console.log(chartDiv);

}


function updateDowChart(sourceAgencyDetails){
    /* Updates the existing day of week chart with a new agency.

    Accepts : sourceAgencyDetails (dictionary) contains metadata for selected agency used to populate chart
                id: (string) unique identifier for the agency the details are for
                year: (int) year for which the agency details are for
                summarydayofweek: (List)
                    day: (string) Day of week; 0 Monday, 1 Tuesday, 2 Wednesday, 3 Thursday, 4 Friday, 5 Saturday, 6 Sunday
                    count: (int)
                summaryhour: (List)
                    hour: (string)
                    count: (int)
                meters: (list) List of the top meters, by count, for the agency
                    location: (string)
                    id: (string)
                    count: (int)
                    latitude: (number)
                    longitude: (number)

    Returns : undefined 
    */

    console.log("--> updateDowChart");

    console.log(sourceAgencyDetails);

    removeExistingSvg("#dowChart")

    let chartDiv = d3.select("#dowChart");

    var dowdata = sourceAgencyDetails.summarydayofweek;
    var dow = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
    
    // Define SVG area dimensions
    var svgWidth = getDivWidth("#dowChart");
    var svgHeight = 360;
    
    // Define the chart's margins as an object
    var chartMargin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 80
    };
    
    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    
    // Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("#dowChart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
    
    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
    
    // Cast the day of week number and count values to a number for each piece of dowdata
    dowdata.forEach(function(d) {
      d.day = +d.day;
      d.count = +d.count;
    });
    
    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
      .domain(dowdata.map(d => d.day))
      .range([0, chartWidth])
      .padding(0.1);
    
    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(dowdata, d => d.count)])
      .range([chartHeight, 0]);
    
    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale)
                       .tickFormat((d,i) => dow[i]);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
    
    // initialize tool tip
    var toolTip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([40, 0])
                    .html(function(d) {
                        return ("<div>" + d.count + "</div>");
                    });
    
    // create tooltip in the chart
    chartGroup.call(toolTip);
    
    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
      .style("font-weight", 700)
      .style("font-size", "12px")
      .call(leftAxis);
      .text(Tickets)

      
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .style("font-weight", 700)
      .style("font-size", "12px")
      .call(bottomAxis);
      .text(Day of week)
    
    // Create one SVG rectangle per piece of dowdata
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll(".bar")
      .data(dowdata)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xBandScale(d.day))
      .attr("y", d => yLinearScale(d.count))
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.count))
      .on("mouseover", function(d) {
            toolTip.show(d,this);
      })
      .on("mouseout", function(d) {
            toolTip.hide(d);
      });
}


