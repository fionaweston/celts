/* metermetadata.js

Contains functionality to display the metadata for the selected meter
*/

console.log("--> metermetadata.js");


//- Constants
const METADATA_DivName = "#mapMetadata"; //name of div to host the SVG

const METADATA_SvgHeight = 400; //Height of the SVG; should match map

const METADATA_TopMargin = 5;//Margin at the top of the SVG

const METADATA_BottomMargin = 30; //Margin at the bottom of SVG

const METADATA_LeftMargin = 5;//margin on the left side of SVG

const METADATA_RightMargin = 5;//margin on the right side of SVG

const METADATA_TableMeterID = "#meterMetadataTableID"; //ID of the td that displays meter ID

const METADATA_TableLocation = "#meterMetadataTableLocation"; //ID of the td that displays location

const METADATA_TableCitations = "#meterMetadataTableCitation"; //ID of the td that displays citation count

const METADATA_yColumnName = "vehichemake"; //Name of the column that contains y information

const METADATA_xColumnName = "count"; //Name of the column that contains x information



function initializeMeterMetadata(){
    /* Prepares the meter metadata for the first use; there will not be a selected meter
    so just setting the axis of the chart and labels.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> initializeMeterMetadata");

}


function clearMeterMetadata(){
    /* Clears the meter metadata when there is no selected meter; such as when changing the 
    filter agency or year.

    Accepts : nothing

    Returns : undefined
    */

    console.log("--> clearMetaMetadata");


    //- Clear Metadata
    d3.select(METADATA_TableMeterID).text("");

    // d3.select(METADATA_TableLocation).text("");

    d3.select(METADATA_TableCitations).text("");


    //- Remove Existing SVG
    removeExistingSvg(METADATA_DivName);
}


function updateMeterMetadata(sourceMeterDetails, meterLocation, citationCount){
    /* Creates the chart of the vehicle make; replaces existing

    Accepts : sourceMeterDetails: (dictionary) contains details on selected meter
                id: (string) unique identifier of meter
                year: (int) year for which the data is for
                summarymake: (list) list of dictionaries on the top vehicle makes found
                    vehichemake: (string) name of the vehicle
                    count: (int) number of vehicles found
             meterLocation: (string) address of the meter  
             citationCount: (int) number of citations      
    */  

    console.log("--> updateMeterMetadata");


    //- Update Metadata
    d3.select(METADATA_TableMeterID).text(sourceMeterDetails.id);

    // d3.select(METADATA_TableLocation).text(meterLocation);

    d3.select(METADATA_TableCitations).text(citationCount.toLocaleString());



    //- Remove Existing SVG
    removeExistingSvg(METADATA_DivName);


    //- Get Size of SVG
    let svgWidth = getDivWidth(METADATA_DivName);


    //- Create SVG Container
    let svgContainer = d3.select(METADATA_DivName)
                            .append("svg")
                            .attr("height", METADATA_SvgHeight)
                            .attr("width", svgWidth);
    
    //- Create Chart Group within SVG
    //  Shift based on the margins
    let svgChartGroup = svgContainer.append("g")
                            .attr("transform", `translate(${METADATA_LeftMargin}, ${METADATA_TopMargin})`); 


    //- Get Chart Area
    //  Excludes the margins
    let chartHeight = (METADATA_SvgHeight - METADATA_TopMargin - METADATA_BottomMargin);

    let chartWidth = (svgWidth - METADATA_RightMargin - METADATA_LeftMargin);
    

    //- Prepare Y: Vehicle Make
    let yScale = d3.scaleBand()
                    .range([chartHeight, 0])
                    .domain(sourceMeterDetails.summarymake.map(d => d.vehiclemake))
                    .padding(0.1);

    let yAxis = d3.axisLeft(yScale);


    // Remove labels on y axis; using different method
    yAxis.tickValues([]);

    //- Prepare X: Count
    let xScale = d3.scaleLinear()
                    .domain([d3.min(sourceMeterDetails.summarymake, d => d[METADATA_xColumnName]) - 0.5, d3.max(sourceMeterDetails.summarymake, d => d[METADATA_xColumnName])  ])
                    .range([0, chartWidth]);

    let xAxis = d3.axisBottom(xScale);

    
    //- Create Chart
    svgChartGroup.selectAll("meterBar")
        .data(sourceMeterDetails.summarymake)
        .enter()
        .append("rect")
        .attr("class", "meterBar")
        .attr("x", 0)
        .attr("y", d => yScale(d.vehiclemake))
        .attr("height", yScale.bandwidth())
        .attr("width", item => xScale(item[METADATA_xColumnName]));

    svgChartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .attr("class", "xaxis")
        .call(xAxis);

    svgChartGroup.append("g")
        .attr("class", "yaxis")
        .call(yAxis);

    
    //- Create Labels
    let labelGroup =  svgChartGroup.append("g");

    labelGroup.selectAll("text")
        .data(sourceMeterDetails.summarymake)
        .enter()
        .append("text")
        .attr("class", "meterText")
        .attr("x", 10)
        .attr("y", d => (yScale(d.vehiclemake) + 22))
        .text(d => `${d.vehiclemake}: ${d.count}`);


    //- X Axis label
    let axisLabelGroup = svgChartGroup.append("g");

    axisLabelGroup.append("text")
        .attr("transform", `translate(${svgWidth/2}, ${METADATA_SvgHeight + METADATA_TopMargin - 10})`)
        .style("text-anchor", "middle")
        .attr("class", "meterAxisText")
        .text("Vehicle Count");

}